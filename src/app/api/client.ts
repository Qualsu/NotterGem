import { API } from "@/config/const/api.const"
import type {
  ApiDeleteFunction,
  ApiGetFunction,
  ApiPostFunction,
  ApiPutFunction,
  ApiRequestOptions,
  ApiRequestFunction,
  HttpMethod,
  RemoveNullishFunction,
} from "@/config/types/api.types"

let clerkTokenGetter: (() => Promise<string | null>) | null = null

export function setClerkTokenGetter(getter: () => Promise<string | null>) {
  clerkTokenGetter = getter
}

function attachClerkToken(instance: typeof API) {
  instance.interceptors.request.use(async (config) => {
    if (!clerkTokenGetter || config.headers.Authorization) {
      return config
    }

    try {
      const token = await clerkTokenGetter()

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch {
      // Leave request unauthenticated so the caller's error handling applies.
    }

    return config
  })
}

attachClerkToken(API)

export const removeNullish: RemoveNullishFunction = <T extends Record<string, unknown>>(payload: T) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== null && value !== undefined)
  ) as Partial<T>
}

export const apiRequest: ApiRequestFunction = async <T>(
  method: HttpMethod,
  url: string,
  options: ApiRequestOptions = {}
) => {
  try {
    const response = await API.request<T>({
      method,
      url,
      data: options.data,
      headers: options.headers,
    })

    return response.data
  } catch (error) {
    console.error(`[API] ${method} ${url} failed:`, error)
    return null
  }
}

export const apiGet: ApiGetFunction = <T>(url: string) => {
  return apiRequest<T>("GET", url)
}

export const apiPost: ApiPostFunction = <T>(url: string, data?: unknown, options?: ApiRequestOptions) => {
  return apiRequest<T>("POST", url, { ...options, data })
}

export const apiPut: ApiPutFunction = <T>(url: string, data?: unknown) => {
  return apiRequest<T>("PUT", url, { data })
}

export const apiDelete: ApiDeleteFunction = <T>(url: string, data?: unknown) => {
  return apiRequest<T>("DELETE", url, { data })
}
