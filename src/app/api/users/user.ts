import { createProfileApi } from "../profile-api"
import { apiRoutes } from "@/config/routing/api.route"
import type {
  ProfileGetByIdFunction,
  ProfileGetByUsernameFunction,
  User,
} from "@/config/types/api.types"

const usersApi = createProfileApi<User>(apiRoutes.USERS)

export const getByUsername: ProfileGetByUsernameFunction<User> = usersApi.getByUsername
export const getById: ProfileGetByIdFunction<User> = usersApi.getById
