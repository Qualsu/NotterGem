import { createProfileApi } from "../profile-api"
import { apiRoutes } from "@/config/routing/api.route"
import type {
  Org,
  ProfileGetByIdFunction,
  ProfileGetByUsernameFunction,
} from "@/config/types/api.types"

const orgsApi = createProfileApi<Org>(apiRoutes.ORGS)

export const getByUsername: ProfileGetByUsernameFunction<Org> = orgsApi.getByUsername
export const getById: ProfileGetByIdFunction<Org> = orgsApi.getById
