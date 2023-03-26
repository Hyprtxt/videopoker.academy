import { useEffect, useRef, useState } from "preact/hooks"
import { tw } from "twind"
import { getNewCards } from "@/utils/deck.js"
import { score } from "@/utils/poker.js"
import { simpleStrategy } from "@/utils/simple-strategy/mod.js"

const game = () => {
  const deck = getNewCards()
  const hand = deck.splice(0, 5)
  const strat = simpleStrategy(hand)
  const result = hand.map((val, idx) => {
    const strat_idx = strat.strategy.map((val) => {
      return parseInt(val.replace("HOLD_", ""))
    })
    const hold = strat_idx.indexOf(idx + 1) === -1 ? false : true
    if (!hold) {
      return deck.splice(0, 1)[0]
    }
    return val
  })
  const poker = score(result)
  const cost = 5
  return {
    cost,
    hand,
    ...strat,
    result,
    ...poker,
    net: poker.win - 5,
  }
}

export default function Counter(props) {
  const [credits, setCredits] = useState(0)
  const [spend, setSpend] = useState(0)
  const [count, setCount] = useState(0)
  const [hand, setHand] = useState(`♥T♥2♥3♥4♥5`)
  const requestRef = useRef()
  const btn = tw`px-2 py-1 border(gray-100 1) hover:bg-gray-200`

  useEffect(() => {
    requestRef.current = requestAnimationFrame(gameLoop)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  const gameLoop = (timeStamp) => {
    const NUMBER_GAMES = props.count || 1
    const run = (NUMBER_GAMES) => {
      const games = []
      const credits =
        Array(NUMBER_GAMES).fill().map((x, i) => i).reduce((prev) => {
          const play = game()
          games.push(play)
          return prev + play.win
        }, 0) - NUMBER_GAMES * 5
      return { NUMBER_GAMES, credits, games }
    }
    // console.log( run( NUMBER_GAMES ) )
    const plays = run(NUMBER_GAMES)
    // console.log( plays )
    // const play = game()
    // console.log( credits + play.net );
    setSpend((prevSpend) => prevSpend + (5 * NUMBER_GAMES))
    setCredits((prevCredits) => plays.credits + prevCredits)
    setHand(() => `${plays.games[0].hand} => ${plays.games[0].result}`)
    // if ( timeStamp < 5000 ) { requestRef.current = requestAnimationFrame(gameLoop) }
    requestRef.current = requestAnimationFrame(gameLoop)
  }
  return (
    <>
      <div class="flex gap-2 w-full">
        <p class="flex-grow-1 font-bold text-xl">{spend / 5}</p>
        <p class="flex-grow-1 font-bold text-xl">{spend}</p>
        <p class="flex-grow-1 font-bold text-xl">{credits}</p>
      </div>
      <div class="flex gap-2 w-full">
        <p class="flex-grow-1 font-bold text-xl">{hand}</p>
      </div>
    </>
  )
}
