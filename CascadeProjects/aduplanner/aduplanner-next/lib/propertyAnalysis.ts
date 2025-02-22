import type { PropertyBounds, PropertyDimensions, Setbacks, BuildableArea, ADULayout, PropertyAnalysis } from '@/types/property';

const FEET_PER_DEGREE_LAT = 364000;  // approximate feet per degree of latitude
const FEET_PER_DEGREE_LNG = 288200;  // approximate feet per degree of longitude at 40° latitude

interface ADUTemplate {
  readonly width: number;
  readonly length: number;
  readonly style: string;
  readonly minLotSize: number;
}

const ADU_TEMPLATES: ReadonlyArray<ADUTemplate> = [
  { width: 6.096, length: 6.096, style: 'studio', minLotSize: 37.16 }, // 20x20 ft, min 400 sq ft lot
  { width: 7.315, length: 9.144, style: '1bed', minLotSize: 55.74 }, // 24x30 ft, min 600 sq ft lot
  { width: 9.144, length: 9.144, style: '2bed', minLotSize: 74.32 }, // 30x30 ft, min 800 sq ft lot
];

// TODO: This is a prototype. For production, we need to integrate with:
// 1. Local zoning APIs for each city/county
// 2. State-level ADU regulations
// 3. Property records and deed restrictions
// 4. Environmental and historic district data

export async function analyzePropertyByAddress(address: string) {
  // PROTOTYPE ONLY - Replace with real API calls
  console.warn('Using prototype analysis - real implementation needs zoning API integration');
  
  // Extract location data
  const zipCode = address.match(/\b\d{5}\b/)?.[0] || '';
  const state = 'UNKNOWN'; // TODO: Get from geocoding API
  
  return {
    isEligible: true,
    zoning: 'R-1 (Single Family Residential)',
    maxSize: 111.48, // 1200 sq ft
    restrictions: [
      'Maximum height: 16 feet (4.88m)',
      'Must maintain 4 feet (1.22m) side and rear setbacks',
      'Cannot be placed in front yard',
      'Must have separate entrance from main dwelling'
    ],
    disclaimers: [
      'This is a preliminary analysis only. Please consult with local planning authorities.',
      'Additional restrictions may apply based on specific lot conditions.',
      'Building permits and inspections required.'
    ]
  };
}

export function calculatePropertyDimensions(bounds: PropertyBounds): PropertyDimensions {
  const width = Math.abs(bounds.ne.lng - bounds.sw.lng) * FEET_PER_DEGREE_LNG * 0.3048; // convert to meters
  const length = Math.abs(bounds.ne.lat - bounds.sw.lat) * FEET_PER_DEGREE_LAT * 0.3048; // convert to meters
  const area = width * length;
  
  return { width, length, area };
}

export function getLocalSetbacks(zipCode: string): Setbacks {
  // PROTOTYPE: Replace with actual zoning lookup
  return {
    front: 6.096, // 20 feet
    back: 1.524,  // 5 feet
    left: 1.524,  // 5 feet
    right: 1.524  // 5 feet
  };
}

export function getBuildableArea(bounds: PropertyBounds, dimensions: PropertyDimensions, setbacks: Setbacks): BuildableArea {
  // Calculate the buildable area by applying setbacks
  const latDiff = bounds.ne.lat - bounds.sw.lat;
  const lngDiff = bounds.ne.lng - bounds.sw.lng;
  
  const frontSetbackLat = (setbacks.front / FEET_PER_DEGREE_LAT) / 0.3048;
  const backSetbackLat = (setbacks.back / FEET_PER_DEGREE_LAT) / 0.3048;
  const leftSetbackLng = (setbacks.left / FEET_PER_DEGREE_LNG) / 0.3048;
  const rightSetbackLng = (setbacks.right / FEET_PER_DEGREE_LNG) / 0.3048;
  
  const buildableBounds: PropertyBounds = {
    sw: {
      lat: bounds.sw.lat + frontSetbackLat,
      lng: bounds.sw.lng + leftSetbackLng
    },
    ne: {
      lat: bounds.ne.lat - backSetbackLat,
      lng: bounds.ne.lng - rightSetbackLng
    }
  };
  
  const buildableDimensions = calculatePropertyDimensions(buildableBounds);
  
  return {
    bounds: buildableBounds,
    dimensions: buildableDimensions,
    setbacks
  };
}

export async function analyzeProperty(
  bounds: PropertyBounds,
  dimensions: PropertyDimensions,
  zipCode: string
): Promise<PropertyAnalysis> {
  // PROTOTYPE: Replace with actual zoning and property analysis
  const setbacks = getLocalSetbacks(zipCode);
  const buildableArea = getBuildableArea(bounds, dimensions, setbacks);
  const areaInSqFt = dimensions.area * 10.764; // convert to sq ft
  
  // Basic eligibility checks
  const isEligible = areaInSqFt >= 5000; // minimum lot size
  const maxSize = Math.min(1200, areaInSqFt * 0.24); // 1200 sq ft or 24% of lot size
  
  const analysis: PropertyAnalysis = {
    isEligible,
    zoning: 'R-1 (Single Family Residential)',
    maxSize: maxSize * 0.0929, // convert to square meters
    restrictions: [
      'Maximum height: 16 feet (4.88m)',
      'Must maintain 4 feet (1.22m) side and rear setbacks',
      'Cannot be placed in front yard',
      'Must have separate entrance from main dwelling'
    ],
    disclaimers: [
      'This is a preliminary analysis only. Please consult with local planning authorities.',
      'Additional restrictions may apply based on specific lot conditions.',
      'Building permits and inspections required.'
    ]
  };
  
  if (!isEligible) {
    analysis.ineligibilityReason = `Lot size (${Math.round(areaInSqFt)} sq ft) is below minimum requirement (5000 sq ft)`;
    return analysis;
  }
  
  analysis.buildableArea = buildableArea;
  analysis.suggestedLayouts = generateADULayouts(buildableArea);
  
  return analysis;
}

export function generateADULayouts(buildableArea: BuildableArea): ReadonlyArray<ADULayout> {
  const layouts: ADULayout[] = [];
  const { bounds, dimensions } = buildableArea;
  
  // Convert dimensions to square feet for comparison with templates
  const areaInSqFt = dimensions.area * 10.764;
  
  // Filter templates that would fit in the buildable area
  const viableTemplates = ADU_TEMPLATES.filter(template => {
    const templateAreaInSqM = template.width * template.length;
    return template.minLotSize <= areaInSqFt &&
           template.width <= dimensions.width &&
           template.length <= dimensions.length;
  });
  
  // For each viable template, generate possible positions
  viableTemplates.forEach(template => {
    // Center position
    const centerLat = (bounds.ne.lat + bounds.sw.lat) / 2;
    const centerLng = (bounds.ne.lng + bounds.sw.lng) / 2;
    
    layouts.push({
      width: template.width,
      length: template.length,
      style: template.style,
      position: { lat: centerLat, lng: centerLng }
    });
    
    // TODO: Add more sophisticated layout positioning logic
    // Consider factors like:
    // - Solar orientation
    // - Access paths
    // - Views
    // - Privacy
    // - Existing structures
  });
  
  return layouts;
}
