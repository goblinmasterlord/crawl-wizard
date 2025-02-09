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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">Main Content</h4>
                <div className="space-y-2">
                  <TooltipProvider>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="collectHtmlPages"
                        checked={crawlData.additionalSettings.collectResources.htmlPages}
                        onCheckedChange={() => toggleResourceCollection("htmlPages")}
                      />
                      <label htmlFor="collectHtmlPages" className="text-sm text-gray-600">
                        HTML Pages
                      </label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-sm text-gray-500 cursor-help">ⓘ</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Collect the main web pages that contain your translatable content.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="collectCodeStyleFiles"
                        checked={crawlData.additionalSettings.collectResources.codeStyleFiles}
                        onCheckedChange={() => toggleResourceCollection("codeStyleFiles")}
                      />
                      <label htmlFor="collectCodeStyleFiles" className="text-sm text-gray-600">
                        JavaScript & CSS Files
                      </label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-sm text-gray-500 cursor-help">ⓘ</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Collect JavaScript, CSS, and other code files that may contain translatable text (e.g., error messages, UI labels).</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">Additional Resources</h4>
                <div className="space-y-2">
                  <TooltipProvider>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="collectImagesFiles"
                        checked={crawlData.additionalSettings.collectResources.imagesFiles}
                        onCheckedChange={() => toggleResourceCollection("imagesFiles")}
                      />
                      <label htmlFor="collectImagesFiles" className="text-sm text-gray-600">
                        Images & Media
                      </label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-sm text-gray-500 cursor-help">ⓘ</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Collect images and media files that may need localization (e.g., images with text, PDFs).</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="collectErrorPages"
                        checked={crawlData.additionalSettings.collectResources.errorPages}
                        onCheckedChange={() => toggleResourceCollection("errorPages")}
                      />
                      <label htmlFor="collectErrorPages" className="text-sm text-gray-600">
                        Error Pages (4XX)
                      </label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-sm text-gray-500 cursor-help">ⓘ</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Collect error pages (like 404 pages) that may need translation.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="collectRedirectionPages"
                        checked={crawlData.additionalSettings.collectResources.redirectionPages}
                        onCheckedChange={() => toggleResourceCollection("redirectionPages")}
                      />
                      <label htmlFor="collectRedirectionPages" className="text-sm text-gray-600">
                        Redirect Pages (3XX)
                      </label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-sm text-gray-500 cursor-help">ⓘ</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Collect redirection pages that may contain translatable content.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
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

            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="useCrest"
                    checked={crawlData.additionalSettings.useCrest}
                    onCheckedChange={toggleUseCrest}
                  />
                  <div>
                    <label htmlFor="useCrest" className="text-sm font-medium text-gray-900">
                      Enable JavaScript Processing
                    </label>
                    <p className="text-xs text-gray-500">
                      Use our JavaScript engine to process dynamic content
                    </p>
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-sm text-gray-500 cursor-help">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enable this for sites that load content dynamically using JavaScript.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex items-center justify-between pl-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="prerenderPages"
                    checked={crawlData.additionalSettings.prerenderPages}
                    onCheckedChange={togglePrerenderPages}
                    disabled={!crawlData.additionalSettings.useCrest}
                  />
                  <div>
                    <label htmlFor="prerenderPages" className="text-sm font-medium text-gray-900">
                      Pre-render Pages
                    </label>
                    <p className="text-xs text-gray-500">
                      Wait for JavaScript content to load before crawling
                    </p>
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-sm text-gray-500 cursor-help">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ensures all dynamic content is loaded before crawling. This makes crawling slower but more thorough.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="advanced-settings">
              <AccordionTrigger>Advanced Settings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6 mt-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700">Custom User Agent</h4>
                    <p className="text-sm text-gray-600">
                      Optionally override the crawler's default user agent with one of your choice. This is useful if you
                      want to be able to separate crawler traffic at your server.
                    </p>
                    <input
                      type="text"
                      value={crawlData.additionalSettings.userAgent}
                      onChange={(e) =>
                        updateCrawlData({
                          additionalSettings: { ...crawlData.additionalSettings, userAgent: e.target.value },
                        })
                      }
                      placeholder="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700">Session Cookie</h4>
                    <p className="text-sm text-gray-600">
                      Login areas on a site keep track of user sessions via cookies. Extract these cookies and pass them to
                      the crawler to access these website areas.
                    </p>
                    <input
                      type="text"
                      value={crawlData.additionalSettings.sessionCookie}
                      onChange={(e) =>
                        updateCrawlData({
                          additionalSettings: { ...crawlData.additionalSettings, sessionCookie: e.target.value },
                        })
                      }
                      placeholder="e.g PHPSESSID=xegpzebddfejxzuvqzpq"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700">Bearer Token</h4>
                    <p className="text-sm text-gray-600">
                      Bearer tokens can be used to access protected resources. You can extract this token from your
                      project's preview link by opening DevTools and copying the value of the Authorization header.
                    </p>
                    <input
                      type="text"
                      value={crawlData.additionalSettings.bearerToken}
                      onChange={(e) =>
                        updateCrawlData({
                          additionalSettings: { ...crawlData.additionalSettings, bearerToken: e.target.value },
                        })
                      }
                      placeholder="Bearer BQD0AGyylarlqiDrpzikCwS5"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

