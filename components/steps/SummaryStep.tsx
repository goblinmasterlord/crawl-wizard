import type { CrawlData } from "../CrawlWizard"
import { cn } from "../../lib/utils"

interface SummaryStepProps {
  crawlData: CrawlData
  onEdit: (step: number) => void
}

export function SummaryStep({ crawlData, onEdit }: SummaryStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Review configuration</h2>

      {/* Crawl Type Section */}
      <div className="border border-gray-200 divide-y divide-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-base font-medium text-gray-900">Crawl type</h3>
              <p className="mt-1 text-sm text-gray-500">Type of crawl and its basic configuration</p>
            </div>
            <button
              onClick={() => onEdit(1)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Edit
            </button>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900">
                  {crawlData.crawlType === "discovery" ? "Discover your site" : "Extract content for translation"}
                </span>
                <span className={cn(
                  "px-2.5 py-0.5 text-xs font-medium",
                  crawlData.crawlType === "discovery" 
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                )}>
                  {crawlData.crawlType === "discovery" ? "Free" : "Uses Quota"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scope Section */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-base font-medium text-gray-900">Crawl scope</h3>
              <p className="mt-1 text-sm text-gray-500">Pages and areas to be crawled</p>
            </div>
            <button
              onClick={() => onEdit(2)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Edit
            </button>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                {crawlData.scope === "all" ? "All discovered pages" : "Specific pages"}
              </span>
            </div>
            {crawlData.scope === "all" && (
              <div className="border-t border-gray-200 pt-3">
                <span className="text-sm text-gray-700">Check for new pages:</span>
                <span className="ml-2 text-sm text-gray-900">{crawlData.checkNewPages ? "Yes" : "No"}</span>
              </div>
            )}
            {crawlData.scope === "specific" && crawlData.specificPages.length > 0 && (
              <div className="border-t border-gray-200 pt-3">
                <span className="text-sm text-gray-700 block mb-2">Selected pages:</span>
                <div className="max-h-32 overflow-y-auto">
                  {crawlData.specificPages.map((page, index) => (
                    <div key={index} className="text-sm text-gray-900 py-1 px-2 odd:bg-white even:bg-gray-50">
                      {page}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Settings Section */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-base font-medium text-gray-900">Additional settings</h3>
              <p className="mt-1 text-sm text-gray-500">Advanced configuration and resources</p>
            </div>
            <button
              onClick={() => onEdit(3)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Edit
            </button>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Resources to collect</h4>
                <ul className="space-y-1">
                  {Object.entries(crawlData.additionalSettings.collectResources).map(([key, value]) => (
                    <li key={key} className="flex items-center text-sm">
                      <span className={cn(
                        "w-2 h-2 rounded-full mr-2",
                        value ? "bg-green-500" : "bg-gray-300"
                      )} />
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">JavaScript processing</h4>
                <ul className="space-y-1">
                  <li className="flex items-center text-sm">
                    <span className={cn(
                      "w-2 h-2 rounded-full mr-2",
                      crawlData.additionalSettings.useCrest ? "bg-green-500" : "bg-gray-300"
                    )} />
                    JavaScript enabled
                  </li>
                  <li className="flex items-center text-sm">
                    <span className={cn(
                      "w-2 h-2 rounded-full mr-2",
                      crawlData.additionalSettings.prerenderPages ? "bg-green-500" : "bg-gray-300"
                    )} />
                    Pre-render pages
                  </li>
                </ul>
              </div>
            </div>

            {crawlData.additionalSettings.enableRecurringCrawl && (
              <div className="border-t border-gray-200 pt-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recurring crawl</h4>
                <p className="text-sm text-gray-900">
                  Frequency: {crawlData.additionalSettings.crawlFrequency}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

