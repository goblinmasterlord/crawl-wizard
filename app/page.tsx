"use client"

import { useState } from "react"
import { CrawlWizard } from "@/components/CrawlWizard"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Button onClick={() => setIsModalOpen(true)}>Open Crawl Wizard</Button>
      <CrawlWizard isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}

