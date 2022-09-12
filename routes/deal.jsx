import { Layout, PokerGame } from "@/routes/index.jsx";
import { getNewCards } from "@/utils/deck.js";

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
  const { cards, deck_id, streak } = data;
  return (
    <Layout data={data}>
      <div class="p-4 mx-auto max-w-screen-md">
        {streak === 0
          ? (
            <p class="my-6">
              Welcome! Now use the hold buttons to keep the correct cards.
            </p>
          )
          : (
            <p class="my-6">
              Now how many in a row can you do before you make a mistake?
            </p>
          )}
        <PokerGame cards={cards} deck_id={deck_id} />
        {/* <pre>{JSON.stringify( props, null, 2 )}</pre> */}
      </div>
    </Layout>
  );
}
