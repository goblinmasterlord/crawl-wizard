import type { CrawlData } from "../CrawlWizard"
import { cn } from "../../lib/utils"

interface CrawlTypeStepProps {
  crawlData: CrawlData
  updateCrawlData: (newData: Partial<CrawlData>) => void
}

export function CrawlTypeStep({ crawlData, updateCrawlData }: CrawlTypeStepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Select crawl type</h2>
      <div className="space-y-4">
        <div
          className={cn(
            "p-6 border-l-4 border border-gray-200 cursor-pointer transition-all",
            crawlData.crawlType === "discovery"
              ? "border-l-blue-600 bg-blue-50/50 border-gray-300 hover:border-gray-400"
              : "border-l-gray-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:border-gray-300"
          )}
          onClick={() => updateCrawlData({ crawlType: "discovery" })}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium">Discover your site</h3>
            <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium">
              Free
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            Maps site structure and counts words without storing content. Perfect for initial analysis and planning.
          </p>
          <div className="flex items-center text-xs text-gray-500">
            <svg className="w-4 h-4 mr-1.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Recommended for initial site analysis
          </div>
        </div>

        <div
          className={cn(
            "p-6 border-l-4 border border-gray-200 cursor-pointer transition-all",
            crawlData.crawlType === "content-extraction" 
              ? "border-l-blue-600 bg-blue-50/50" 
              : "border-l-gray-200"
          )}
          onClick={() => updateCrawlData({ crawlType: "content-extraction" })}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium">Extract content for translation</h3>
            <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium">
              Uses Quota
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            Extracts and stores content for translation. This process will use your subscription word quota.
          </p>
          <div className="flex items-center text-xs text-gray-500">
            <svg className="w-4 h-4 mr-1.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Based on your subscription quota
          </div>
        </div>
      </div>
    </div>
  )
}

