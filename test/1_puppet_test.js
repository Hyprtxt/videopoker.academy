import { assert, assertEquals } from "$std/assert/mod.ts"
import { freshPuppetTestWrapper } from "@/test/wrapper.js"
import { BASE_URL } from "@/utils/config.js"
import { puppet_config } from "@/test/config.js"
import { Status } from "$std/http/http_status.ts"

Deno.test(
  "Public Pages Testing",
  { sanitizeResources: false, sanitizeOps: false },
  freshPuppetTestWrapper(puppet_config, async (t, page) => {
    await t.step("The homepage should work", async () => {
      const response = await page.goto(`${BASE_URL}`, {
        waitUntil: "networkidle2",
      })
      assert(response.ok)
    })

    await t.step("The sitemap should work", async () => {
      const response = await page.goto(`${BASE_URL}/sitemap.xml`, {
        waitUntil: "networkidle2",
      })
      assert(response.ok)
    })

    await t.step("The deal page should work", async () => {
      const response = await page.goto(`${BASE_URL}/deal`, {
        waitUntil: "networkidle2",
      })
      assert(response.ok)
    })

    await t.step("The draw page should 404 a GET", async () => {
      const response = await page.goto(`${BASE_URL}/draw`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), Status.NotFound)
    })

    await t.step("The player page should work", async () => {
      const response = await page.goto(`${BASE_URL}/player`, {
        waitUntil: "domcontentloaded",
      })
      assert(response.ok)
    })

    await t.step("The deal page should allow gameplay", async () => {
      const response = await page.goto(`${BASE_URL}/deal`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), Status.OK)
      await page.click('[type="submit"]')
      await page.waitForNetworkIdle()
      assertEquals(page.url(), `${BASE_URL}/draw`)
    })
  }),
)
