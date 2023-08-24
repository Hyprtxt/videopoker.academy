import { defineConfig } from "$fresh/server.ts"
import twindPlugin from "$fresh/plugins/twind.ts"
import twindConfig from "@/twind.config.ts"
import { PORT } from "@/utils/config.js"

export default defineConfig({
  plugins: [twindPlugin(twindConfig)],
  port: PORT,
})
