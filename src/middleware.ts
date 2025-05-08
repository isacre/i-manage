import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  // Match all pathnames except for
  // - api routes
  // - static files (e.g. favicon.ico, robots.txt)
  // - public folder
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
