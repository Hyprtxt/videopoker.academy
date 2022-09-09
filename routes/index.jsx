import { apply } from "twind";
import Card from "@/islands/Card.jsx";
// import PokerGame from "../islands/PokerGame.jsx";

export const handler = {
  GET: (req, ctx) => {
    return ctx.render({ ...ctx.state });
  },
};

export default function Home({ data }) {
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

      <PokerGame />

      {/* <PokerGame /> */}
      {/* <pre>{JSON.stringify( data, null, 2 )}</pre> */}
    </div>
  );
}

export const PokerGame = ({ cards, result, deck_id }) => {
  if (!cards) {
    return (
      <form action="/deal">
        <div class="flex gap-2 w-full grid grid-cols-5">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <input
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
          type="submit"
          value="Deal a Hand (5 Credits)"
        />
      </form>
    );
  }
  if (!result) {
    return (
      <form action="/draw" method="POST">
        {/* <input type="hidden" name="next" value={JSON.stringify(cards)} /> */}
        <input type="hidden" name="deck_id" value={deck_id} />
        <div class="flex gap-2 w-full grid grid-cols-5">
          {cards.map((card, idx) => (
            <Card card={card} idx={idx} active={true} />
          ))}
        </div>
        <input
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
          type="submit"
          value="Draw new Cards"
        />
      </form>
    );
  }
  return (
    <form action="/deal" method="POST">
      <div class="flex gap-2 w-full grid grid-cols-5">
        {cards.map((card, idx) => <Card card={card} idx={idx} />)}
      </div>
    </form>
  );
};
