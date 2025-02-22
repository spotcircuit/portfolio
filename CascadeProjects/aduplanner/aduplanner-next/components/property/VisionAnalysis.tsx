'use client';

import { FC, useMemo } from 'react';
import { 
  HomeModernIcon,
  MapIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
  TreesIcon
} from '@heroicons/react/24/outline';
import RawResponse from './RawResponse';

interface VisionAnalysisProps {
  isAnalyzing: boolean;
  visionAnalysis: any;  
}

const VisionAnalysis: FC<VisionAnalysisProps> = ({ 
  isAnalyzing,
  visionAnalysis
}) => {
  // Extract JSON from the markdown response
  const parsedData = useMemo(() => {
    if (!visionAnalysis || typeof visionAnalysis !== 'string') return null;
    
    const jsonMatch = visionAnalysis.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (error) {
        console.error('Failed to parse JSON:', error);
        return null;
      }
    }
    return null;
  }, [visionAnalysis]);

  if (isAnalyzing) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-700">Analyzing property...</p>
      </div>
    );
  }

  if (!visionAnalysis) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Raw Response Component */}
      <RawResponse response={visionAnalysis} />

      {parsedData && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow p-6">
          {/* Property Analysis */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <HomeModernIcon className="h-5 w-5 text-blue-500" />
              Property Analysis
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm">
                <span className="text-gray-600">Type:</span>
                <span className="ml-1 text-gray-900">{parsedData.Property_Analysis.Property_Type}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Size:</span>
                <span className="ml-1 text-gray-900">{parsedData.Property_Analysis.Lot_Size_and_Shape.Size}</span>
              </div>
            </div>
          </div>

          {/* Terrain Features */}
          <div className="border-t border-blue-100 pt-4 mb-6">
            <h4 className="text-sm font-medium text-blue-700 mb-2 flex items-center gap-2">
              <MapIcon className="h-4 w-4" />
              Terrain Analysis
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm">
                <span className="text-gray-600">Slopes:</span>
                <span className="ml-1 text-gray-900">{parsedData.Property_Analysis.Terrain_Features.Slopes}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Grade Changes:</span>
                <span className="ml-1 text-gray-900">{parsedData.Property_Analysis.Terrain_Features.Grade_Changes}</span>
              </div>
            </div>
          </div>

          {/* Existing Structures */}
          <div className="border-t border-blue-100 pt-4 mb-6">
            <h4 className="text-sm font-medium text-blue-700 mb-2 flex items-center gap-2">
              <BuildingOfficeIcon className="h-4 w-4" />
              Existing Structures
            </h4>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-gray-600">Main House:</span>
                <span className="ml-1 text-gray-900">
                  {parsedData.Existing_Structures_and_Features.Main_House_Location.Size}, 
                  {parsedData.Existing_Structures_and_Features.Main_House_Location.Location}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Other Structures:</span>
                <span className="ml-1 text-gray-900">
                  {parsedData.Existing_Structures_and_Features.Other_Structures.Garages}, 
                  {parsedData.Existing_Structures_and_Features.Other_Structures.Sheds}
                </span>
              </div>
            </div>
          </div>

          {/* Setbacks and Buildable Area */}
          <div className="border-t border-blue-100 pt-4">
            <h4 className="text-sm font-medium text-blue-700 mb-2">Setbacks & Buildable Area</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="text-sm">
                <span className="text-gray-600">Front:</span>
                <span className="ml-1 text-gray-900">{parsedData.Setback_and_Buildable_Area_Analysis.Front_Yard}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Back:</span>
                <span className="ml-1 text-gray-900">{parsedData.Setback_and_Buildable_Area_Analysis.Back_Yard}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Left Side:</span>
                <span className="ml-1 text-gray-900">{parsedData.Setback_and_Buildable_Area_Analysis.Side_Yards.Left}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Right Side:</span>
                <span className="ml-1 text-gray-900">{parsedData.Setback_and_Buildable_Area_Analysis.Side_Yards.Right}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisionAnalysis;
