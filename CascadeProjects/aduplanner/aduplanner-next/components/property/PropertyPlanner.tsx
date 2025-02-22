'use client';

import { FC, useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import type { LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { 
  PencilSquareIcon, 
  ArrowsPointingOutIcon, 
  HomeIcon, 
  InformationCircleIcon,
  ChevronRightIcon,
  XMarkIcon,
  TrashIcon,
  LightBulbIcon,
  PencilSquareIcon as PencilIcon,
  ArrowsPointingInIcon,
  ArrowsUpDownIcon,
  RectangleStackIcon
} from '@heroicons/react/24/outline';
import DrawingTools from '../map/tools/DrawingTools';
import { analyzePropertyByAddress } from '@/lib/propertyAnalysis';
import { validateADUPlacement } from '@/lib/visionAnalysis';
import { captureMapView } from '@/lib/mapCapture';
import { analyzePropertyImage, PropertyAnalysisResult } from '@/lib/visionAnalysis';

interface PropertyPlannerProps {
  location: google.maps.LatLngLiteral;
  address: string;
  placeDetails?: google.maps.places.PlaceResult;
  initialAnalysis: {
    isEligible: boolean;
    zoning: string;
    maxSize: number;
    restrictions: string[];
    disclaimers: string[];
    ineligibilityReason?: string;
  };
}

type Measurement = {
  distance: number | null;
  area: number | null;
};

const mapContainerStyle = {
  width: '100%',
  height: '450px'  // Slightly smaller height since it's in a narrower container
};

const defaultMapOptions = {
  mapTypeId: 'satellite',
  tilt: 0,
  mapTypeControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
  zoomControl: true,
  mapTypeControlOptions: {
    position: google.maps.ControlPosition.TOP_RIGHT
  }
};

const PropertyPlanner: FC<PropertyPlannerProps> = ({ 
  location, 
  address, 
  placeDetails,
  initialAnalysis
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [drawingMode, setDrawingMode] = useState<'polygon' | 'polyline' | null>(null);
  const [propertyBoundary, setPropertyBoundary] = useState<google.maps.Polygon | null>(null);
  const [measurements, setMeasurements] = useState<Measurement>({
    distance: null,
    area: null
  });
  const [visionAnalysis, setVisionAnalysis] = useState<PropertyAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [propertyAnalysis, setPropertyAnalysis] = useState(initialAnalysis || {
    isEligible: false,
    zoning: '',
    maxSize: 0,
    restrictions: [],
    disclaimers: []
  });
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [visionFeedback, setVisionFeedback] = useState<{
    isValid: boolean;
    reasons: string[];
    suggestions: string[];
  } | null>(null);

  useEffect(() => {
    const analyze = async () => {
      if (placeDetails) {
        const analysis = await analyzePropertyByAddress(address, placeDetails);
        setPropertyAnalysis(analysis);
      }
    };
    analyze();
  }, [address, placeDetails]);

  const analyzePropertyWithVision = useCallback(async (map: google.maps.Map) => {
    setIsAnalyzing(true);
    try {
      // Capture the map view as an image
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      const imageUrl = canvas.toDataURL();
      
      // Send to our Vision API
      const response = await fetch('/api/vision/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageUrl,
          address: address
        })
      });
      
      if (!response.ok) {
        throw new Error(`Vision analysis failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setVisionAnalysis(data.analysis);
    } catch (error) {
      console.error('Failed to analyze property:', error);
      setAnalysisError(error instanceof Error ? error.message : 'Failed to analyze property');
    } finally {
      setIsAnalyzing(false);
    }
  }, [address]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    map.setZoom(20);
    // Wait for map to fully load before analysis
    setTimeout(() => {
      analyzePropertyWithVision(map);
    }, 1000);
  }, [analyzePropertyWithVision]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const getCursor = useCallback(() => {
    if (isDrawingActive) return 'crosshair';
    if (isDragging) return 'grabbing';
    if (propertyBoundary) return 'grab';
    return 'default';
  }, [isDrawingActive, isDragging, propertyBoundary]);

  const handleShapeComplete = useCallback((shape: google.maps.Polygon) => {
    if (propertyBoundary) {
      propertyBoundary.setMap(null);
    }
    setPropertyBoundary(shape);
    
    // Calculate area when shape is complete
    const path = shape.getPath();
    const area = google.maps.geometry.spherical.computeArea(path);
    const areaInSqFt = Math.round(area * 10.764);
    setMeasurements(prev => ({ ...prev, area: areaInSqFt }));

    // Add mouse event listeners for cursor changes
    shape.addListener('mouseover', () => {
      shape.setOptions({ draggable: true });
    });

    shape.addListener('mouseout', () => {
      if (!isDragging) {
        shape.setOptions({ draggable: false });
      }
    });

    shape.addListener('dragstart', () => {
      setIsDragging(true);
    });

    shape.addListener('dragend', () => {
      setIsDragging(false);
      // Recalculate area after drag
      const newPath = shape.getPath();
      const newArea = google.maps.geometry.spherical.computeArea(newPath);
      const newAreaInSqFt = Math.round(newArea * 10.764);
      setMeasurements(prev => ({ ...prev, area: newAreaInSqFt }));
    });

    // Add vertex event listeners
    const vertices = shape.getPath();
    vertices.addListener('set_at', () => {
      const newArea = google.maps.geometry.spherical.computeArea(vertices);
      const newAreaInSqFt = Math.round(newArea * 10.764);
      setMeasurements(prev => ({ ...prev, area: newAreaInSqFt }));
    });

    vertices.addListener('insert_at', () => {
      const newArea = google.maps.geometry.spherical.computeArea(vertices);
      const newAreaInSqFt = Math.round(newArea * 10.764);
      setMeasurements(prev => ({ ...prev, area: newAreaInSqFt }));
    });

    vertices.addListener('remove_at', () => {
      const newArea = google.maps.geometry.spherical.computeArea(vertices);
      const newAreaInSqFt = Math.round(newArea * 10.764);
      setMeasurements(prev => ({ ...prev, area: newAreaInSqFt }));
    });
  }, [propertyBoundary, isDragging]);

  const clearPropertyBoundary = useCallback(() => {
    if (propertyBoundary) {
      propertyBoundary.setMap(null);
      setPropertyBoundary(null);
    }
    setMeasurements({ distance: null, area: null });
    setDrawingMode(null);
    setIsDrawingActive(false);
    // Reset cursor state
    if (map) {
      map.setOptions({ 
        draggableCursor: 'default',
        draggingCursor: 'default'
      });
    }
  }, [propertyBoundary, map]);

  const calculateArea = useCallback((polygon: google.maps.Polygon) => {
    const path = polygon.getPath();
    const area = google.maps.geometry.spherical.computeArea(path);
    // Convert to square feet
    const areaInSqFt = Math.round(area * 10.764);
    setMeasurements((prevMeasurements) => ({ ...prevMeasurements, area: areaInSqFt }));
  }, []);

  const handleMeasurementUpdate = useCallback((measurement: Measurement) => {
    setMeasurements(measurement);
  }, []);

  const handleADUPlacement = async (bounds: any) => {
    if (placeDetails?.photos && placeDetails.photos.length > 0) {
      try {
        const photoUrl = placeDetails.photos[0].getUrl();
        const feedback = await validateADUPlacement(photoUrl, {
          x: bounds.x,
          y: bounds.y,
          width: bounds.width,
          height: bounds.height
        });
        setVisionFeedback(feedback);
      } catch (error) {
        console.error('Vision validation failed:', error);
      }
    }
  };

  const runVisionAnalysis = async () => {
    if (!map || !propertyBoundary) return;

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      // Capture the map view
      const bounds = new google.maps.LatLngBounds();
      propertyBoundary.getPath().forEach((point) => {
        bounds.extend(point);
      });
      const imageUrl = await captureMapView(map, bounds);
      
      // Run vision analysis
      const analysis = await analyzePropertyImage(imageUrl);
      setVisionAnalysis(analysis);

      // Update property type eligibility based on vision analysis
      if (analysis.confidence > 0.8) {
        if (analysis.propertyType === 'townhouse') {
          setPropertyAnalysis(prev => ({
            ...prev,
            eligible: false,
            reason: 'Property appears to be a townhouse based on satellite imagery analysis'
          }));
        } else if (analysis.propertyType === 'single_family') {
          setPropertyAnalysis(prev => ({
            ...prev,
            eligible: true
          }));
        }
      }
    } catch (error) {
      console.error('Vision analysis failed:', error);
      setAnalysisError('Failed to analyze property image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (propertyBoundary && !visionAnalysis && !isAnalyzing) {
      runVisionAnalysis();
    }
  }, [propertyBoundary]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left side - Map and Instructions */}
        <div className="w-full lg:w-[70%] space-y-4">
          {/* Map */}
          <div className="bg-white rounded-lg shadow p-4 relative">
            {/* Map Controls and Measurements */}
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    clearPropertyBoundary();
                    setDrawingMode('polygon');
                    setIsDrawingActive(true);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    drawingMode === 'polygon' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white hover:bg-gray-100 text-gray-700'
                  } shadow-lg`}
                >
                  <PencilIcon className="w-5 h-5" />
                  <span>Draw</span>
                </button>
                <button
                  onClick={clearPropertyBoundary}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 text-red-600 transition-colors shadow-lg"
                >
                  <TrashIcon className="w-5 h-5" />
                  <span>Clear</span>
                </button>
              </div>

              {/* Measurements Display */}
              {(measurements.distance || measurements.area) && (
                <div className="bg-white px-4 py-3 rounded-lg shadow-lg">
                  <div className="flex items-center gap-4">
                    {measurements.distance && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <ArrowsPointingOutIcon className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Distance:</span>
                        <span>{Math.round(measurements.distance).toLocaleString()} ft</span>
                      </div>
                    )}
                    {measurements.area && (
                      <>
                        <div className="h-6 w-px bg-gray-300" />
                        <div className="flex items-center gap-2 text-gray-700">
                          <ArrowsPointingOutIcon className="w-5 h-5 text-green-500" />
                          <span className="font-medium">Area:</span>
                          <span>{Math.round(measurements.area).toLocaleString()} sq ft</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div 
              className="relative w-full h-[600px]"
              style={{ cursor: getCursor() }}
            >
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={location}
                zoom={20}
                options={{
                  ...defaultMapOptions,
                  draggableCursor: getCursor(),
                  draggingCursor: getCursor()
                }}
                onLoad={onLoad}
              >
                <Marker position={location} />
                <DrawingTools
                  map={map}
                  onShapeComplete={handleShapeComplete}
                  drawingMode={drawingMode}
                  onMeasurementUpdate={handleMeasurementUpdate}
                />
              </GoogleMap>
            </div>
          </div>

          {/* Instructions - Same width as map */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <LightBulbIcon className="h-6 w-6 text-blue-500" />
              Drawing Instructions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-gray-700 font-medium flex items-center gap-2">
                  <PencilIcon className="h-5 w-5 text-blue-500" /> 1. Start Drawing
                </p>
                <p className="text-gray-600 pl-4">Click the "Draw" button to activate the drawing tool</p>
                <p className="text-gray-700 font-medium mt-4 flex items-center gap-2">
                  <ArrowsPointingInIcon className="h-5 w-5 text-blue-500" /> 2. Create Your Line
                </p>
                <p className="text-gray-600 pl-4">Click once on the map to set your starting point</p>
                <p className="text-gray-600 pl-4">Click again to set your ending point</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700 font-medium flex items-center gap-2">
                  <ArrowsUpDownIcon className="h-5 w-5 text-blue-500" /> 3. Adjust Your Line
                </p>
                <p className="text-gray-600 pl-4">Drag either endpoint to modify the line length</p>
                <p className="text-gray-600 pl-4">Drag the middle of the line to move it entirely</p>
                <p className="text-gray-700 font-medium mt-4 flex items-center gap-2">
                  <RectangleStackIcon className="h-5 w-5 text-blue-500" /> 4. View Measurements
                </p>
                <p className="text-gray-600 pl-4">Distance and area measurements update automatically</p>
                <p className="text-gray-600 pl-4">Use the "Clear" button to start over if needed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Property Analysis */}
        <div className="w-full lg:w-[30%] space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <InformationCircleIcon className="h-6 w-6 text-blue-500" />
              Property Analysis
            </h2>
            
            {/* Vision Analysis Results */}
            <div className="mt-4 mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Vision Analysis Results</h3>
                {isAnalyzing ? (
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                    Analyzing property...
                  </div>
                ) : visionAnalysis ? (
                  <div className="flex items-center text-sm">
                    <LightBulbIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-600">Analysis complete</span>
                  </div>
                ) : null}
              </div>

              {visionAnalysis && !isAnalyzing && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Buildable Areas */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Buildable Areas</h4>
                    <ul className="mt-2 space-y-2">
                      {visionAnalysis.buildableAreas.frontYard && (
                        <li className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                          Front Yard (Highly Suitable)
                        </li>
                      )}
                      {visionAnalysis.buildableAreas.backYard && (
                        <li className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                          Back Yard (Highly Suitable)
                        </li>
                      )}
                      {visionAnalysis.buildableAreas.sideYards && (
                        <li className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                          Side Yards (Potentially Suitable)
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Setbacks */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Detected Setbacks</h4>
                    <ul className="mt-2 space-y-1">
                      <li>Front: {visionAnalysis.setbacks.front} ft</li>
                      <li>Back: {visionAnalysis.setbacks.back} ft</li>
                      <li>Sides: {visionAnalysis.setbacks.sides.join(' ft, ')} ft</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <HomeIcon className="h-5 w-5 text-blue-500" />
                Property Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <ChevronRightIcon className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-gray-700">
                      <span className="font-medium">Address:</span> {address}
                    </p>
                  </div>
                </div>
                
                {!propertyAnalysis?.isEligible && propertyAnalysis?.ineligibilityReason && (
                  <div className="flex items-start gap-2 bg-red-50 p-3 rounded-lg border border-red-100">
                    <XMarkIcon className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-red-700 font-medium">Not Eligible for ADU</p>
                      <p className="text-red-600">{propertyAnalysis.ineligibilityReason}</p>
                    </div>
                  </div>
                )}

                {/* Property Characteristics */}
                <div className="border-t border-blue-100 pt-3 mt-3">
                  <h4 className="text-sm font-medium text-blue-700 mb-2">Property Characteristics</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-1 text-gray-900">{placeDetails?.types?.includes('single_family_dwelling') ? 'Single Family' : 'Residential'}</span>
                    </div>
                    {measurements.area && (
                      <div className="text-sm">
                        <span className="text-gray-600">Lot Size:</span>
                        <span className="ml-1 text-gray-900">{Math.round(measurements.area).toLocaleString()} sq ft</span>
                      </div>
                    )}
                    <div className="text-sm">
                      <span className="text-gray-600">Zoning:</span>
                      <span className="ml-1 text-gray-900">{propertyAnalysis?.zoning}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Max ADU:</span>
                      <span className="ml-1 text-gray-900">{propertyAnalysis?.maxSize} sq ft</span>
                    </div>
                  </div>
                </div>

                {/* Location Context */}
                <div className="border-t border-blue-100 pt-3">
                  <h4 className="text-sm font-medium text-blue-700 mb-2">Location Context</h4>
                  <div className="space-y-1">
                    {placeDetails?.address_components?.map((component, index) => {
                      if (component.types.includes('neighborhood') || 
                          component.types.includes('sublocality') ||
                          component.types.includes('locality')) {
                        return (
                          <div key={index} className="text-sm">
                            <span className="text-gray-600">{component.types[0].charAt(0).toUpperCase() + component.types[0].slice(1)}:</span>
                            <span className="ml-1 text-gray-900">{component.long_name}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>

                {/* Setback Requirements */}
                <div className="border-t border-blue-100 pt-3">
                  <h4 className="text-sm font-medium text-blue-700 mb-2">Setback Requirements</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm">
                      <span className="text-gray-600">Front:</span>
                      <span className="ml-1 text-gray-900">20 ft</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Back:</span>
                      <span className="ml-1 text-gray-900">15 ft</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Sides:</span>
                      <span className="ml-1 text-gray-900">5 ft</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Height Limit:</span>
                      <span className="ml-1 text-gray-900">16 ft</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Restrictions */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <XMarkIcon className="h-5 w-5 text-blue-500" />
                Restrictions
              </h3>
              <div className="space-y-2">
                {((propertyAnalysis?.restrictions ?? initialAnalysis?.restrictions) || []).map((restriction, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <ChevronRightIcon className="h-5 w-5 text-blue-500 mt-1" />
                    <p className="text-gray-700">{restriction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimers */}
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <InformationCircleIcon className="h-5 w-5 text-blue-500" />
                Disclaimers
              </h3>
              <div className="space-y-2">
                {((propertyAnalysis && propertyAnalysis.disclaimers) || []).map((disclaimer, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <InformationCircleIcon className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-600 text-sm">{disclaimer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Debug Information */}
            <div className="border-t border-blue-100 pt-3 mt-3">
              <h4 className="text-sm font-medium text-blue-700 mb-2">Property Metadata (Debug)</h4>
              <div className="bg-gray-50 p-3 rounded-lg text-xs font-mono overflow-auto max-h-96">
                <pre>
                  {JSON.stringify({
                    address_components: placeDetails?.address_components,
                    types: placeDetails?.types,
                    geometry: {
                      location: {
                        lat: placeDetails?.geometry?.location?.lat(),
                        lng: placeDetails?.geometry?.location?.lng()
                      },
                      viewport: placeDetails?.geometry?.viewport,
                      bounds: placeDetails?.geometry?.bounds
                    },
                    formatted_address: placeDetails?.formatted_address,
                    name: placeDetails?.name,
                    vicinity: placeDetails?.vicinity
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAnalyzing && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <p>Analyzing property satellite image...</p>
          </div>
        </div>
      )}

      {analysisError && (
        <div className="p-4 bg-red-50 rounded-lg text-red-700">
          <p>{analysisError}</p>
          <button 
            onClick={runVisionAnalysis}
            className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
          >
            Try Again
          </button>
        </div>
      )}

      {visionAnalysis && (
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-2">Property Analysis</h3>
          
          <div className="space-y-2">
            <div>
              <span className="font-medium">Property Type: </span>
              {visionAnalysis.propertyType === 'single_family' ? (
                <span className="text-green-600">Single Family Home ✓</span>
              ) : visionAnalysis.propertyType === 'townhouse' ? (
                <span className="text-red-600">Townhouse ✗</span>
              ) : (
                <span className="text-yellow-600">Unknown</span>
              )}
            </div>

            <div>
              <span className="font-medium">Buildable Areas: </span>
              <ul className="list-disc list-inside ml-2">
                {visionAnalysis.buildableAreas.frontYard && (
                  <li>Front Yard</li>
                )}
                {visionAnalysis.buildableAreas.backYard && (
                  <li>Back Yard</li>
                )}
                {visionAnalysis.buildableAreas.sideYards && (
                  <li>Side Yards</li>
                )}
                <li>Estimated Size: {visionAnalysis.buildableAreas.estimatedSize}</li>
              </ul>
            </div>

            <div>
              <span className="font-medium">Setbacks: </span>
              <ul className="list-disc list-inside ml-2">
                <li>Front: {visionAnalysis.setbacks.front} ft</li>
                <li>Back: {visionAnalysis.setbacks.back} ft</li>
                <li>Sides: {visionAnalysis.setbacks.sides.join(' ft, ')} ft</li>
              </ul>
            </div>

            {visionAnalysis.existingStructures.length > 0 && (
              <div>
                <span className="font-medium">Existing Structures: </span>
                <ul className="list-disc list-inside ml-2">
                  {visionAnalysis.existingStructures.map((structure, i) => (
                    <li key={i}>
                      {structure.type} ({structure.approximateSize}) - {structure.location}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-2 text-sm text-gray-500">
              Analysis Confidence: {Math.round(visionAnalysis.confidence * 100)}%
            </div>
          </div>
        </div>
      )}
      {visionFeedback && (
        <div className={`p-4 rounded-lg ${visionFeedback.isValid ? 'bg-green-100' : 'bg-yellow-100'}`}>
          <h3 className="font-semibold mb-2">
            {visionFeedback.isValid ? 'Valid Placement ✓' : 'Placement Issues ⚠️'}
          </h3>
          {visionFeedback.reasons.length > 0 && (
            <div className="mb-2">
              <h4 className="font-medium">Analysis:</h4>
              <ul className="list-disc list-inside">
                {visionFeedback.reasons.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
            </div>
          )}
          {visionFeedback.suggestions.length > 0 && (
            <div>
              <h4 className="font-medium">Suggestions:</h4>
              <ul className="list-disc list-inside">
                {visionFeedback.suggestions.map((suggestion, i) => (
                  <li key={i}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyPlanner;
