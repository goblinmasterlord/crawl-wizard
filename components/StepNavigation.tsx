interface StepNavigationProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onPrev: () => void
}

export function StepNavigation({ currentStep, totalSteps, onNext, onPrev }: StepNavigationProps) {
  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={onPrev}
        disabled={currentStep === 1}
        className="px-4 py-2 border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={currentStep === totalSteps}
        className="px-4 py-2 bg-gray-800 text-white border border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {currentStep === totalSteps ? "Finish" : "Next"}
      </button>
    </div>
  )
}

