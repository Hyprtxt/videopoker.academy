import { assertEquals } from "$std/testing/asserts.ts";
import { freshPuppetTestWrapper } from "@/test/runner.js";
import { BASE_URL } from "@/utils/config.js";

Deno.test(
  "Public Pages Testing",
  freshPuppetTestWrapper(async (t, page) => {
    await t.step("The homepage should work", async () => {
      const response = await page.goto(`${BASE_URL}`, {
        waitUntil: "networkidle2",
      });
      assertEquals(response.status(), 200);
    });

    await t.step("The deal page should work", async () => {
      const response = await page.goto(`${BASE_URL}/deal`, {
        waitUntil: "networkidle2",
      });
      assertEquals(response.status(), 200);
    });

    await t.step("The draw page should 404 a GET", async () => {
      const response = await page.goto(`${BASE_URL}/draw`, {
        waitUntil: "networkidle2",
      });
      assertEquals(response.status(), 404);
    });

    await t.step("The player page should work", async () => {
      const response = await page.goto(`${BASE_URL}/player`, {
        waitUntil: "domcontentloaded",
      });
      assertEquals(response.status(), 200);
    });

    await t.step("The deal page should allow gameplay", async () => {
      const response = await page.goto(`${BASE_URL}/deal`, {
        waitUntil: "networkidle2",
      });
      assertEquals(response.status(), 200);
      await page.click('[type="submit"]');
      await page.waitForNetworkIdle();
      assertEquals(page.url(), `${BASE_URL}/draw`);
    });
  }),
);
