"use client"

import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { useAuth } from "@clerk/nextjs"

import { ModeToggle } from "@/components/mode-toggle"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { pages } from "@/config/routing/pages.route"
import type { NavbarProps } from "@/config/types/landing.types"
import { cn } from "@/lib/utils"

import { useScrollTop } from "../../hooks/use-scroll-top"

export function Navbar({ logo = true }: NavbarProps) {
  const scrolled = useScrollTop()
  const { isLoaded } = useAuth()
  const authLoading = !isLoaded

  return (
    <header
      className={cn(
        "fixed top-0 z-50 flex h-14 w-full bg-background/80 px-4 sm:px-6 backdrop-blur-md transition-all",
        scrolled && "border-b border-border/40 shadow-sm"
      )}
    >
      <div className="mx-auto flex w-full items-center justify-between gap-4">
        {/* Brand */}
        <Link href={pages.ROOT} className={`${!logo ? "hidden" : ""} flex items-center transition-opacity hover:opacity-90`}>
          <span className="text-xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-logo-yellow to-logo-light-yellow bg-clip-text text-transparent">
              Notter
            </span>{" "}
            <span className="text-logo-cyan">Gem</span>
          </span>
        </Link>

        {/* Auth & Theme */}
        <div className="flex items-center gap-2 sm:gap-3">
          {authLoading ? (
            <div className={`${!logo ? "hidden" : ""} flex items-center gap-2`}>
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          ) : (
            <>
              <SignedIn>
                <div className="flex items-center">
                  <UserButton />
                </div>
              </SignedIn>

              <SignedOut>
                <SignInButton>
                  <Link href={pages.AUTH} className={!logo ? "hidden" : undefined}>
                    <Button variant="ghost" size="sm">Войти</Button>
                  </Link>
                </SignInButton>
              </SignedOut>
            </>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}


