import type { CrawlData } from "../CrawlWizard"
import { cn } from "../../lib/utils"

interface CrawlTypeStepProps {
  crawlData: CrawlData
  updateCrawlData: (newData: Partial<CrawlData>) => void
}

export function CrawlTypeStep({ crawlData, updateCrawlData }: CrawlTypeStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div
          className={cn(
            "p-6 border-l-4 border border-gray-200 cursor-pointer transition-all",
            crawlData.crawlType === "discovery" 
              ? "border-l-blue-600 bg-blue-50/50 border-gray-300" 
              : "border-l-gray-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:border-gray-300"
          )}
          onClick={() => updateCrawlData({ crawlType: "discovery" })}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium">Discovery crawl</h3>
            <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-sm">
              Free
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            Maps site structure and counts words without storing content. Perfect for initial site analysis and help you choose the right plan.
          </p>
        </div>

        <div
          className={cn(
            "p-6 border-l-4 border border-gray-200 cursor-pointer transition-all",
            crawlData.crawlType === "content-extraction" 
              ? "border-l-blue-600 bg-blue-50/50 border-gray-300" 
              : "border-l-gray-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:border-gray-300"
          )}
          onClick={() => updateCrawlData({ crawlType: "content-extraction" })}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium">Content extraction</h3>
            <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-sm">
              Uses Quota
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            Extracts and stores content for translation. This process will use your subscription word quota.
          </p>
        </div>
      </div>
    </div>
  )
}

