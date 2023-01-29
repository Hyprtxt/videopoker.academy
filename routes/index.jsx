import { apply } from "twind";
import { asset, Head } from "$fresh/runtime.ts";
import Card from "@/islands/Card.jsx";
import Debug from "@/islands/Debug.jsx";
import Keyboard from "@/islands/Keyboard.jsx";
// import PokerGame from "../islands/PokerGame.jsx";
import { DENO_ENV, GA_ID } from "@/utils/config.js";

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
      <Head>
        <title>Video Poker Academy</title>
        <meta
          name="description"
          content="Video Poker Academy is a fun way to improve your Video Poker skills."
        >
        </meta>
        {DENO_ENV === "production"
          ? (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              >
              </script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');`,
                }}
              >
              </script>
            </>
          )
          : <></>}
      </Head>
      <Nav />
      {children}
      <Footer />
      {DENO_ENV === "development" ? <Debug data={data} /> : <></>}
    </>
  );
};

const Footer = () => (
  <div class="p-4 mx-auto max-w-screen-md">
    <p class="mt-20 mb-6 sm:flex sm:justify-between">
      <a
        href="https://github.com/Hyprtxt/videopoker.academy"
        class="text-blue-500 hover:underline flex gap-2 items-center"
      >
        <svg
          class="h-5 w-5 text-gray-500"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1989_191)">
            <path
              d="M7.00001 0C3.13391 0 0 3.21295 0 7.17755C0 10.3482 2.0055 13.0388 4.7873 13.9875C5.1373 14.0534 5.26471 13.832 5.26471 13.6414C5.26471 13.4716 5.25912 13.0195 5.25561 12.4212C3.3082 12.8547 2.8973 11.4589 2.8973 11.4589C2.5795 10.6291 2.1203 10.4084 2.1203 10.4084C1.48471 9.96418 2.16861 9.97279 2.16861 9.97279C2.87071 10.0229 3.24032 10.7122 3.24032 10.7122C3.86472 11.8085 4.87903 11.4918 5.27732 11.3084C5.34171 10.8448 5.52232 10.5288 5.72251 10.3497C4.16851 10.1684 2.534 9.55218 2.534 6.80211C2.534 6.01893 2.807 5.37764 3.2543 4.87605C3.1822 4.69476 2.94211 3.96463 3.32289 2.97722C3.32289 2.97722 3.91089 2.78376 5.24789 3.71238C5.77305 3.55992 6.37629 3.47184 6.99948 3.4709C7.59448 3.47377 8.19351 3.5533 8.7528 3.71238C10.0891 2.78376 10.6757 2.97649 10.6757 2.97649C11.0579 3.9646 10.8171 4.69475 10.7457 4.87603C11.1937 5.3776 11.4653 6.0189 11.4653 6.80208C11.4653 9.55931 9.82799 10.1662 8.26908 10.3439C8.52037 10.5653 8.74368 11.0031 8.74368 11.6731C8.74368 12.6318 8.73529 13.4064 8.73529 13.6414C8.73529 13.8335 8.86129 14.057 9.21689 13.9868C12.0205 13.0032 14 10.3285 14 7.18046C14 7.17943 14 7.17841 14 7.17738C14 3.21278 10.8654 0 7.00001 0Z"
              fill="currentColor"
            >
            </path>
          </g>
          <defs>
            <clipPath id="clip0_1989_191">
              <rect width="14" height="14" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
        Source code
      </a>
      <a
        href="https://fresh.deno.dev"
        class="text-blue-500 hover:underline"
      >
        <img
          width="197"
          height="37"
          src="https://fresh.deno.dev/fresh-badge.svg"
        />
      </a>
      <a
        href="https://hyprtxt.dev"
        class="text-blue-500 hover:underline flex gap-2 items-center"
      >
        <svg
          class="h-5 w-5 text-gray-500"
          width="240"
          height="240"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="main_group"></g>
          <circle
            stroke="#000000"
            id="circle1"
            stroke-width="0px"
            cy="120px"
            fill="#271f3f"
            r="120px"
            cx="120px"
            transform=""
            visibility="visible"
          >
          </circle>
          <polygon
            points="38.225418,113.270493 74.350418,94.895477 74.600418,78.395493 20.850418,106.020477 20.225418,119.770493 73.850418,147.270477 74.225418,130.895493 "
            stroke="none"
            id="polygon1"
            stroke-width="3px"
            fill="#59a188"
            transform=""
          >
          </polygon>
          <polygon
            points="144,62.5 158.5,65 93,179.5 78.5,178 "
            stroke="none"
            id="polygon2"
            stroke-width="3px"
            fill="#59a188"
            transform=""
          >
          </polygon>
          <polygon
            points="182.725418,108.770493 218.850418,90.395477 219.100418,73.895493 165.350418,101.520477 164.725418,115.270493 218.350418,142.770477 218.725418,126.395493 "
            stroke="none"
            stroke-width="3px"
            id="polygon3"
            fill="#3ba388"
            transform="rotate(180 192.912918 110.832985)"
          >
          </polygon>
        </svg>
        Built by @Hyprtxt
      </a>
    </p>
  </div>
);

export default function Home({ data }) {
  const LINK_CLASS = "text-sky-700 underline hover:text-sky-900";
  return (
    <Layout data={data}>
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="my-5">
          Welcome! This site aims to help beginners become better video poker
          players. It's a video poker machine with special rules. It evaluates
          your ability to follow the strategy outlined by{" "}
          <a
            class={LINK_CLASS}
            href="https://wizardofodds.com/"
          >
            The Wizard of Odds
          </a>{" "}
          on{" "}
          <a
            class={LINK_CLASS}
            href="https://wizardofodds.com/games/video-poker/strategy/jacks-or-better/9-6/simple/"
          >
            this page
          </a>.
        </p>

        <p class="my-5">
          You can use the numbers 1,2,3,4,5 on your keyboard to hold cards, and
          enter will deal/draw/start a game depending on context.
        </p>
        <p class="my-5">
          Sound good? Then lets play:
        </p>
        <Keyboard />
        <form action="/deal">
          <input
            class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            value="Video Poker Academy"
          />
        </form>
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
          addition A,2,3,4 and J,Q,K,A also count as inside straights because
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
            class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 mb-5 rounded float-left"
            href="https://wizardofodds.com/games/video-poker/strategy/jacks-or-better/9-6/simple/"
          >
            Learn more at The Wizard of Odds
          </a>
          <a
            class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 mb-5 rounded float-right"
            href="/deal"
          >
            Play Video Poker Academy
          </a>
          <div style="clear:both" />
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
  const cards_wrapper_classes = "flex gap-2 w-full grid grid-cols-5 hand";
  if (!cards) {
    return (
      <form action="/deal">
        <div class={cards_wrapper_classes}>
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
        <div class={cards_wrapper_classes}>
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
              <div class={cards_wrapper_classes}>
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
            <div class={cards_wrapper_classes}>
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
            <div class={cards_wrapper_classes}>
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
