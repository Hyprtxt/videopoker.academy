import { CURRENT_ENV } from "@/utils/config.js"

export const puppet_config = CURRENT_ENV === "development"
  ? { headless: false, defaultViewport: null }
  : { headless: true }
