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
  const [visionAnalysis, setVisionAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [propertyAnalysis, setPropertyAnalysis] = useState<any>(null);
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const analyze = async () => {
      const analysis = await analyzePropertyByAddress(address);
      setPropertyAnalysis(analysis);
    };
    analyze();
  }, [address]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    map.setZoom(20);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const analyzePropertyWithVision = async (map: google.maps.Map) => {
    if (!propertyBoundary) return;
    
    setIsAnalyzing(true);
    try {
      // Get the bounds of the drawn property
      const bounds = new google.maps.LatLngBounds();
      propertyBoundary.getPath().forEach((point) => {
        bounds.extend(point);
      });
      
      // Adjust map view to fit the property
      map.fitBounds(bounds);
      
      // Wait a moment for the map to update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Capture the map view as an image
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      const imageUrl = canvas.toDataURL();
      
      // Send to our Vision API
      const response = await fetch('/api/vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageUrl,
          address: address
        })
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setVisionAnalysis(data.analysis);
    } catch (error) {
      console.error('Failed to analyze property:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

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
                <div className="flex items-start gap-2">
                  <ChevronRightIcon className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-gray-700">
                      <span className="font-medium">Zoning:</span> {propertyAnalysis?.zoning || initialAnalysis.zoning}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRightIcon className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-gray-700">
                      <span className="font-medium">Max ADU Size:</span> {propertyAnalysis?.maxSize || initialAnalysis.maxSize} sq ft
                    </p>
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
                {(propertyAnalysis?.restrictions || initialAnalysis.restrictions).map((restriction, index) => (
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
                {(propertyAnalysis?.disclaimers || initialAnalysis.disclaimers).map((disclaimer, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <InformationCircleIcon className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-600 text-sm">{disclaimer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPlanner;
