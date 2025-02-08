import type { CrawlData } from "../CrawlWizard"

interface SummaryStepProps {
  crawlData: CrawlData
  onEdit: (step: number) => void
}

export function SummaryStep({ crawlData, onEdit }: SummaryStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700">Summary of Your Crawl Settings</h3>

      <div className="bg-gray-50 p-4 border border-gray-300">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">Crawl Type</h4>
          <button onClick={() => onEdit(1)} className="text-blue-600 hover:underline text-sm">
            Edit
          </button>
        </div>
        <p>{crawlData.crawlType === "discovery" ? "Discovery" : "Content Extraction"}</p>
      </div>

      <div className="bg-gray-50 p-4 border border-gray-300">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">Crawl Scope</h4>
          <button onClick={() => onEdit(2)} className="text-blue-600 hover:underline text-sm">
            Edit
          </button>
        </div>
        <p>{crawlData.scope === "all" ? "All Discovered Pages" : "Specific Pages"}</p>
        {crawlData.scope === "all" && (
          <p className="mt-2">Check for new pages: {crawlData.checkNewPages ? "Yes" : "No"}</p>
        )}
        {crawlData.scope === "specific" && (
          <div className="mt-2">
            <p>Specific Pages:</p>
            <ul className="list-disc pl-5">
              {crawlData.specificPages.map((page, index) => (
                <li key={index}>{page}</li>
              ))}
            </ul>
          </div>
        )}
        {crawlData.sitemapFile && <p className="mt-2">Sitemap file: {crawlData.sitemapFile}</p>}
        {crawlData.scope === "all" && crawlData.excludedPages.length > 0 && (
          <div className="mt-2">
            <p>Excluded Pages:</p>
            <ul className="list-disc pl-5">
              {crawlData.excludedPages.map((page, index) => (
                <li key={index}>{page}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 border border-gray-300">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">Additional Settings</h4>
          <button onClick={() => onEdit(3)} className="text-blue-600 hover:underline text-sm">
            Edit
          </button>
        </div>
        <p>Source Language: {crawlData.additionalSettings.sourceLanguage}</p>
        <p>Target Languages: {crawlData.additionalSettings.targetLanguages}</p>
        <p>Translate Metadata: {crawlData.additionalSettings.translateMetadata ? "Yes" : "No"}</p>
        <p>Respect robots.txt: {crawlData.additionalSettings.respectRobotsTxt ? "Yes" : "No"}</p>
        <p>Crawl Limit: {crawlData.crawlLimit} pages</p>
        <p>Recurring Crawl: {crawlData.additionalSettings.enableRecurringCrawl ? "Enabled" : "Disabled"}</p>
        {crawlData.additionalSettings.enableRecurringCrawl && (
          <p>Crawl Frequency: {crawlData.additionalSettings.crawlFrequency}</p>
        )}
      </div>
    </div>
  )
}

