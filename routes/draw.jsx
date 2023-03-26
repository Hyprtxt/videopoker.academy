import { Layout, PokerGame } from "@/routes/index.jsx";
import Keyboard from "@/islands/Keyboard.jsx";
import { simpleStrategy } from "@/utils/simple-strategy/mod.js";
import { score } from "@/utils/poker.js";

export const handler = {
  GET: (_req, ctx) => {
    return ctx.renderNotFound();
  },
  POST: async (req, ctx) => {
    const data = await req.formData();
    console.log(data);
    // const deck = getNewCards();
    // const deck_id = crypto.randomUUID();
    // const cards = deck.splice(0, 5);
    const deck_id = data.get("deck_id");
    const redis_data = await ctx.store.get(`deck-${deck_id}`);
    if (redis_data) {
      const hold_1 = data.get("hold_1") ? true : false;
      const hold_2 = data.get("hold_2") ? true : false;
      const hold_3 = data.get("hold_3") ? true : false;
      const hold_4 = data.get("hold_4") ? true : false;
      const hold_5 = data.get("hold_5") ? true : false;
      const holds = [hold_1, hold_2, hold_3, hold_4, hold_5];
      const user_strategy = [...holds]
        .map((v, i) => v ? `HOLD_${i + 1}` : false)
        .filter((x) => x);
      const redis_data_parsed = JSON.parse(redis_data);
      const hand = [...redis_data_parsed.deck].splice(0, 5);
      const next = [...redis_data_parsed.deck].splice(5, 5);
      const cards = holds.map((v, i) => v ? hand[i] : next[i]);
      const strategy = simpleStrategy(hand);
      console.log(user_strategy, strategy.strategy);
      const winner =
        JSON.stringify(user_strategy) === JSON.stringify(strategy.strategy)
          ? true
          : false;
      const result = Object.assign(score(cards), {
        hand,
        strategy,
        user_strategy,
        winner,
      });
      // console.log(redis_data_parsed.deck.length, "deck length");
      if (winner) {
        if (ctx.state.streak) {
          ctx.state.streak = ctx.state.streak + 1;
        } else {
          ctx.state.streak = 1;
        }
      } else {
        ctx.state.final = parseInt(ctx.state.streak);
        ctx.state.streak = 0;
      }
      ctx.store.set(ctx.REDIS_KEY, JSON.stringify({ ...ctx.state }));
      ctx.store.expire(`deck-${deck_id}`, 0);
      return ctx.render({
        ...ctx.state,
        cards,
        deck_id,
        result,
      });
    }
    return ctx.renderNotFound();
  },
};

export default function Home({ data }) {
  const { cards, result, streak, final } = data;
  return (
    <Layout data={data}>
      <div class="p-4 mx-auto max-w-screen-md">
        {
          /* <p class="my-6">
        Good job. That's a hand of video poker.
      </p> */
        }
        {result.winner
          ? (
            <p class="my-6">
              Perfect Streak: <span id="score">{streak}</span>
            </p>
          )
          : <></>}
        <PokerGame cards={cards} result={result} />
        <Keyboard />
        {!result.winner
          ? (
            <>
              <p class="my-6">
                Oops! Final Score: {final} hands in a row.
              </p>
              <p class="my-5">
                <form action="/">
                  <input
                    class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded float-right cursor-pointer"
                    type="submit"
                    value="Go back to the rules"
                  />
                </form>
              </p>
            </>
          )
          : <></>}
        {/* {result.winner ? <a href="/deal">Play More</a> : <></>} */}
        {/* <pre>{JSON.stringify( data, null, 2 )}</pre> */}
      </div>
    </Layout>
  );
}
