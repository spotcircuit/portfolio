'use client';

import { FC, useCallback, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import DrawingTools from '../map/tools/DrawingTools';
import DrawingInstructions from './DrawingInstructions';
import type { LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { LightBulbIcon } from '@heroicons/react/24/outline';

interface PropertyMapProps {
  location: LatLngLiteral;
  address: string;
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
  drawingMode: 'polygon' | null;
  setDrawingMode: (mode: 'polygon' | null) => void;
  setIsDrawingActive: (active: boolean) => void;
  handleBoundaryComplete: (shape: google.maps.Polygon) => void;
  isAnalyzing: boolean;
  onAnalyze: (map: google.maps.Map, propertyMap: PropertyMap) => void;
}

const defaultMapOptions = {
  mapTypeId: 'satellite',
  tilt: 0,
  mapTypeControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
  zoomControl: true,
  zoom: 20,
  center: { lat: 0, lng: 0 },
  mapTypeControlOptions: {
    position: google.maps.ControlPosition.TOP_RIGHT
  }
};

const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

const PropertyMap: FC<PropertyMapProps> = ({
  location,
  address,
  map,
  setMap,
  drawingMode,
  setDrawingMode,
  setIsDrawingActive,
  handleBoundaryComplete,
  isAnalyzing,
  onAnalyze
}) => {
  const [measurements, setMeasurements] = useState<{ distance: number | null; area: number | null }>({
    distance: null,
    area: null
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    console.log('Map loaded');
    setMap(map);
    
    // Center map on property location
    map.setCenter(location);
    map.setZoom(20);
    
    // Listen for tilesloaded to ensure everything is rendered
    google.maps.event.addListenerOnce(map, 'tilesloaded', () => {
      console.log('Map tiles loaded');
    });
  }, [location, setMap]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, [setMap]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden border-2 border-gray-200 mb-4">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        options={{
          ...defaultMapOptions,
          center: location,
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker 
          position={location}
          title={address}
        />
        <DrawingTools
          map={map}
          drawingMode={drawingMode}
          setDrawingMode={setDrawingMode}
          onBoundaryComplete={handleBoundaryComplete}
          setIsDrawingActive={setIsDrawingActive}
          onMeasurementUpdate={setMeasurements}
        />
      </GoogleMap>
      
      {/* Drawing Instructions */}
      <DrawingInstructions isVisible={true} />
    </div>
  );
};

export default PropertyMap;