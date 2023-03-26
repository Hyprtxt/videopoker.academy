import { assertEquals } from "$std/testing/asserts.ts"
import { freshPuppetTestWrapper } from "fresh_marionette"
import { BASE_URL } from "@/utils/config.js"
import { simpleStrategy } from "@/utils/simple-strategy/mod.js"
import { puppet_config } from "@/test/config.js"

const playGameOfPoker = async (page, done = false) => {
  const cards = await page.$$eval(".flex.justify-center", (elements) => {
    console.log(elements, elements.length)
    return elements.map((element) => element.textContent.replaceAll(" ", ""))
  })
  const strategy = simpleStrategy(cards)
  // console.log(cards);
  // console.log(strategy);
  const action = strategy.strategy.map((item) =>
    parseInt(item.replace("HOLD_", "") - 1)
  )
  await page.evaluate((action) => {
    action.map((idx) => {
      document.querySelector(`.hand div:nth-child(${idx + 1}) .card-value`)
        .click()
    })
  }, action)
  await page.click('[type="submit"]')
  await page.waitForNetworkIdle()
  if (!done) {
    await page.click('[type="submit"]')
    await page.waitForNetworkIdle()
  }
}

Deno.test(
  "Game Testing",
  freshPuppetTestWrapper(puppet_config, async (t, page) => {
    await t.step(
      "The deal page should play 10 perfect hands of poker",
      async () => {
        const response = await page.goto(`${BASE_URL}/deal`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 200)
        // await page.waitForTimeout(200);
        await playGameOfPoker(page)
        await playGameOfPoker(page)
        await playGameOfPoker(page)
        await playGameOfPoker(page)
        await playGameOfPoker(page)
        await playGameOfPoker(page)
        await playGameOfPoker(page)
        await playGameOfPoker(page)
        await playGameOfPoker(page)
        await playGameOfPoker(page, true)
        // Assert that they scored 10
        const score = await page.evaluate(() => {
          const el = document.getElementById("score")
          return parseInt(el.textContent)
        })
        // console.log(score);
        assertEquals(score, 10)
      },
    )
  }),
)
