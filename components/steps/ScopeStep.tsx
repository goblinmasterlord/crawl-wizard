"use client"

import { useState } from "react"
import type { CrawlData } from "../CrawlWizard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ScopeStepProps {
  crawlData: CrawlData
  updateCrawlData: (newData: Partial<CrawlData>) => void
}

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
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">Crawl Scope</h3>
          <a
            href="/previous-discovery-scan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            View results of previous discovery scan →
          </a>
        </div>
        <div className="space-y-4">
          <div
            className={`p-4 border-l-4 ${
              crawlData.scope === "all" ? "border-l-blue-600 bg-blue-50" : "border-l-gray-300 bg-gray-50"
            } border border-gray-300 rounded-md cursor-pointer hover:shadow-md transition-shadow`}
            onClick={() => handleScopeChange("all")}
          >
            <h4 className="text-lg font-medium mb-2">All Discovered Pages</h4>
            <p className="text-sm text-gray-600 mb-4">
              Crawl all pages that were discovered in previous scans. This ensures your content stays up-to-date.
            </p>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={crawlData.checkNewPages}
                onChange={handleCheckNewPages}
                className="form-checkbox text-blue-600 h-5 w-5"
              />
              <span className="text-sm text-gray-700">
                Also check for new pages (may increase crawl time and quota usage)
              </span>
            </label>
          </div>
          <div
            className={`p-4 border-l-4 ${
              crawlData.scope === "specific" ? "border-l-blue-600 bg-blue-50" : "border-l-gray-300 bg-gray-50"
            } border border-gray-300 rounded-md cursor-pointer hover:shadow-md transition-shadow`}
            onClick={() => handleScopeChange("specific")}
          >
            <h4 className="text-lg font-medium mb-2">Specific Pages</h4>
            <p className="text-sm text-gray-600 mb-2">
              Crawl only the pages you specify. Ideal for targeting specific sections of your website.
            </p>
          </div>
        </div>
        {crawlData.scope === "specific" && (
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="specificPages" className="block text-sm font-medium text-gray-700 mb-2">
                Enter specific pages to crawl (one URL per line):
              </label>
              <textarea
                id="specificPages"
                value={crawlData.specificPages.join("\n")}
                onChange={handleSpecificPagesChange}
                placeholder="https://example.com/page1
https://example.com/page2"
                className="w-full h-32 p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label htmlFor="sitemapUpload" className="block text-sm font-medium text-gray-700 mb-2">
                Or upload a sitemap file:
              </label>
              <input
                type="file"
                id="sitemapUpload"
                accept=".xml,.txt"
                onChange={handleSitemapUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
          </div>
        )}
      </div>

      {crawlData.scope === "all" && (
        <div className="space-y-4">
          <button
            onClick={() => setShowExcludedPages(!showExcludedPages)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {showExcludedPages ? "Hide" : "Add"} Excluded Pages
          </button>
          {showExcludedPages && (
            <>
              <p className="text-sm text-gray-600 mb-2">
                Enter URLs or patterns to exclude from crawling (one per line). This helps you avoid unnecessary
                crawling and reduce costs.
              </p>
              <textarea
                value={crawlData.excludedPages.join("\n")}
                onChange={handleExcludedPagesChange}
                placeholder="https://example.com/exclude-this-page
*.pdf"
                className="w-full h-32 p-2 border border-gray-300 rounded-md text-sm"
              />
            </>
          )}
        </div>
      )}

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="advanced-settings">
          <AccordionTrigger>Advanced Settings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 mt-4">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-6 space-y-6">
                  <h4 className="text-lg font-medium text-gray-900">Limit Crawl</h4>
                  <Tabs defaultValue="limitTo" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="limitTo">Limit To</TabsTrigger>
                      <TabsTrigger value="exclude">Exclude</TabsTrigger>
                    </TabsList>
                    <TabsContent value="limitTo">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="limitTo" className="block text-sm font-medium text-gray-700 mb-1">
                            Only Crawl URLs Starting With
                          </label>
                          <p className="text-sm text-gray-500 mb-2">
                            Enter URL prefixes to include (e.g., /en/, /products/).
                          </p>
                          <textarea
                            id="limitTo"
                            value={crawlData.additionalSettings.limitTo?.join(", ") || ""}
                            onChange={handleLimitToChange}
                            placeholder="/en/, /products/"
                            className="w-full h-24 p-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="crawlDepth" className="block text-sm font-medium text-gray-700 mb-1">
                            Crawl Depth
                          </label>
                          <p className="text-sm text-gray-500 mb-2">
                            Limit how many links deep the crawler will follow.
                          </p>
                          <input
                            type="number"
                            id="crawlDepth"
                            value={crawlData.additionalSettings.crawlDepth}
                            onChange={handleCrawlDepthChange}
                            min={0}
                            max={10}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="exclude">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="excludeUrls" className="block text-sm font-medium text-gray-700 mb-1">
                            Exclude URLs
                          </label>
                          <p className="text-sm text-gray-500 mb-2">
                            Enter URLs or patterns to exclude (one per line). You can use wildcards (*) or regular
                            expressions.
                          </p>
                          <textarea
                            id="excludeUrls"
                            value={crawlData.additionalSettings.excludeUrls?.join("\n") || ""}
                            onChange={handleExcludeUrlsChange}
                            placeholder="/blog/*
^/admin/.*$
*.pdf"
                            className="w-full h-32 p-2 border border-gray-300 rounded-md text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            For advanced regex patterns, use the ^ and $ anchors. Example: ^/blog/[0-9]{4}/.*$
                          </p>
                          <a
                            href="https://regex101.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Test your regex
                          </a>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

