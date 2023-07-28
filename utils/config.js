// Load dotenv over Deno.env
import { load } from "$std/dotenv/mod.ts"
import { cleanEnv, port, str, url } from "envalid"

const ENV = cleanEnv(await load(), {
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
