interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  steps: Array<{
    title: string
  }>
}

export function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  return (
    <div className="h-full flex flex-col justify-between relative">
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200">
        <div
          className="bg-blue-600 transition-all duration-300 ease-in-out"
          style={{ height: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
      {steps.map((step, i) => (
        <div key={i} className="flex items-center relative z-10">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
              i < currentStep
                ? "bg-blue-600 border-blue-600 text-white"
                : i === currentStep
                  ? "bg-white border-blue-600 text-blue-600"
                  : "bg-white border-gray-300 text-gray-500"
            } text-sm font-medium transition-all duration-200`}
          >
            {i + 1}
          </div>
          <div className="ml-4">
            <div className={`text-sm font-medium ${i <= currentStep ? "text-blue-600" : "text-gray-500"}`}>
              {step.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

