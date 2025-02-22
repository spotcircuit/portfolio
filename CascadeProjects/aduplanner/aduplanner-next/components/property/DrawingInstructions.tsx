import { PencilSquareIcon, ArrowPathIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline';

const DrawingInstructions = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 shadow-xl mb-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <PencilSquareIcon className="h-6 w-6 mr-2 text-blue-400" />
        Drawing Instructions
      </h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 font-semibold">1</span>
            </div>
          </div>
          <div>
            <p className="text-gray-200">Click the "Draw Line" button to start drawing</p>
            <p className="text-gray-400 text-sm mt-1">This will activate the drawing mode</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 font-semibold">2</span>
            </div>
          </div>
          <div>
            <p className="text-gray-200">Click on the map to set your starting point</p>
            <p className="text-gray-400 text-sm mt-1">Your first click will establish where your line begins</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 font-semibold">3</span>
            </div>
          </div>
          <div>
            <p className="text-gray-200">Click again to set your ending point</p>
            <p className="text-gray-400 text-sm mt-1">This will complete your line and show measurements</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <CursorArrowRaysIcon className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <div>
            <p className="text-gray-200">Adjust your line by dragging points</p>
            <p className="text-gray-400 text-sm mt-1">Click and drag either endpoint to modify your line</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <ArrowPathIcon className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <div>
            <p className="text-gray-200">Reset anytime to start over</p>
            <p className="text-gray-400 text-sm mt-1">Click the reset button to clear your line and start fresh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingInstructions;
