"use client"

import { useEffect, useRef } from "react"
import type { CrawlData } from "../CrawlWizard"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface AdditionalSettingsStepProps {
  crawlData: CrawlData
  updateCrawlData: (newData: Partial<CrawlData>) => void
  crawlType: "discovery" | "content-extraction"
}

const AdvancedTag = () => (
  <div className="flex items-center space-x-2">
    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 flex items-center">
      <svg className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
      Advanced
    </span>
  </div>
);

export function AdditionalSettingsStep({ crawlData, updateCrawlData, crawlType }: AdditionalSettingsStepProps) {
  const handleFrequencyChange = (frequency: "daily" | "weekly" | "monthly") => {
    updateCrawlData({
      additionalSettings: { ...crawlData.additionalSettings, crawlFrequency: frequency },
    })
  }

  const toggleResourceCollection = (resource: keyof CrawlData["additionalSettings"]["collectResources"]) => {
    updateCrawlData({
      additionalSettings: {
        ...crawlData.additionalSettings,
        collectResources: {
          ...crawlData.additionalSettings.collectResources,
          [resource]: !crawlData.additionalSettings.collectResources[resource],
        },
      },
    })
  }

  const prevUseCrestRef = useRef(crawlData.additionalSettings.useCrest);

  useEffect(() => {
    const prevUseCrest = prevUseCrestRef.current;
    prevUseCrestRef.current = crawlData.additionalSettings.useCrest;

    if (prevUseCrest && !crawlData.additionalSettings.useCrest) {
      updateCrawlData({
        additionalSettings: {
          ...crawlData.additionalSettings,
          prerenderPages: false,
        },
      });
    }
  }, [crawlData.additionalSettings.useCrest, crawlData.additionalSettings, updateCrawlData]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200">
        <div className="p-8 space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Resource Collection</h3>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-sm bg-gray-100 text-gray-600 cursor-help">?</span>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="p-3 text-sm bg-white border border-gray-200">
                    <p>Choose which types of content to collect during the crawl. Collecting only what you need will make the crawl faster and more efficient.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="p-6 border border-gray-200 bg-white space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Primary Content</h4>
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={crawlData.additionalSettings.collectResources.htmlPages}
                    onChange={() => toggleResourceCollection("htmlPages")}
                    className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">HTML pages</span>
                    <span className="text-xs text-gray-500 block mt-0.5">
                      Main content of your website (Recommended)
                    </span>
                  </div>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">Additional Resources</h4>
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-sm bg-gray-100 text-gray-600 cursor-help">?</span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="p-3 text-sm bg-white border border-gray-200">
                        <p>Only enable these if you need to translate content in these resources</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="mt-3 space-y-3">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={crawlData.additionalSettings.collectResources.codeStyleFiles}
                      onChange={() => toggleResourceCollection("codeStyleFiles")}
                      className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">JavaScript & CSS files</span>
                      <span className="text-xs text-gray-500 block mt-0.5">
                        For translating content in scripts and styles
                      </span>
                    </div>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={crawlData.additionalSettings.collectResources.imagesFiles}
                      onChange={() => toggleResourceCollection("imagesFiles")}
                      className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Image files</span>
                      <span className="text-xs text-gray-500 block mt-0.5">
                        For replacing images with localized versions
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">System Pages</h4>
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-sm bg-gray-100 text-gray-600 cursor-help">?</span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="p-3 text-sm bg-white border border-gray-200">
                        <p>Special pages that might need translation</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="mt-3 space-y-3">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={crawlData.additionalSettings.collectResources.errorPages}
                      onChange={() => toggleResourceCollection("errorPages")}
                      className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Error pages</span>
                      <span className="text-xs text-gray-500 block mt-0.5">
                        404 and other error pages that should be translated
                      </span>
                    </div>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={crawlData.additionalSettings.collectResources.redirectionPages}
                      onChange={() => toggleResourceCollection("redirectionPages")}
                      className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Redirection pages</span>
                      <span className="text-xs text-gray-500 block mt-0.5">
                        Pages that redirect users to other content
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {crawlType === "content-extraction" && (
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recurring Crawl</h3>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-sm bg-gray-100 text-gray-600 cursor-help">?</span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="p-3 text-sm bg-white border border-gray-200">
                      <p>Schedule automatic crawls to keep your content up to date</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="p-6 border border-gray-200 bg-white space-y-4">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={crawlData.additionalSettings.enableRecurringCrawl}
                    onChange={(e) =>
                      updateCrawlData({
                        additionalSettings: { ...crawlData.additionalSettings, enableRecurringCrawl: e.target.checked },
                      })
                    }
                    className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Enable automatic crawls</span>
                    <span className="text-xs text-gray-500 block mt-0.5">
                      Automatically repeat this crawl to keep content in sync
                    </span>
                  </div>
                </label>

                {crawlData.additionalSettings.enableRecurringCrawl && (
                  <div className="ml-7 p-4 bg-gray-50 border border-gray-200">
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Crawl frequency
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["daily", "weekly", "monthly"].map((freq) => (
                        <button
                          key={freq}
                          onClick={() => handleFrequencyChange(freq as "daily" | "weekly" | "monthly")}
                          className={cn(
                            "p-2 text-sm border text-center transition-colors",
                            crawlData.additionalSettings.crawlFrequency === freq
                              ? "bg-blue-50 border-blue-200 text-blue-700"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          )}
                        >
                          {freq.charAt(0).toUpperCase() + freq.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-8">
        <div className="flex items-center mb-6">
          <h3 className="text-lg font-medium text-gray-800">Advanced settings</h3>
          <AdvancedTag />
        </div>
        
        <div className="p-8 bg-gray-50 border border-gray-200">
          <div className="text-sm text-gray-600 mb-6">
            These settings are for advanced users who need additional configuration options.
          </div>

          <div className="bg-white border border-gray-200 mb-6">
            <Accordion type="single" collapsible>
              <AccordionItem value="authentication">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">Authentication</span>
                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-sm bg-gray-100 text-gray-600 cursor-help">?</span>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="p-3 text-sm bg-white border border-gray-200">
                          <p>Configure authentication settings for accessing protected content</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-6 border-t border-gray-100 space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-gray-900">Authentication</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <label className="text-sm font-medium text-gray-700">User agent</label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <span className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-blue-600 bg-blue-100">?</span>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="p-3 max-w-xs">
                                  <p className="text-sm">Identifies your crawler to websites:</p>
                                  <ul className="list-disc ml-4 mt-1 text-xs space-y-1">
                                    <li>Leave empty to use default Lokalise crawler</li>
                                    <li>Custom format: BrandName/1.0</li>
                                  </ul>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <input
                            type="text"
                            value={crawlData.additionalSettings.userAgent}
                            onChange={(e) =>
                              updateCrawlData({
                                additionalSettings: { ...crawlData.additionalSettings, userAgent: e.target.value },
                              })
                            }
                            placeholder="MyCompany/1.0"
                            className="w-full p-2 border border-gray-200 text-sm"
                          />
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <label className="text-sm font-medium text-gray-700">Session cookie</label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <span className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-blue-600 bg-blue-100">?</span>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="p-3 max-w-xs">
                                  <p className="text-sm">Required for authenticated pages:</p>
                                  <ul className="list-disc ml-4 mt-1 text-xs space-y-1">
                                    <li>Find in browser DevTools {`>`} Application {`>`} Cookies</li>
                                    <li>Usually named &apos;session&apos; or &apos;PHPSESSID&apos;</li>
                                  </ul>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <input
                            type="text"
                            value={crawlData.additionalSettings.sessionCookie}
                            onChange={(e) =>
                              updateCrawlData({
                                additionalSettings: { ...crawlData.additionalSettings, sessionCookie: e.target.value },
                              })
                            }
                            placeholder="PHPSESSID=abc123..."
                            className="w-full p-2 border border-gray-200 text-sm"
                          />
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <label className="text-sm font-medium text-gray-700">Bearer token</label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <span className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-blue-600 bg-blue-100">?</span>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="p-3 max-w-xs">
                                  <p className="text-sm">For API authentication:</p>
                                  <ul className="list-disc ml-4 mt-1 text-xs space-y-1">
                                    <li>Find in browser DevTools {`>`} Network</li>
                                    <li>Look for &apos;Authorization: Bearer&apos; header</li>
                                  </ul>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <input
                            type="text"
                            value={crawlData.additionalSettings.bearerToken}
                            onChange={(e) =>
                              updateCrawlData({
                                additionalSettings: { ...crawlData.additionalSettings, bearerToken: e.target.value },
                              })
                            }
                            placeholder="Bearer eyJhbGc..."
                            className="w-full p-2 border border-gray-200 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}

