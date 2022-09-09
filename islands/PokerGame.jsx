import { useState, useRef, useEffect } from "preact/hooks";
import { tw } from "twind";
import { getNewCards } from "../static/deck.js"
import { score } from "../static/poker.js";
import { simpleStrategy } from "../static/simple-strategy/index.js";

const game = () => {
  const deck = getNewCards()
  const hand = deck.splice(0,5)
}
  // const strat = simpleStrategy( hand )
  // const result = hand.map( ( val, idx ) => {
  //   const strat_idx = strat.strategy.map( (val) => {
  //     return parseInt( val.replace('HOLD_', "") )
  //   })
  //   const hold = strat_idx.indexOf( idx+1 ) === -1 ? false : true
  //   if ( !hold ) {
  //     return deck.splice(0,1)[0]
  //   }
  //   return val
  // })
  // const poker = score( result )
  // const cost = 5
  // return {
  //   cost, hand, ...strat, result, ...poker, net: poker.win - 5
  // }

export default function Game(props) {
  const [credits, setCredits] = useState(100);
  const [spend, setSpend] = useState(5);
  const [hand, setHand] = useState(['♥T','♥2','♥3','♥4','♥5']);
  const [holds, setHolds] = useState([false,false,false,false,false])

  const requestRef = useRef()
  const btn = tw`px-2 py-1 border(gray-100 1) hover:bg-gray-200`;
    
  // useEffect(() => {
  //   requestRef.current = requestAnimationFrame(gameLoop);
  //   return () => cancelAnimationFrame(requestRef.current);
  // }, []);

  return (
    <Fragment>
      <div class="flex gap-2 w-full">
        <p class="flex-grow-1 font-bold text-xl">{spend/5}</p>
        <p class="flex-grow-1 font-bold text-xl">{spend}</p>
        <p class="flex-grow-1 font-bold text-xl">{credits}</p>
      </div>
      <div class="flex gap-2 w-full grid grid-cols-5">
        {hand.map( card => <Card card={card} />)}
      </div>
    </Fragment>
  );
}

const Card = ({ card }) => {
  const [suit, val] = card;
  return <div class="">
    <div class="w-full h-[100%] p-4 font-bold text-xl border rounded overflow-hidden shadow-lg text-center">
      <div class="w-full aspect-square">{suit} {val}</div>
    </div>
    <div class="mt-2 text-white text-center cursor-pointer bg-yellow-500 hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-500 focus:outline-none dark:focus:ring-yellow-300">Hold</div>
  </div>
}