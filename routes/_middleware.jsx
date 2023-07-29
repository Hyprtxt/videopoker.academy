// routes/_middleware.js
import { blue, cyan, green, magenta, red, yellow } from "$std/fmt/colors.ts"
import { kvSession } from "fresh-session/mod.ts"

import { BASE_URL, CURRENT_ENV } from "@/utils/config.js"

export async function handler(req, ctx) {
  const session = kvSession(null, {
    maxAge: 10,
    httpOnly: true,
  })
  // For Logging
  const start = Date.now()
  const { pathname } = new URL(req.url)
  const withSession = [
    "/",
    "/deal",
    "/draw",
    "/play",
    "/signout",
  ]
  let resp
  if (
    withSession.includes(pathname)
  ) {
    ctx.BASE_URL = BASE_URL
    ctx.CURRENT_ENV = CURRENT_ENV
    resp = await session(req, ctx)
  } else {
    resp = await ctx.next()
  }
  const now = Date.now()
  const ms = now - start
  const status = () => {
    if (resp.status === undefined) {
      return yellow("?")
    }
    const str = resp.status.toString()
    if (str[0] === "2") {
      return green(str)
    }
    if (str[0] === "3") {
      return yellow(str)
    } else {
      return red(str)
    }
  }
  // resp.headers.set("X-Response-Time", `${ms}ms`)
  console.log(
    `[${magenta(new Date(now).toISOString())}] ${blue(req.method)} ${
      cyan(pathname)
    } - ${blue(String(ms) + "ms")} - ${status()}`,
  )
  return resp
}
