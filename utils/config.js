import { load } from "$std/dotenv/mod.ts"
import { cleanEnv, port, str, url } from "envalid"

const RAW_ENV = Object.assign(Deno.env.toObject(), await load())

const ENV = cleanEnv(RAW_ENV, {
  // API_URL: url(),
  BASE_URL: url(),
  CURRENT_ENV: str({ choices: ["development", "testing", "production"] }),
  GA_ID: str(),
  PORT: port(),
})

export const {
  // API_URL,
  BASE_URL,
  CURRENT_ENV,
  GA_ID,
  PORT,
} = ENV

export default ENV
