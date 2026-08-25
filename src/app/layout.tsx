import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"

import "./globals.css"
import ClerkClientProvider from "@/components/providers/clerk-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ThemeIcons } from "@/components/theme-icons"
import { RequestProvider } from "@/components/providers/request-provider"
import { images } from "@/config/routing/image.route"

const font = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Notter Gem",
    template: "%s | Notter Gem",
  },
  description: "Покупка подписки Notter Gem",
  icons: {
    icon: [
      {
        url: images.IMAGE.DARK_ICON,
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: images.IMAGE.DARK_ICON,
      },
    ],
    apple: [images.IMAGE.DARK_ICON],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkClientProvider>
            <RequestProvider>
              <Toaster
                position="bottom-center"
                containerStyle={{
                  zIndex: 100000,
                }}
                toastOptions={{
                  style: {
                    color: "black",
                    background: "white",
                    fontSize: "13px",
                    borderRadius: "5px",
                  },
                  iconTheme: {
                    primary: "black",
                    secondary: "white",
                  },
                }}
              />
              <ThemeIcons />
              {children}
            </RequestProvider>
          </ClerkClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
