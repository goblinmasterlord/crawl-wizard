"use client"

import { useEffect } from "react"
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

  useEffect(() => {
    if (!crawlData.additionalSettings.useCrest) {
      updateCrawlData({
        additionalSettings: {
          ...crawlData.additionalSettings,
          prerenderPages: false,
        },
      })
    }
  }, [crawlData.additionalSettings.useCrest, updateCrawlData])

  return (
    <div className="space-y-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Basic Settings</h3>

          <div className="pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Crawl Scheduling</h4>
            <div className="flex items-center mb-4">
              <Switch
                id="enableRecurringCrawl"
                checked={crawlData.additionalSettings.enableRecurringCrawl}
                onCheckedChange={toggleRecurringCrawl}
              />
              <label htmlFor="enableRecurringCrawl" className="ml-2 block text-sm text-gray-900">
                Enable Recurring Crawl
              </label>
            </div>
            {crawlData.additionalSettings.enableRecurringCrawl && (
              <div className="ml-6 space-y-2">
                <p className="text-sm text-gray-600">Select crawl frequency:</p>
                <div className="flex space-x-4">
                  {(["daily", "weekly", "monthly"] as const).map((frequency) => (
                    <label key={frequency} className="inline-flex items-center">
                      <input
                        type="radio"
                        checked={crawlData.additionalSettings.crawlFrequency === frequency}
                        onChange={() => handleFrequencyChange(frequency)}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{frequency}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Collect Website Resources</h4>
            <div className="space-y-4">
              <TooltipProvider>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="collectHtmlPages"
                    checked={crawlData.additionalSettings.collectResources.htmlPages}
                    onCheckedChange={() => toggleResourceCollection("htmlPages")}
                  />
                  <label
                    htmlFor="collectHtmlPages"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    HTML Pages
                  </label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-sm text-gray-500">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Collect the main web pages from your site.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="collectCodeStyleFiles"
                    checked={crawlData.additionalSettings.collectResources.codeStyleFiles}
                    onCheckedChange={() => toggleResourceCollection("codeStyleFiles")}
                  />
                  <label
                    htmlFor="collectCodeStyleFiles"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Code & Style Files
                  </label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-sm text-gray-500">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Collect JavaScript, JSON, XML, and CSS files that contain text.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="collectImagesFiles"
                    checked={crawlData.additionalSettings.collectResources.imagesFiles}
                    onCheckedChange={() => toggleResourceCollection("imagesFiles")}
                  />
                  <label
                    htmlFor="collectImagesFiles"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Images & Files
                  </label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-sm text-gray-500">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Collect images and other binary files that may need localization.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="advanced-settings">
          <AccordionTrigger>Advanced Settings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 mt-4">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">JavaScript Support</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="useCrest"
                      checked={crawlData.additionalSettings.useCrest}
                      onCheckedChange={toggleUseCrest}
                    />
                    <label htmlFor="useCrest" className="text-sm font-medium text-gray-900">
                      Use Crest
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">Use Crest for improved crawling capabilities.</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="prerenderPages"
                      checked={crawlData.additionalSettings.prerenderPages}
                      onCheckedChange={togglePrerenderPages}
                      disabled={!crawlData.additionalSettings.useCrest}
                    />
                    <label htmlFor="prerenderPages" className="text-sm font-medium text-gray-900">
                      Prerender Pages
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Load JavaScript before crawling for more accurate results. (Slower, more expensive)
                  </p>
                </div>
              </div>

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

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Additional Resource Collection</h4>
                <TooltipProvider>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="collectErrorPages"
                      checked={crawlData.additionalSettings.collectResources.errorPages}
                      onCheckedChange={() => toggleResourceCollection("errorPages")}
                    />
                    <label
                      htmlFor="collectErrorPages"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Broken Pages (4XX Errors)
                    </label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-sm text-gray-500">ⓘ</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Collect pages with errors (broken links).</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="collectRedirectionPages"
                      checked={crawlData.additionalSettings.collectResources.redirectionPages}
                      onCheckedChange={() => toggleResourceCollection("redirectionPages")}
                    />
                    <label
                      htmlFor="collectRedirectionPages"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Redirected Pages (3XX Redirects)
                    </label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-sm text-gray-500">ⓘ</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Collect pages with redirects.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

