"use client"

import Image from "next/image"
import Link from "next/link"
import { images } from "@/config/routing/image.route"
import { pages } from "@/config/routing/pages.route"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 w-full border-t border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 pt-6 pb-3 md:pt-7 md:pb-3">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl">
                <span className="bg-gradient-to-r from-logo-yellow to-logo-light-yellow bg-clip-text text-transparent">
                  Notter
                </span>{" "}
                <span className="text-logo-cyan">Gem</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
            <Link
              href={pages.NOTTER}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Image
                src={images.IMAGE.DARK_ICON}
                alt="Notter"
                width={16}
                height={16}
              />
              <span>Notter</span>
            </Link>

            <Link
              href={pages.NOTTER_TODO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Image
                src={images.IMAGE.TODO_ICON}
                alt="Notter ToDo"
                width={16}
                height={16}
                className="rounded-sm"
              />
              <span>Notter ToDo</span>
            </Link>

            <Link
              href="https://t.me/Qualsu"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Telegram
            </Link>

            <Link
              href="https://id.qual.su"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Qual ID
            </Link>
          </div>
        </div>

        <div className="border-t border-border/40 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
          <span>© 2024–{currentYear} Qualsu</span>
        </div>
      </div>
    </footer>
  )
}
