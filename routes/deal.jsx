import { PokerGame } from "@/routes/index.jsx";
import { getNewCards } from "@/static/deck.js";

export const handler = {
  GET: (req, ctx) => {
    const deck = getNewCards();
    const deck_id = crypto.randomUUID();
    const cards = [...deck].splice(0, 5);
    ctx.store.set(`deck-${deck_id}`, JSON.stringify({ deck }));
    ctx.store.expire(`deck-${deck_id}`, 5 * 60);
    return ctx.render({ ...ctx.state, cards, deck_id });
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
  const { cards, deck_id } = data;
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
        Good, now use the hold buttons to keep the good cards.
      </p>
      <PokerGame cards={cards} deck_id={deck_id} />
      <pre>{JSON.stringify( props, null, 2 )}</pre>
    </div>
  );
}
