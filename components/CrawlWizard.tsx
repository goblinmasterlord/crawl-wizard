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
      description: "Choose between discovering your site or extracting content for translation.",
    },
    {
      title: "Scope",
      component: ScopeStep,
      description: "Define the scope of your crawl and set limits.",
    },
    {
      title: "Settings",
      component: AdditionalSettingsStep,
      description: "Configure crawl settings and scheduling.",
    },
    {
      title: "Review",
      component: SummaryStep,
      description: "Review and confirm your crawl configuration.",
    },
  ]

  const CurrentStepComponent = steps[currentStep - 1].component

  const updateCrawlData = (newData: Partial<CrawlData>) => {
    setCrawlData((prevData) => ({ ...prevData, ...newData }))
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))
  const goToStep = (step: number) => setCurrentStep(step)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden">
        <div className="flex h-[80vh]">
          <div className="w-1/5 bg-gray-100 p-4">
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} steps={steps} />
          </div>
          <div className="w-4/5 p-6 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Crawl Wizard</h1>
            <p className="text-gray-600 mb-6">{steps[currentStep - 1].description}</p>
            <div className="mb-6">
              <CurrentStepComponent crawlData={crawlData} updateCrawlData={updateCrawlData} onEdit={goToStep} />
            </div>
            <StepNavigation currentStep={currentStep} totalSteps={steps.length} onNext={nextStep} onPrev={prevStep} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

