import { Suspense } from "react"
import { CheckClient } from "./check-client"

export default function CheckBuy() {
  return (
    <Suspense fallback={null}>
      <CheckClient />
    </Suspense>
  )
}
