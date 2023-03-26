import { SUITS, VALUES } from "@/utils/deck.js"

import { ROYAL_STRAIGHT } from "@/utils/poker.js"

import {
  ALL_STRAIGHTS,
  ONLY_HIGH_CARDS,
} from "@/utils/simple-strategy/constants.js"

// Not Exported

const unique = (a, b) => {
  if (a.indexOf(b) < 0) {
    a.push(b)
  }
  return a
}

const parse = (string) => {
  return JSON.parse(string)
}

const copyAndRemoveSingleCard = (array, index) => {
  const result = [...array]
  result.splice(index, 1)
  return result
}

const handsWithFourCards = (hand) => {
  const hands = []
  hands.push(copyAndRemoveSingleCard(hand, 0))
  hands.push(copyAndRemoveSingleCard(hand, 1))
  hands.push(copyAndRemoveSingleCard(hand, 2))
  hands.push(copyAndRemoveSingleCard(hand, 3))
  hands.push(copyAndRemoveSingleCard(hand, 4))
  // console.log(hands)
  return hands
}

const getTriplets = (things = []) => {
  const triplets = []
  if (things.length !== 5) {
    return false
  } else {
    ;[
      VALUES[0],
      VALUES[1],
      VALUES[2],
      VALUES[3],
      VALUES[4],
      VALUES[5],
      VALUES[6],
      VALUES[7],
      VALUES[8],
      VALUES[9],
    ].forEach((index) => {
      const clone = things.slice(0)
      switch (index) {
        case VALUES[0]:
          clone.splice(0, 2)
          break
        case VALUES[1]:
          clone.splice(2, 1)
          clone.splice(0, 1)
          break
        case VALUES[2]:
          clone.splice(3, 1)
          clone.splice(0, 1)
          break
        case VALUES[3]:
          clone.splice(4, 1)
          clone.splice(0, 1)
          break
        case VALUES[4]:
          clone.splice(4, 1)
          clone.splice(1, 1)
          break
        case VALUES[5]:
          clone.splice(4, 1)
          clone.splice(2, 1)
          break
        case VALUES[6]:
          clone.splice(3, 2)
          break
        case VALUES[7]:
          clone.splice(3, 1)
          clone.splice(1, 1)
          break
        case VALUES[8]:
          clone.splice(1, 2)
          break
        case VALUES[9]:
          clone.splice(2, 2)
          break
        default:
          break
      }
      // console.log(clone)
      return triplets.push(clone)
    })
  }
  return triplets
}

const getStraightTriplets = () => {
  const straightTriplets = []
  ALL_STRAIGHTS.forEach((straight) => {
    const singleStraightTriplets = getTriplets(straight)
    singleStraightTriplets.forEach((triplet) => {
      const tripletString = JSON.stringify(triplet)
      straightTriplets.push(tripletString)
    })
  })
  return straightTriplets.reduce(unique, []).map(parse)
}

const getCardValuesOrdered = (hand) =>
  hand
    .map((card) => cardValue(card))
    .sort((a, b) => VALUES.indexOf(a) - VALUES.indexOf(b))

// Exported

export const fourOfStraights = () => {
  const result = []
  ALL_STRAIGHTS.forEach((arr) => {
    const copy = arr.slice(0)
    copy.splice(0, 1)
    result.push(copy)
  })
  ALL_STRAIGHTS.forEach((arr) => {
    const copy = arr.slice(0)
    copy.splice(1, 1)
    result.push(copy)
    return copy
  })
  ALL_STRAIGHTS.forEach((arr) => {
    const copy = arr.slice(0)
    copy.splice(2, 1)
    result.push(copy)
    return copy
  })
  ALL_STRAIGHTS.forEach((arr) => {
    const copy = arr.slice(0)
    copy.splice(3, 1)
    result.push(copy)
    return copy
  })
  ALL_STRAIGHTS.forEach((arr) => {
    const copy = arr.slice(0)
    copy.splice(4, 1)
    result.push(copy)
    return copy
  })
  return result
}

export const getSuitCards = (hand, suit) =>
  hand.filter((card) => {
    if (cardSuit(card) === suit) {
      return true
    }
    return false
  })

export const cardSuit = (card) => card[0]
export const cardValue = (card) => card[1]

export const getHighCards = (cards) => {
  const result = {
    cards: [],
  }
  cards.forEach((card) => {
    ONLY_HIGH_CARDS.forEach((val) => {
      if (cardValue(card) === val) {
        result.cards.push(card)
      }
    })
  })
  // console.log("ghc", cards, result.cards)
  return result
}

export const getRoyalFlushCards = (royal, flush) => {
  const royalFlush = {
    cards: [],
    suit: flush.suit,
  }
  if (flush.cards.length !== 0) {
    royal.cards.forEach((royalCard) => {
      flush.cards.forEach((flushCard) => {
        if (royalCard === flushCard) {
          royalFlush.cards.push(royalCard)
        }
      })
    })
  }
  return royalFlush
}

export const getRoyalCards = (hand) => {
  const royal = {
    cards: [],
  }
  hand.forEach((card) => {
    ROYAL_STRAIGHT.forEach((val) => {
      if (cardValue(card) === val) {
        royal.cards.push(card)
      }
    })
  })
  return royal
}

export const getFlushCards = (hand) => {
  const flush = {
    cards: [],
    suit: "",
  }
  SUITS.forEach((suit) => {
    let count = 0
    const cards = []
    hand.forEach((card) => {
      if (cardSuit(card) === suit) {
        count++
        cards.push(card)
      }
    })
    if (cards.length > 2) {
      flush.cards = cards
      flush.suit = suit
    }
  })
  return flush
}

export const getStraightOutlier = (hand, straights = []) => {
  const result = {
    haveStraight: false,
    outlierIndex: null,
    outlierCard: "",
    // match: straights,
  }
  straights.forEach((partialStraight, _index) => {
    const partialStraightString = JSON.stringify(partialStraight)
    handsWithFourCards(hand).forEach((partialHand, idx) => {
      const partialHandString = JSON.stringify(
        getCardValuesOrdered(partialHand),
      )
      if (partialHandString === partialStraightString) {
        result.haveStraight = true
        result.outlierIndex = idx
        result.outlierCard = hand[idx]
      }
    })
  })
  // console.log(result)
  return result
}

export const getFlushOutlier = (hand) => {
  const flush = getFlushCards(hand)
  let outlierIndex = -1
  if (flush.cards.length !== 4) {
    return false
  } else {
    hand.forEach((card, idx) => {
      if (cardSuit(card) !== flush.suit) {
        outlierIndex = idx
      }
    })
  }
  return outlierIndex
}

export const find3toStraightFlush = (hand) => {
  // console.log("find3 hand", hand)
  const result = {
    foundIt: false,
    suit: "",
  }
  const flush = getFlushCards(hand)
  const triplets = getTriplets(hand)
  // console.log(triplets, flush)
  if (flush.cards.length > 2) {
    triplets.forEach((hand_triplet, _idx) => {
      const handTripletString = JSON.stringify(
        getCardValuesOrdered(hand_triplet),
      )
      getStraightTriplets().forEach((straight_triplet) => {
        const straightTripletString = JSON.stringify(straight_triplet)
        if (straightTripletString === handTripletString) {
          const flushCards = getFlushCards(hand_triplet)
          if (flushCards.cards.length === 3) {
            result.suit = flushCards.suit
            result.foundIt = true
          }
        }
      })
    })
  }
  return result
}

export const get2SuitedHighCards = (hand) => {
  const result = {
    success: false,
    cards: [],
  }
  const high = getHighCards(hand)
  if (high.cards.length > 1) {
    SUITS.forEach((idx) => {
      const suitCards = getSuitCards(hand, idx)
      const highCards = getHighCards(suitCards)
      if (highCards.cards.length > 1) {
        result.cards = highCards.cards
        result.success = true
      }
    })
  }
  return result
}

// module.exports = ;

// const handHasValue = (hand, value) => {
//     var hasValue, result, values
//     values= getCardValuesOrdered(hand)
//     result = false
//     hasValue = values.indexOf(value)
//     if (hasValue !== -1) {
//         result = true
//     }
//     return result
// }

// const getCardValues= (hand) => hand.map((card) => cardValue(card))
