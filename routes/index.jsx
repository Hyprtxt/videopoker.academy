import { apply } from "twind";
import { asset } from "$fresh/runtime.ts";
import Card from "@/islands/Card.jsx";
// import PokerGame from "../islands/PokerGame.jsx";
import { DENO_ENV } from "@/utils/config.js";

export const handler = {
  GET: (_req, ctx) => {
    return ctx.render({ ...ctx.state });
  },
};

const Nav = () => (
  <div class="bg-teal-500">
    <nav class="flex items-center justify-between flex-wrap max-w-screen-md mx-auto">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <a href="/">
          <img
            src={asset("/videopoker-academy-deno.svg")}
            width={100}
            alt="the video poker academy logo: deno the dino behind some cards"
          />
        </a>
        <a href="/">
          <span class="font-semibold text-xl tracking-tight">
            Video Poker Academy
          </span>
        </a>
      </div>
    </nav>
  </div>
);

export const Layout = ({ children, data }) => {
  return (
    <>
      <Nav />
      {children}
      {
        /* {DENO_ENV === "development"
        ? <pre>{JSON.stringify(data, null, 2)}</pre>
        : ""} */
      }
    </>
  );
};

export default function Home({ data }) {
  return (
    <Layout data={data}>
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="my-5">
          Welcome! This site aims to help beginners become better video poker
          players. It's a video poker machine with special rules. It evaluates
          your ability to follow the strategy outlined below.
        </p>
        <p class="my-5">
          Sounds great, lets play:
        </p>
        <a
          class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          href="/deal"
        >
          Video Poker Academy
        </a>

        {
          /* <div class="grid sm:grid-cols-2">
          <div class="my-5">
            <p class="mb-3">
              Sounds great, lets play:
            </p>
            <a
              class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
              href="/deal"
            >
              VideoPoker Academy
            </a>
          </div>
          <div class="my-5">
            <p class="mb-3">
              No thanks,
            </p>
            <a
              class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded "
              href="/deal"
              disabled
            >
              Plain Old Video Poker
            </a>
          </div>
        </div> */
        }

        <h1 class="text-3xl mt-8 mb-5">Simple Strategy</h1>
        <p class="my-5">
          Here are the rules of the Simple Strategy, you should{" "}
          <strong>hold</strong>:
        </p>
        <ol class="list-decimal my-5">
          <li class="ml-7">Four of a kind, straight flush, royal flush</li>
          <li class="ml-7">4 to a royal flush</li>
          <li class="ml-7">Three of a kind, straight, flush, full house</li>
          <li class="ml-7">4 to a straight flush</li>
          <li class="ml-7">Two pair</li>
          <li class="ml-7">High pair</li>
          <li class="ml-7">3 to a royal flush</li>
          <li class="ml-7">4 to a flush</li>
          <li class="ml-7">Low pair</li>
          <li class="ml-7">4 to an outside straight</li>
          <li class="ml-7">2 suited high cards</li>
          <li class="ml-7">3 to a straight flush</li>
          <li class="ml-7">
            2 unsuited high cards (if more than 2 then pick the lowest 2)
          </li>
          <li class="ml-7">Suited 10/J, 10/Q, or 10/K</li>
          <li class="ml-7">One high card</li>
          <li class="ml-7">Discard everything</li>
        </ol>
        <h2 class="text-2xl my-5">Terms:</h2>
        <p class="my-5">
          <strong>High card:</strong>{" "}
          A jack, queen, king, or ace. These cards are retained more often
          because if paired up they return the original bet.
        </p>
        <p class="my-5">
          <strong>Outside straight:</strong>{" "}
          An open ended straight that can be completed at either end, such as
          the cards 7,8,9,10.
        </p>
        <p class="my-5">
          <strong>Inside straight:</strong>{" "}
          A straight with a missing inside card, such as the cards 6,7,9,10. In
          addition A,2,3,4 andJ,Q,K,A also count as inside straights because
          they are at an extreme end.
        </p>
        <h2 class="text-2xl my-5">Pay Table:</h2>
        <p class="my-5">
          The pay table is called <strong>9-6 Jacks or Better</strong>. The{" "}
          <strong>Simple Strategy</strong>{" "}
          has a calculated payout of 99.46%. You should be aware that this
          strategy does not apply to other pay tables.
        </p>
        <PayTable />
        <p class="my-5">
          <a
            class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded float-right"
            href="/deal"
          >
            Play Video Poker Academy
          </a>
        </p>
        {/* <PokerGame /> */}
      </div>
      <div class="p-4 mx-auto max-w-screen-md">
        {/* <PokerGame /> */}
        {/* <pre>{JSON.stringify( data, null, 2 )}</pre> */}
      </div>
    </Layout>
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
          class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded float-right"
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
          class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded float-right"
          type="submit"
          value="Draw new Cards"
        />
      </form>
    );
  }
  // console.log(result);
  return (
    <>
      {result.winner
        ? (
          <>
            <form action="/deal" method="GET">
              <div class="flex gap-2 w-full grid grid-cols-5">
                {cards.map((card, idx) => (
                  <Card
                    card={card}
                    idx={idx}
                    hold={result.user_strategy.indexOf(`HOLD_${idx + 1}`) > -1
                      ? true
                      : false}
                  />
                ))}
              </div>
              <input
                class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded float-right"
                type="submit"
                value="Play Another Hand"
              />
            </form>
          </>
        )
        : (
          <>
            <p class="my-6">Your Strategy</p>
            <div class="flex gap-2 w-full grid grid-cols-5">
              {result.hand.map((card, idx) => (
                <Card
                  card={card}
                  idx={idx}
                  hold={result.user_strategy.indexOf(`HOLD_${idx + 1}`) > -1
                    ? true
                    : false}
                />
              ))}
            </div>
            <p class="my-6">
              {`Simple Strategy: Rule #${result.strategy.rule_number}: ${result.strategy.rule}`}
            </p>
            <div class="flex gap-2 w-full grid grid-cols-5">
              {result.hand.map((card, idx) => (
                <Card
                  card={card}
                  idx={idx}
                  hold={result.strategy.strategy.indexOf(`HOLD_${idx + 1}`) > -1
                    ? true
                    : false}
                />
              ))}
            </div>
          </>
        )}
      {result.winner
        ? (
          <p class="my-6">
            {`Good work, that was: Rule #${result.strategy.rule_number}: ${result.strategy.rule}`}
          </p>
        )
        : <></>}
    </>
  );
};

const PayTable = () => {
  const CELL_STYLE = "border border-yellow-300 p-1";
  return (
    <div class="overflow-x-auto relative bg-sky-800 text-yellow-300 p-1 w-full my-5">
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
