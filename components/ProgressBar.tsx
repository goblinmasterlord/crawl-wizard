import { CheckIcon } from "@heroicons/react/24/solid"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  steps: Array<{ title: string }>
}

export function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  return (
    <div className="py-6">
      <div className="px-6">
        <div className="space-y-6">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = currentStep > stepNumber
            const isCurrent = currentStep === stepNumber

            return (
              <div key={step.title} className="relative group">
                <div className="flex items-center">
                  {/* Step indicator */}
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center transition-colors",
                      {
                        "bg-blue-600": isCompleted || isCurrent,
                        "bg-gray-100": !isCompleted && !isCurrent,
                      }
                    )}
                  >
                    {isCompleted ? (
                      <CheckIcon className="h-5 w-5 text-white" />
                    ) : (
                      <span
                        className={cn("text-sm font-medium", {
                          "text-white": isCurrent,
                          "text-gray-500": !isCurrent,
                        })}
                      >
                        {stepNumber}
                      </span>
                    )}
                  </div>

                  {/* Step title */}
                  <div className="ml-4 flex-1">
                    <h3
                      className={cn("text-sm font-medium transition-colors", {
                        "text-blue-600": isCurrent,
                        "text-gray-900": isCompleted,
                        "text-gray-500": !isCompleted && !isCurrent,
                      })}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Progress line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-4 top-8 h-[calc(100%+1.5rem)] w-[2px] -translate-x-1/2",
                      {
                        "bg-blue-600": isCompleted,
                        "bg-gray-200": !isCompleted,
                      }
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

