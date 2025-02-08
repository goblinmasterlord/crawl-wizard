import type { CrawlData } from "../CrawlWizard"

interface CrawlTypeStepProps {
  crawlData: CrawlData
  updateCrawlData: (newData: Partial<CrawlData>) => void
}

export function CrawlTypeStep({ crawlData, updateCrawlData }: CrawlTypeStepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Crawl Type</h2>
      <div className="space-y-4">
        <div
          className={`p-4 border-t-4 ${
            crawlData.crawlType === "discovery" ? "border-t-blue-600 bg-gray-50" : "border-t-gray-300"
          } border-x border-b border-gray-300 cursor-pointer relative hover:shadow-md transition-shadow`}
          onClick={() => updateCrawlData({ crawlType: "discovery" })}
        >
          <h3 className="text-lg font-medium mb-2">Discover your site</h3>
          <p className="text-sm text-gray-600 mb-2">
            Maps site structure and counts words without storing content.
          </p>
          <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1">Free</div>
          <div className="text-xs text-gray-500">Recommended for initial site analysis and project planning</div>
        </div>
        <div
          className={`p-4 border-t-4 ${
            crawlData.crawlType === "content-extraction" ? "border-t-blue-600 bg-gray-50" : "border-t-gray-300"
          } border-x border-b border-gray-300 cursor-pointer relative hover:shadow-md transition-shadow`}
          onClick={() => updateCrawlData({ crawlType: "content-extraction" })}
        >
          <h3 className="text-lg font-medium mb-2">Extract content for translation</h3>
          <p className="text-sm text-gray-600 mb-2">
            Extracts and stores content for translation. Uses your subscription word quota.
          </p>
          <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1">Uses Quota</div>
          <div className="text-xs text-gray-500">Extracts content based on your subscription quota</div>
        </div>
      </div>
    </div>
  )
}

