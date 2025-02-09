"use client"

import { useState } from "react"
import { CrawlTypeStep } from "./steps/CrawlTypeStep"
import { ScopeStep } from "./steps/ScopeStep"
import { AdditionalSettingsStep } from "./steps/AdditionalSettingsStep"
import { SummaryStep } from "./steps/SummaryStep"
import { ProgressBar } from "./ProgressBar"
import { StepNavigation } from "./StepNavigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export type CrawlData = {
  crawlType: "discovery" | "content-extraction" | null
  scope: "all" | "specific"
  checkNewPages: boolean
  specificPages: string[]
  excludedPages: string[]
  sitemapFile?: string
  additionalSettings: {
    userAgent: string
    sessionCookie: string
    bearerToken: string
    enableRecurringCrawl: boolean
    crawlFrequency: "daily" | "weekly" | "monthly"
    useCrest: boolean
    prerenderPages: boolean
    limitTo: string[] // Add this line
    excludeUrls: string[] // Add this line
    collectResources: {
      htmlPages: boolean
      codeStyleFiles: boolean
      imagesFiles: boolean
      errorPages: boolean
      redirectionPages: boolean
    }
  }
}

interface CrawlWizardProps {
  isOpen: boolean
  onClose: () => void
}

export function CrawlWizard({ isOpen, onClose }: CrawlWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [crawlData, setCrawlData] = useState<CrawlData>({
    crawlType: null,
    scope: "all",
    checkNewPages: false,
    specificPages: [],
    excludedPages: [],
    additionalSettings: {
      userAgent: "",
      sessionCookie: "",
      bearerToken: "",
      enableRecurringCrawl: false,
      crawlFrequency: "weekly",
      useCrest: false,
      prerenderPages: false,
      limitTo: [], // Add this line
      excludeUrls: [], // Add this line
      collectResources: {
        htmlPages: true,
        codeStyleFiles: false,
        imagesFiles: false,
        errorPages: false,
        redirectionPages: false,
      },
    },
  })

  const steps = [
    {
      title: "Type",
      component: CrawlTypeStep,
    },
    {
      title: "Scope",
      component: ScopeStep,
    },
    {
      title: "Settings",
      component: AdditionalSettingsStep,
    },
    {
      title: "Review",
      component: SummaryStep,
    },
  ]

  const CurrentStepComponent = steps[currentStep - 1].component
  const currentStepDescription = {
    1: "Choose between discovering your site or extracting content for translation.",
    2: "Define the scope of your crawl and set limits.",
    3: "Configure crawl settings and scheduling.",
    4: "Review and confirm your crawl configuration.",
  }[currentStep]

  const updateCrawlData = (newData: Partial<CrawlData>) => {
    setCrawlData((prevData) => ({ ...prevData, ...newData }))
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))
  const goToStep = (step: number) => setCurrentStep(step)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-0">
        <div className="flex h-[85vh]">
          {/* Sidebar */}
          <div className="w-80 bg-gray-50 border-r border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h1 className="text-xl font-semibold text-gray-900">Crawl Wizard</h1>
              <p className="mt-1 text-sm text-gray-500">Configure your website crawl</p>
            </div>
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} steps={steps} />
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-900">
                  {steps[currentStep - 1].title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">{currentStepDescription}</p>
              </div>
            </div>

            {/* Step content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="max-w-3xl mx-auto">
                <CurrentStepComponent 
                  crawlData={crawlData} 
                  updateCrawlData={updateCrawlData} 
                  onEdit={goToStep} 
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 border-t border-gray-100 bg-white">
              <div className="max-w-3xl mx-auto">
                <StepNavigation 
                  currentStep={currentStep} 
                  totalSteps={steps.length} 
                  onNext={nextStep} 
                  onPrev={prevStep} 
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

