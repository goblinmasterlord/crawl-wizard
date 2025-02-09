"use client"

import { useEffect, useRef } from "react"
import type { CrawlData } from "../CrawlWizard"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AdditionalSettingsStepProps {
  crawlData: CrawlData
  updateCrawlData: (newData: Partial<CrawlData>) => void
}

export function AdditionalSettingsStep({ crawlData, updateCrawlData }: AdditionalSettingsStepProps) {
  const handleFrequencyChange = (frequency: "daily" | "weekly" | "monthly") => {
    updateCrawlData({
      additionalSettings: { ...crawlData.additionalSettings, crawlFrequency: frequency },
    })
  }

  const toggleRecurringCrawl = () => {
    updateCrawlData({
      additionalSettings: {
        ...crawlData.additionalSettings,
        enableRecurringCrawl: !crawlData.additionalSettings.enableRecurringCrawl,
      },
    })
  }

  const togglePrerenderPages = () => {
    updateCrawlData({
      additionalSettings: {
        ...crawlData.additionalSettings,
        prerenderPages: !crawlData.additionalSettings.prerenderPages,
        useCrest: !crawlData.additionalSettings.prerenderPages || crawlData.additionalSettings.useCrest,
      },
    })
  }

  const toggleUseCrest = (checked: boolean) => {
    updateCrawlData({
      additionalSettings: {
        ...crawlData.additionalSettings,
        useCrest: checked,
        prerenderPages: checked ? crawlData.additionalSettings.prerenderPages : false,
      },
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
      })
    }
  }, [crawlData.additionalSettings.useCrest]);

  return (
    <div className="space-y-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Resource Collection</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-sm text-gray-500 cursor-help">ⓘ</span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>Choose which types of content to collect during the crawl. Collecting only what you need will make the crawl faster and more efficient.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="p-6 border border-gray-200 bg-white space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Content resources</h4>
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={crawlData.additionalSettings.collectResources.htmlPages}
                        onChange={(e) => toggleResourceCollection("htmlPages")}
                        className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">HTML pages</span>
                        <span className="text-xs text-gray-500 block mt-0.5">
                          Main content of your website
                        </span>
                      </div>
                    </label>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={crawlData.additionalSettings.collectResources.errorPages}
                        onChange={(e) => toggleResourceCollection("errorPages")}
                        className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Error pages</span>
                        <span className="text-xs text-gray-500 block mt-0.5">
                          404 and other error pages
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Additional resources</h4>
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={crawlData.additionalSettings.collectResources.codeStyleFiles}
                        onChange={(e) => toggleResourceCollection("codeStyleFiles")}
                        className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Code & style files</span>
                        <span className="text-xs text-gray-500 block mt-0.5">
                          JavaScript and CSS files
                        </span>
                      </div>
                    </label>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={crawlData.additionalSettings.collectResources.imagesFiles}
                        onChange={(e) => toggleResourceCollection("imagesFiles")}
                        className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Image files</span>
                        <span className="text-xs text-gray-500 block mt-0.5">
                          PNG, JPG, SVG and other images
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">JavaScript Support</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-sm text-gray-500 cursor-help">ⓘ</span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>Configure how JavaScript content is handled during crawling. Enable these options if your site relies heavily on JavaScript for content.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="p-6 border border-gray-200 bg-white space-y-6">
              <div className="space-y-4">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={crawlData.additionalSettings.useCrest}
                    onChange={(e) => toggleUseCrest(e.target.checked)}
                    className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Enable JavaScript processing</span>
                      <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">Recommended</span>
                    </div>
                    <span className="text-xs text-gray-500 block mt-0.5">
                      Process JavaScript-rendered content for more accurate results
                    </span>
                  </div>
                </label>

                {crawlData.additionalSettings.useCrest && (
                  <label className="flex items-start space-x-3 ml-7">
                    <input
                      type="checkbox"
                      checked={crawlData.additionalSettings.prerenderPages}
                      onChange={(e) => togglePrerenderPages()}
                      className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Pre-render pages</span>
                      <span className="text-xs text-gray-500 block mt-0.5">
                        Wait for full page load before processing
                      </span>
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Advanced settings</h3>
            <div className="border border-gray-200 bg-white">
              <Accordion type="single" collapsible>
                <AccordionItem value="advanced-settings">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">Authentication & Crawl Settings</span>
                      <span className="text-xs text-gray-500">(Advanced)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-6 border-t border-gray-100 space-y-6">
                      {/* Authentication Section */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-900">Authentication</h4>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <label className="text-sm font-medium text-gray-700">User Agent</label>
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
                              <label className="text-sm font-medium text-gray-700">Session Cookie</label>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-blue-600 bg-blue-100">?</span>
                                  </TooltipTrigger>
                                  <TooltipContent side="right" className="p-3 max-w-xs">
                                    <p className="text-sm">Required for authenticated pages:</p>
                                    <ul className="list-disc ml-4 mt-1 text-xs space-y-1">
                                      <li>Find in browser DevTools > Application > Cookies</li>
                                      <li>Usually named 'session' or 'PHPSESSID'</li>
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
                              <label className="text-sm font-medium text-gray-700">Bearer Token</label>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-blue-600 bg-blue-100">?</span>
                                  </TooltipTrigger>
                                  <TooltipContent side="right" className="p-3 max-w-xs">
                                    <p className="text-sm">For API authentication:</p>
                                    <ul className="list-disc ml-4 mt-1 text-xs space-y-1">
                                      <li>Find in browser DevTools > Network</li>
                                      <li>Look for 'Authorization: Bearer' header</li>
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

                      {/* Recurring Crawl Section */}
                      <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">Recurring Crawl</h4>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-blue-600 bg-blue-100">?</span>
                              </TooltipTrigger>
                              <TooltipContent side="right" className="p-3 max-w-xs">
                                <p className="text-sm">Automatically repeat this crawl on a schedule to keep content in sync</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        <div className="space-y-4">
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
                            <span className="text-sm text-gray-700">Enable recurring crawl</span>
                          </label>

                          {crawlData.additionalSettings.enableRecurringCrawl && (
                            <div className="ml-7">
                              <label className="text-sm font-medium text-gray-700 block mb-2">
                                Frequency
                              </label>
                              <select
                                value={crawlData.additionalSettings.crawlFrequency}
                                onChange={(e) =>
                                  updateCrawlData({
                                    additionalSettings: { ...crawlData.additionalSettings, crawlFrequency: e.target.value },
                                  })
                                }
                                className="w-full p-2 border border-gray-200 text-sm bg-white"
                              >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

