"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useOrganization, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"
import { pages } from "@/config/routing/pages.route"
import { images } from "@/config/routing/image.route"
import { checkOrder } from "@/app/api/order/order"
import { CheckStatus, statusClassName, statusLabel, statusMessage, toastMessage } from "@/config/const/buy.const"

const getOrderStatus = (status: string): CheckStatus => {
  if (status === "success") return "success"
  if (status === "pending") return "pending"
  if (status === "cancel") return "cancel"
  return "failed"
}

export function CheckClient() {
  const searchParams = useSearchParams()
  const merchantOrderId =
    searchParams.get("MERCHANT_ORDER_ID") ?? searchParams.get("MerchantOrderId")
  const [status, setStatus] = useState<CheckStatus>("loading")
  const { user, isLoaded: isUserLoaded } = useUser()
  const { organization, isLoaded: isOrganizationLoaded } = useOrganization()
  const shownToastRef = useRef<CheckStatus | null>(null)

  const isLoading = status === "loading"
  const canRetry = !isLoading && status !== "success" && status !== "cancel" && status !== "foreign"

  const ownerIds = useMemo(() => {
    return [user?.id, organization?.id].filter(Boolean)
  }, [organization?.id, user?.id])

  const showToast = useCallback((nextStatus: CheckStatus) => {
    const message = toastMessage[nextStatus]
    if (!message || shownToastRef.current === nextStatus) return

    shownToastRef.current = nextStatus
    if (nextStatus === "success") {
      toast.success(message)
    } else if (nextStatus === "pending") {
      toast.loading(message)
    } else {
      toast.error(message)
    }
  }, [])

  const updateStatus = useCallback(
    (nextStatus: CheckStatus) => {
      setStatus(nextStatus)
      showToast(nextStatus)
    },
    [showToast]
  )

  const handleCheck = useCallback(async () => {
    if (!isUserLoaded || !isOrganizationLoaded) return

    shownToastRef.current = null
    setStatus("loading")

    if (!merchantOrderId) {
      updateStatus("missing")
      return
    }

    if (!user?.id) {
      updateStatus("auth")
      return
    }

    try {
      const order = await checkOrder(merchantOrderId)

      if (!order) {
        updateStatus("not-found")
        return
      }

      const isOwnOrder = ownerIds.includes(order.userid)
      if (!isOwnOrder) {
        updateStatus("foreign")
        return
      }

      updateStatus(getOrderStatus(order.status))
    } catch {
      updateStatus("error")
    }
  }, [
    isOrganizationLoaded,
    isUserLoaded,
    merchantOrderId,
    ownerIds,
    updateStatus,
    user?.id,
  ])

  useEffect(() => {
    handleCheck()
  }, [handleCheck])

  return (
    <main className="relative z-10 flex-1 flex items-center justify-center p-6 pt-20 pb-8">
      <div className="w-full max-w-2xl rounded-3xl border border-white/40 bg-white/70 dark:border-white/10 dark:bg-zinc-950/70 p-8 backdrop-blur-xl">

        <div className="flex items-center gap-3 mb-6">
          <Image
            src={images.BADGE.DIAMOND}
            alt="Notter Gem"
            width={36}
            height={36}
          />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-logo-yellow to-logo-light-yellow bg-clip-text text-transparent">
                Notter
              </span>
              <span className="text-logo-cyan"> Gem</span>
            </h1>
            <p className="text-xs text-muted-foreground">Статус заказа и активация подписки</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-border/40 bg-card/40">
            <div>
              <div className="text-xs text-muted-foreground">Номер заказа</div>
              <div className="font-mono text-sm font-semibold">#{merchantOrderId ?? "-"}</div>
            </div>
            <div className={`px-3 py-1 text-xs font-medium rounded-full ${statusClassName[status]}`}>
              {statusLabel[status]}
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">{statusMessage[status]}</p>

          {status === "success" && (
            <div className="rounded-2xl border border-logo-cyan/30 bg-logo-cyan/5 p-4 space-y-3">
              <div className="text-sm font-semibold text-foreground">Подписка активирована для всех сервисов:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={pages.NOTTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-background/60 hover:bg-background transition"
                >
                  <div className="relative h-6 w-6 shrink-0">
                    <Image src={images.IMAGE.DARK_ICON} alt="Notter" fill className="object-contain" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Notter</div>
                    <div className="text-xs text-muted-foreground">Открыть приложение</div>
                  </div>
                </a>

                <a
                  href={pages.NOTTER_TODO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-background/60 hover:bg-background transition"
                >
                  <div className="relative h-6 w-6 shrink-0">
                    <Image src={images.IMAGE.TODO_ICON} alt="Notter ToDo" fill className="rounded-sm object-contain" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Notter ToDo</div>
                    <div className="text-xs text-muted-foreground">Открыть приложение</div>
                  </div>
                </a>
              </div>
            </div>
          )}


          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={pages.ROOT}>
              <Button variant="outline" size="sm">На главную Gem</Button>
            </Link>
            <a href={pages.NOTTER} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="sm" className="gap-2">
                <Image src={images.IMAGE.DARK_ICON} alt="Notter" width={14} height={14} />
                <span>В Notter</span>
              </Button>
            </a>
            <a href={pages.NOTTER_TODO} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="sm" className="gap-2">
                <Image src={images.IMAGE.TODO_ICON} alt="Notter ToDo" width={14} height={14} className="rounded-sm" />
                <span>В Notter ToDo</span>
              </Button>
            </a>
            {(status === "cancel" || status === "failed") && (
              <Link href={pages.BUY}>
                <Button variant="outline" size="sm">Выбрать тариф</Button>
              </Link>
            )}
            {canRetry && <Button size="sm" onClick={handleCheck}>Повторить проверку</Button>}
          </div>
        </div>
      </div>
    </main>
  )
}

