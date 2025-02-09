"use client"

import { useState } from "react"
import type { CrawlData } from "../CrawlWizard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ScopeStepProps {
  crawlData: CrawlData
  updateCrawlData: (newData: Partial<CrawlData>) => void
}

const AdvancedTag = () => (
  <div className="flex items-center space-x-2">
    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 flex items-center">
      <svg className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
      For power users
    </span>
  </div>
);

export function ScopeStep({ crawlData, updateCrawlData }: ScopeStepProps) {
  const [showExcludedPages, setShowExcludedPages] = useState(false)

  const handleScopeChange = (scope: "all" | "specific") => {
    updateCrawlData({ scope, excludedPages: [] })
    setShowExcludedPages(false)
  }

  const handleCheckNewPages = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCrawlData({ checkNewPages: event.target.checked })
  }

  const handleSpecificPagesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const pages = event.target.value
      .split("\n")
      .map((page) => page.trim())
      .filter(Boolean)
    updateCrawlData({ specificPages: pages })
  }

  const handleExcludedPagesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const pages = event.target.value
      .split("\n")
      .map((page) => page.trim())
      .filter(Boolean)
    updateCrawlData({ excludedPages: pages })
  }

  const handleSitemapUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      updateCrawlData({ sitemapFile: file.name })
    }
  }

  const handleLimitToChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const limitTo = event.target.value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
    updateCrawlData({
      additionalSettings: {
        ...crawlData.additionalSettings,
        limitTo: limitTo,
      },
    })
  }

  const handleCrawlDepthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const crawlDepth = Number.parseInt(event.target.value, 10)
    updateCrawlData({ additionalSettings: { ...crawlData.additionalSettings, crawlDepth } })
  }

  const handleExcludeUrlsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const excludeUrls = event.target.value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
    updateCrawlData({
      additionalSettings: {
        ...crawlData.additionalSettings,
        excludeUrls: excludeUrls,
      },
    })
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Basic Options */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Define crawl scope</h2>
        
        <div className="space-y-4">
          <div
            className={cn(
              "p-6 border-l-4 border border-gray-200 cursor-pointer transition-all",
              crawlData.scope === "all" 
                ? "border-l-blue-600 bg-blue-50/50 border-gray-300" 
                : "border-l-gray-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:border-gray-300"
            )}
            onClick={() => handleScopeChange("all")}
          >
            <h3 className="text-lg font-medium mb-3">Crawl entire site</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Automatically discover and crawl all pages on your site. Best for complete site coverage.
            </p>
          </div>

          <div>
            <div
              className={cn(
                "p-6 border-l-4 border border-gray-200 cursor-pointer transition-all",
                crawlData.scope === "specific" 
                  ? "border-l-blue-600 bg-blue-50/50 border-gray-300" 
                  : "border-l-gray-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:border-gray-300"
              )}
              onClick={() => handleScopeChange("specific")}
            >
              <h3 className="text-lg font-medium mb-3">Select specific pages</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Choose exactly which pages to crawl. Best for targeting specific sections.
              </p>
            </div>
            
            {crawlData.scope === "specific" && (
              <div className="mt-4 space-y-4">
                <div className="p-4 border border-gray-200 bg-white">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Pages to crawl</h4>
                  <textarea
                    value={crawlData.specificPages.join("\n")}
                    onChange={handleSpecificPagesChange}
                    placeholder="https://example.com/page1&#10;https://example.com/page2"
                    className="w-full h-32 p-2 border border-gray-200 text-sm"
                  />
                  <p className="text-xs text-gray-500">Enter one URL per line</p>
                </div>

                <div className="p-4 border border-gray-200 bg-white">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Upload sitemap</h4>
                  <input
                    type="file"
                    accept=".xml,.txt"
                    onChange={handleSitemapUpload}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:border-0 file:text-sm file:font-medium
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Additional Settings */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Additional crawl settings</h3>

        <div className="p-4 border border-gray-200 bg-white space-y-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Crawl optimizations</h4>
          
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={crawlData.additionalSettings.skipContentTypeCheck}
              onChange={(e) =>
                updateCrawlData({
                  additionalSettings: { 
                    ...crawlData.additionalSettings, 
                    skipContentTypeCheck: e.target.checked 
                  },
                })
              }
              className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Optimize re-scan speed</span>
              <span className="text-xs text-gray-500 block mt-0.5">
                Skip content type checks for previously crawled pages to improve performance
              </span>
            </div>
          </label>

          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={crawlData.additionalSettings.skipExistingResources}
              onChange={(e) =>
                updateCrawlData({
                  additionalSettings: { 
                    ...crawlData.additionalSettings, 
                    skipExistingResources: e.target.checked 
                  },
                })
              }
              className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Skip existing resources</span>
              <span className="text-xs text-gray-500 block mt-0.5">
                Don't re-crawl resources that were already collected in previous crawls
              </span>
            </div>
          </label>
        </div>

        {crawlData.scope === "all" && (
          <div className="p-4 border border-gray-200 bg-white">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={crawlData.checkNewPages}
                onChange={handleCheckNewPages}
                className="h-4 w-4 text-blue-600 border-gray-300"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">Check for new pages</span>
                <span className="text-xs text-gray-500 block mt-0.5">
                  The crawler will look for pages not found in previous scans
                </span>
              </div>
            </label>
          </div>
        )}

        {crawlData.scope === "all" && (
          <div className="p-4 border border-gray-200 bg-white">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-gray-700">Excluded pages</h4>
              <button
                onClick={() => setShowExcludedPages(!showExcludedPages)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {showExcludedPages ? "Hide" : "Add exclusions"}
              </button>
            </div>
            {showExcludedPages && (
              <>
                <p className="text-sm text-gray-500 mb-3">
                  Enter URLs or patterns to skip during crawling (one per line)
                </p>
                <textarea
                  value={crawlData.excludedPages.join("\n")}
                  onChange={handleExcludedPagesChange}
                  placeholder="https://example.com/skip-this&#10;*.pdf"
                  className="w-full h-32 p-2 border border-gray-200 text-sm"
                />
              </>
            )}
          </div>
        )}
      </section>

      {/* Advanced Settings */}
      <section className="border-t border-gray-100 pt-8 mt-8">
        <div className="flex items-center mb-6">
          <h3 className="text-lg font-medium text-gray-800">Advanced settings</h3>
          <AdvancedTag />
        </div>
        <div className="p-8 border border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600 mb-6">
            These settings are for advanced users who need fine-grained control over the crawl behavior.
          </div>
          <div className="space-y-4">
            {/* URL Patterns Section */}
            <div className="bg-white border border-gray-200">
              <Accordion type="single" collapsible>
                <AccordionItem value="url-patterns">
                  <AccordionTrigger className="px-6 py-4 text-sm font-medium text-gray-700 hover:no-underline">
                    <div className="flex items-center space-x-2">
                      <span>Configure crawl limits and URL patterns</span>
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-sm bg-gray-100 text-gray-600 cursor-help">?</span>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="p-3 text-sm bg-white border border-gray-200">
                            <p>Fine-tune which URLs are crawled and how deep the crawler goes</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-6 space-y-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <label className="text-sm font-medium text-gray-700">
                            Crawl depth
                          </label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-blue-600 bg-blue-100">?</span>
                              </TooltipTrigger>
                              <TooltipContent side="right" className="p-3 max-w-xs">
                                <p className="text-sm">How many links deep to crawl:</p>
                                <ul className="list-disc ml-4 mt-1 text-xs space-y-1">
                                  <li>0 = Only specified pages</li>
                                  <li>1 = Include direct links</li>
                                  <li>2+ = Follow links deeper</li>
                                </ul>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <input
                          type="number"
                          value={crawlData.additionalSettings.crawlDepth}
                          onChange={handleCrawlDepthChange}
                          min={0}
                          max={10}
                          className="w-full p-2 border border-gray-200 text-sm"
                        />
                      </div>

                      <Tabs defaultValue="limitTo" className="w-full">
                        <TabsList className="mb-4">
                          <TabsTrigger value="limitTo">Limit to</TabsTrigger>
                          <TabsTrigger value="exclude">Exclude</TabsTrigger>
                        </TabsList>
                        <TabsContent value="limitTo">
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Only crawl URLs starting with
                            </label>
                            <textarea
                              value={crawlData.additionalSettings.limitTo?.join(", ") || ""}
                              onChange={handleLimitToChange}
                              placeholder="/en/, /products/"
                              className="w-full h-24 p-2 border border-gray-200 text-sm"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                              Comma-separated list of URL paths to include
                            </p>
                          </div>
                        </TabsContent>
                        <TabsContent value="exclude">
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Exclude URLs matching
                            </label>
                            <textarea
                              value={crawlData.additionalSettings.excludeUrls?.join("\n") || ""}
                              onChange={handleExcludeUrlsChange}
                              placeholder="/blog/*&#10;^/admin/.*$&#10;*.pdf"
                              className="w-full h-32 p-2 border border-gray-200 text-sm"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                              Enter patterns to exclude, one per line
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Performance Tweaks Section */}
            <div className="bg-white border border-gray-200">
              <Accordion type="single" collapsible>
                <AccordionItem value="performance">
                  <AccordionTrigger className="px-6 py-4 text-sm font-medium text-gray-700 hover:no-underline">
                    <div className="flex items-center space-x-2">
                      <span>Performance optimization</span>
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-sm bg-gray-100 text-gray-600 cursor-help">?</span>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="p-3 text-sm bg-white border border-gray-200">
                            <p>Configure settings to optimize crawl performance and server load</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-6 space-y-6">
                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={crawlData.additionalSettings.useEtags}
                          onChange={(e) =>
                            updateCrawlData({
                              additionalSettings: { 
                                ...crawlData.additionalSettings, 
                                useEtags: e.target.checked 
                              },
                            })
                          }
                          className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-700">Use ETAGs from last crawl</span>
                          <span className="text-xs text-gray-500 block mt-0.5">
                            Reduce server load on subsequent crawls (may affect wordcount accuracy)
                          </span>
                        </div>
                      </label>

                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <label className="text-sm font-medium text-gray-700">
                            Simultaneous requests limit
                          </label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-blue-600 bg-blue-100">?</span>
                              </TooltipTrigger>
                              <TooltipContent side="right" className="p-3 max-w-xs">
                                <p className="text-sm">Control how many requests can be sent simultaneously (1-8)</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <input
                          type="number"
                          min={1}
                          max={8}
                          value={crawlData.additionalSettings.simultaneousRequests}
                          onChange={(e) =>
                            updateCrawlData({
                              additionalSettings: { 
                                ...crawlData.additionalSettings, 
                                simultaneousRequests: Number(e.target.value) 
                              },
                            })
                          }
                          className="w-full p-2 border border-gray-200 text-sm"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

