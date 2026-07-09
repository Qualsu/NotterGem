export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

export type ApiRequestOptions = {
  data?: unknown
  headers?: Record<string, string>
}

export type ApiEntityResponse = Record<string, unknown>

export type ApiRequestFunction = <T>(
  method: HttpMethod,
  url: string,
  options?: ApiRequestOptions
) => Promise<T | null>

export type ApiGetFunction = <T>(url: string) => Promise<T | null>

export type ApiPostFunction = <T>(
  url: string,
  data?: unknown,
  options?: ApiRequestOptions
) => Promise<T | null>

export type ApiPutFunction = <T>(url: string, data?: unknown) => Promise<T | null>

export type ApiDeleteFunction = <T>(url: string, data?: unknown) => Promise<T | null>

export type RemoveNullishFunction = <T extends Record<string, unknown>>(payload: T) => Partial<T>

export type ProfileRoutes = {
  ADD: (_id: string) => string
  BY_USERNAME: (username: string) => string
  BY_ID: (_id: string) => string
  UPDATE: (_id: string) => string
}

export type ProfileApi<TProfile> = {
  create: (_id: string, payload: Record<string, unknown>) => Promise<TProfile | null>
  getByUsername: (username: string) => Promise<TProfile | null>
  getById: (_id: string) => Promise<TProfile | null>
  update: (_id: string, payload: Record<string, unknown>) => Promise<TProfile | null>
}

export type ProfileGetByUsernameFunction<TProfile> = ProfileApi<TProfile>["getByUsername"]

export type ProfileGetByIdFunction<TProfile> = ProfileApi<TProfile>["getById"]

export interface Order {
  _id: string
  userid: string
  premium: number
  status: string
  amount: number
  payment_id: string
  payment_url: string
}

export type CreateOrderResponse = string | (ApiEntityResponse & Partial<Order>)

export type CreateOrderFunction = (
  userid: string,
  premium?: number | null,
  status?: string | null,
  amount?: number | null
) => Promise<CreateOrderResponse | null>

export type CheckOrderFunction = (_id: string) => Promise<Order | null>

export type OrderCallbackPayload = {
  MerchantOrderId: number
  InvId: number
  Sum: number
  Currency: string
  SignatureValue: string
}

export type OrderCallbackFunction = (payload: OrderCallbackPayload) => Promise<ApiEntityResponse | null>

export type UserBadge = {
  verified: boolean;
  notes_verifed: boolean;
  contributor: boolean;
  notter: boolean;
  org_verifed: boolean;
}

export type User = {
  _id: string;
  username: string;
  name: string;
  firstname: string;
  lastname: string | null;
  avatar: string | null;
  badges: UserBadge;
  privated: boolean;
  pined: string | null;
  created: Date | null;
  premium: number;
  moderator: boolean;
  documents: number;
  publicDocuments: number;
  verifiedDocuments: number;
  verifiedOrgs: number;
  watermark: boolean | null;
  owner: string;
  members: Array<string>;
  mail: string | null;
}

export type OrgBadge = {
  verified: boolean;
  notes_verifed: boolean;
  contributor: boolean;
  notter: boolean;
  org_verifed: boolean;
}

export type Org = {
  _id: string;
  username: string;
  owner: string;
  name: string | null;
  firstname: string;
  lastname: string | null;
  members: Array<string>;
  avatar: string | null;
  badges: OrgBadge;
  privated: boolean;
  pined: string | null;
  created: Date | null;
  premium: number;
  documents: number;
  publicDocuments: number;
  verifiedDocuments: number;
  verifiedOrgs: number;
  moderator: boolean;
  watermark: boolean;
  mail: string | null;
}
