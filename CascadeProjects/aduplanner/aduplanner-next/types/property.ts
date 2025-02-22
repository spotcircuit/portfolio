export interface PropertyBounds {
  ne: google.maps.LatLngLiteral;
  sw: google.maps.LatLngLiteral;
}

export interface PropertyDimensions {
  width: number;  // in meters
  length: number; // in meters
  area: number;   // in square meters
}

export interface Setbacks {
  front: number;  // in meters
  back: number;   // in meters
  left: number;   // in meters
  right: number;  // in meters
}

export interface BuildableArea {
  bounds: PropertyBounds;
  dimensions: PropertyDimensions;
  setbacks: Setbacks;
}

export interface ADULayout {
  width: number;      // in meters
  length: number;     // in meters
  style: string;      // e.g., 'studio', '1bed', '2bed'
  position: {
    lat: number;
    lng: number;
  };
}

export interface PropertyAnalysis {
  isEligible: boolean;
  zoning: string;
  maxSize: number;  // in square meters
  restrictions: string[];
  disclaimers: string[];
  ineligibilityReason?: string;
  buildableArea?: BuildableArea;
  suggestedLayouts?: ReadonlyArray<ADULayout>;
}
