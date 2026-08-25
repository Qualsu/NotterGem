const NOTTER_URL = process.env.NEXT_PUBLIC_NOTTER_URL || "https://notter.su"
const NOTTER_TODO_URL = process.env.NEXT_PUBLIC_NOTTER_TODO_URL || "https://todo.notter.su"

export const pages = {
  ROOT: "/",
  AUTH: "/auth/sign-in",
  BUY: "/",
  BUY_CHECK: "/check",
  NOTTER: NOTTER_URL,
  NOTTER_TODO: NOTTER_TODO_URL,
}

