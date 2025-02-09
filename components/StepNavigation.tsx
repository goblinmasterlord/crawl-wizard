import { cn } from "@/lib/utils"

interface StepNavigationProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onPrev: () => void
}

export function StepNavigation({ currentStep, totalSteps, onNext, onPrev }: StepNavigationProps) {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrev}
        disabled={currentStep === 1}
        className={cn(
          "px-4 py-2 text-sm font-medium transition-colors",
          "border border-gray-200",
          currentStep === 1
            ? "bg-gray-50 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300"
        )}
      >
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Previous
        </span>
      </button>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </span>
        <button
          onClick={onNext}
          disabled={currentStep === totalSteps}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            currentStep === totalSteps
              ? "bg-gray-700 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}
        >
          <span className="flex items-center">
            {currentStep === totalSteps ? "Finish" : (
              <>
                Next
                <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L15.586 11H3a1 1 0 110-2h12.586l-5.293-5.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}

