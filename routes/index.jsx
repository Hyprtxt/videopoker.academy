import { apply } from "twind";
import Card from "@/islands/Card.jsx";
// import PokerGame from "../islands/PokerGame.jsx";

export const handler = {
  GET: (_req, ctx) => {
    return ctx.render({ ...ctx.state });
  },
};

export default function Home({ data }) {
  return (
    <>
      <div class="p-4 mx-auto max-w-screen-md">
        <a href="/">
          <img
            src="/logo.svg"
            height="100px"
            alt="the fresh logo: a sliced lemon dripping with juice"
          />
        </a>
        <p class="my-6">
          Welcome! Push the button below to play some video poker.
        </p>
        <PokerGame />
      </div>
      <div class="p-4 mx-auto max-w-screen-md">
        {/* <PokerGame /> */}
        {/* <pre>{JSON.stringify( data, null, 2 )}</pre> */}
        <PayTable />
      </div>
    </>
  );
}

export const PokerGame = ({ cards, result, deck_id, winner }) => {
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
    <form action="/deal" method="GET">
      <div class="flex gap-2 w-full grid grid-cols-5">
        {cards.map((card, idx) => <Card card={card} idx={idx} />)}
      </div>
      {winner
        ? (
          <input
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
            type="submit"
            value="Play Another Hand"
          />
        )
        : <></>}
    </form>
  );
};

const PayTable = () => {
  const CELL_STYLE = "border border-yellow-500 p-1";
  return (
    <div class="overflow-x-auto relative bg-blue-700 text-yellow-500 p-1 w-full my-5">
      <table class="w-full text-sm text-right">
        <thead>
          <tr class="text-white">
            <th class={`${CELL_STYLE} text-left`}>Credits</th>
            <th class={`${CELL_STYLE}`}>1</th>
            <th class={`${CELL_STYLE}`}>2</th>
            <th class={`${CELL_STYLE}`}>3</th>
            <th class={`${CELL_STYLE}`}>4</th>
            <th class={`${CELL_STYLE}`}>5</th>
          </tr>
        </thead>
        <tbody>
          {PAY_TABLE.map((row, _i) => (
            <tr>
              <td class={`${CELL_STYLE} text-left`}>{row.title}</td>
              <td class={CELL_STYLE}>{row.win(1)}</td>
              <td class={CELL_STYLE}>{row.win(2)}</td>
              <td class={CELL_STYLE}>{row.win(3)}</td>
              <td class={CELL_STYLE}>{row.win(4)}</td>
              <td class={CELL_STYLE}>{row.win(5)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PAY_TABLE = [
  {
    title: "Royal flush",
    status: "royalflush",
    win: (bet) => {
      if (bet === 5) {
        return bet * 800;
      }
      return bet * 250;
    },
  },
  {
    title: "Straight flush",
    status: "straightflush",
    win: (bet) => bet * 50,
  },
  {
    title: "4 of a kind",
    status: "4kind",
    win: (bet) => bet * 25,
  },
  {
    title: "Full house",
    status: "fullhouse",
    win: (bet) => bet * 9,
  },
  {
    title: "Flush",
    status: "flush",
    win: (bet) => bet * 6,
  },
  {
    title: "Straight",
    status: "straight",
    win: (bet) => bet * 4,
  },
  {
    title: "3 of a kind",
    status: "3kind",
    win: (bet) => bet * 3,
  },
  {
    title: "2 pair",
    status: "2pair",
    win: (bet) => bet * 2,
  },
  {
    title: "Jacks or Better",
    status: "jacksbetter",
    win: (bet) => bet * 1,
  },
  //   {
  //       status: "lowpair",
  //       win: (bet) =>  0,
  //     };
  // {
  //   status: "ulose",
  //   win: (bet) => 0,
  // },
];
