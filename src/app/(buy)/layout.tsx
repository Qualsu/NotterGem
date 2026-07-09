import { BuyLayoutClient } from "@/components/layouts/buy-layout-client"

export default function BuyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BuyLayoutClient>{children}</BuyLayoutClient>
}
