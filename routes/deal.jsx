import { PokerGame } from "@/routes/index.jsx";
import { getNewCards } from "@/static/deck.js";

export const handler = {
  GET: (req, ctx) => {
    const deck = getNewCards();
    const id = crypto.randomUUID();
    ctx.state.decks[id] = deck;
    ctx.store.set(ctx.REDIS_KEY, { ...ctx.state });
    // localStorage.setItem("next");
    return ctx.render({ ...ctx.state, cards });
  },
  POST: async (req, ctx) => {
    console.log(await req.formData());
    return new Response(null, {
      status: 302,
      headers: new Headers({
        location: "/draw",
      }),
    });
    // ctx.render({ ...ctx.state });
  },
};

export default function Home(props) {
  const { data } = props;
  const { cards } = data;
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
      <PokerGame cards={cards} />
      <pre>{JSON.stringify( props, null, 2 )}</pre>
    </div>
  );
}
