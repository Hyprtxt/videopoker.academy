import { DENO_ENV } from "@/utils/config.js";

export const puppet_config = DENO_ENV === "development"
  ? { headless: false, defaultViewport: null }
  : { headless: true };
