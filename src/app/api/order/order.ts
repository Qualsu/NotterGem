import { apiGet, apiPost, removeNullish } from "../client"
import { apiRoutes } from "@/config/routing/api.route"
import type {
  ApiEntityResponse,
  CheckOrderFunction,
  CreateOrderResponse,
  CreateOrderFunction,
  Order,
  OrderCallbackFunction,
} from "@/config/types/api.types"

export const createOrder: CreateOrderFunction = (
  userid,
  premium = null,
  status = null,
  amount = null
) => {
  return apiPost<CreateOrderResponse>(
    apiRoutes.ORDER.CREATE,
    removeNullish({
      userid,
      premium,
      status,
      amount,
    })
  )
}

export const checkOrder: CheckOrderFunction = (_id) => {
  return apiGet<Order>(apiRoutes.ORDER.CHECK(_id))
}

export const orderCallback: OrderCallbackFunction = (payload) => {
  const searchParams = new URLSearchParams({
    MerchantOrderId: String(payload.MerchantOrderId),
    InvId: String(payload.InvId),
    Sum: String(payload.Sum),
    Currency: payload.Currency,
    SignatureValue: payload.SignatureValue,
  })

  return apiPost<ApiEntityResponse>(`${apiRoutes.ORDER.CALLBACK}?${searchParams.toString()}`)
}
