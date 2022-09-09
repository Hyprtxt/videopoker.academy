import { PokerGame } from "@/routes/index.jsx";
import { simpleStrategy } from "@/static/simple-strategy/index.js";
import { score } from "@/static/poker.js";

export const handler = {
  // GET: (_req, ctx) => {
  //   // return ctx.renderNotFound();
  //   return ctx.render({ ...ctx.state });
  // },
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
      const result = score(cards);
      const strategy = simpleStrategy(hand);
      const winner =
        JSON.stringify(user_strategy) === JSON.stringify(strategy.strategy)
          ? true
          : false;
      // console.log(redis_data_parsed.deck.length, "deck length");
      if (winner) {
        if (ctx.state.streak) {
          ctx.state.streak = ctx.state.streak + 1;
        } else {
          ctx.state.streak = 1;
        }
      } else {
        ctx.state.streak = 0;
      }
      ctx.store.set(ctx.REDIS_KEY, JSON.stringify({ ...ctx.state }));
      ctx.store.expire(`deck-${deck_id}`, 0);
      return ctx.render({
        ...ctx.state,
        cards,
        deck_id,
        result,
        strategy,
        user_strategy,
        winner,
      });
    }
    return ctx.renderNotFound();
  },
};

export default function Home({ data }) {
  const { cards, winner } = data;
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <a href="/">
        <img
          src="/logo.svg"
          height="100px"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
      </a>
      <p class="my-6">
        Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <PokerGame cards={cards} result={[]} winner={winner} />
      {winner ? <a href="/deal">Play More</a> : <></>}
      <pre>{JSON.stringify( data, null, 2 )}</pre>
    </div>
  );
}
