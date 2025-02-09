import type { CrawlData } from "../CrawlWizard"
import { cn } from "../../lib/utils"

interface SummaryStepProps {
  crawlData: CrawlData
  onEdit: (step: number) => void
}

export function SummaryStep({ crawlData, onEdit }: SummaryStepProps) {
  // Helper to check if any resource collection options are enabled
  const hasResourceSettings = Object.values(crawlData.additionalSettings.collectResources).some(Boolean)
  
  // Helper to check if any authentication settings are configured
  const hasAuthSettings = Boolean(
    crawlData.additionalSettings.userAgent ||
    crawlData.additionalSettings.sessionCookie ||
    crawlData.additionalSettings.bearerToken
  )

  return (
    <div className="space-y-6">
      {/* Crawl Type Section */}
      <div className="border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-base font-medium text-gray-900">Type</h3>
              <p className="mt-1 text-sm text-gray-500">Selected crawl type and basic configuration</p>
            </div>
            <button
              onClick={() => onEdit(1)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Edit
            </button>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200 rounded-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900">
                  {crawlData.crawlType === "discovery" ? "Discovery crawl" : "Content extraction"}
                </span>
                <span className={cn(
                  "px-2 py-0.5 text-xs font-medium rounded-sm",
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
      </div>

      {/* Scope Section */}
      <div className="border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-base font-medium text-gray-900">Scope</h3>
              <p className="mt-1 text-sm text-gray-500">Crawl scope and limitations</p>
            </div>
            <button
              onClick={() => onEdit(2)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Edit
            </button>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200 rounded-sm space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-900">
                {crawlData.scope === "all" ? "Crawl entire site" : "Crawl specific pages"}
              </span>
              {crawlData.scope === "specific" && crawlData.specificPages.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  <p className="mb-1">Selected pages:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {crawlData.specificPages.map((page, index) => (
                      <li key={index} className="text-xs">{page}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {crawlData.excludedPages.length > 0 && (
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Excluded pages:</p>
                <ul className="list-disc pl-4 space-y-1">
                  {crawlData.excludedPages.map((page, index) => (
                    <li key={index} className="text-xs">{page}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Settings Section - Only shown if any settings are configured */}
      {(hasResourceSettings || crawlData.additionalSettings.useCrest || hasAuthSettings || crawlData.additionalSettings.enableRecurringCrawl) && (
        <div className="border border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-medium text-gray-900">Settings</h3>
                <p className="mt-1 text-sm text-gray-500">Additional configuration options</p>
              </div>
              <button
                onClick={() => onEdit(3)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Edit
              </button>
            </div>
            <div className="bg-gray-50 p-4 border border-gray-200 rounded-sm space-y-4">
              {/* JavaScript Support */}
              {crawlData.additionalSettings.useCrest && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">JavaScript support</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      JavaScript processing enabled
                    </li>
                    {crawlData.additionalSettings.prerenderPages && (
                      <li className="flex items-center text-sm text-gray-600 ml-6">
                        <svg className="w-4 h-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Pre-render pages enabled
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Resource Collection */}
              {hasResourceSettings && (
                <div className="pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Resource collection</h4>
                  <ul className="space-y-1">
                    {Object.entries(crawlData.additionalSettings.collectResources)
                      .filter(([, enabled]) => enabled)
                      .map(([key]) => (
                        <li key={key} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {formatResourceType(key)}
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* Authentication Settings */}
              {hasAuthSettings && (
                <div className="pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Authentication</h4>
                  <ul className="space-y-1">
                    {crawlData.additionalSettings.userAgent && (
                      <li className="text-sm text-gray-600">
                        <span className="font-medium">User agent:</span> {crawlData.additionalSettings.userAgent}
                      </li>
                    )}
                    {crawlData.additionalSettings.sessionCookie && (
                      <li className="text-sm text-gray-600">
                        <span className="font-medium">Session cookie:</span> configured
                      </li>
                    )}
                    {crawlData.additionalSettings.bearerToken && (
                      <li className="text-sm text-gray-600">
                        <span className="font-medium">Bearer token:</span> configured
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Recurring Crawl */}
              {crawlData.additionalSettings.enableRecurringCrawl && (
                <div className="pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Recurring crawl</h4>
                  <p className="text-sm text-gray-600">
                    Frequency: {formatFrequency(crawlData.additionalSettings.crawlFrequency)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to format resource type names
function formatResourceType(key: string): string {
  const formats: Record<string, string> = {
    htmlPages: "HTML pages",
    codeStyleFiles: "Code & style files",
    imagesFiles: "Image files",
    errorPages: "Error pages",
    redirectionPages: "Redirection pages"
  }
  return formats[key] || key
}

// Helper function to format frequency
function formatFrequency(frequency: string): string {
  return frequency.charAt(0).toUpperCase() + frequency.slice(1)
}

