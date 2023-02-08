// Load dotenv over Deno.env
import { load } from "$std/dotenv/mod.ts";
import { cleanEnv, host, port, str, url } from "envalid";

const ENV = cleanEnv(await load(), {
  // API_URL: url(),
  BASE_URL: url(),
  DENO_ENV: str({ choices: ["development", "testing", "production"] }),
  GA_ID: str(),
  REDIS_PASS: str(),
  REDIS_HOST: host(),
  REDIS_PORT: port(),
  PORT: port(),
});

export const {
  // API_URL,
  BASE_URL,
  DENO_ENV,
  GA_ID,
  REDIS_HOST,
  REDIS_PASS,
  REDIS_PORT,
  PORT,
} = ENV;

export default ENV;
