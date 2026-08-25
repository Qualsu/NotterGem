"use client"

import { Navbar } from "@/components/(landing)/_components/navbar"
import { Footer } from "@/components/(landing)/_components/footer"

export function BuyLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-logo-yellow/5 dark:to-logo-cyan/5">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-logo-yellow/15 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-logo-cyan/15 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>
      
      <Navbar />
      <div className="flex-1 flex flex-col relative z-10 min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
  )
}



