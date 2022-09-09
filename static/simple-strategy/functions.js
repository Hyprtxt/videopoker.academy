import {
  VALUES,
  SUITS
} from "../deck.js";

import { ROYAL_STRAIGHT } from "../poker.js"

import { 
  ALL_STRAIGHTS,
  ONLY_HIGH_CARDS
} from "./constants.js";

// Not Exported

const unique = (a, b) => {
  if (a.indexOf(b) < 0) {
    a.push(b);
  }
  return a;
};

const parse = (string) => {
  return JSON.parse(string);
};

const copyAndRemoveSingleCard = (array, index) => {
  let result = [...array];
  result.splice(index, 1);
  return result;
};

const handsWithFourCards = (hand) => {
  let hands;
  hands = [];
  hands.push(copyAndRemoveSingleCard(hand, 0));
  hands.push(copyAndRemoveSingleCard(hand, 1));
  hands.push(copyAndRemoveSingleCard(hand, 2));
  hands.push(copyAndRemoveSingleCard(hand, 3));
  hands.push(copyAndRemoveSingleCard(hand, 4));
  // console.log(hands)
  return hands;
};

const getTriplets = (things) => {
  var triplets;

  if (things == null) {
    things = [];
  }
  triplets = [];
  if (things.length !== 5) {
    return false;
  } else {
    [
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
    ].forEach(function (index) {
      var clone;
      clone = things.slice(0);
      switch (index) {
        case VALUES[0]:
          clone.splice(0, 2);
          break;
        case VALUES[1]:
          clone.splice(2, 1);
          clone.splice(0, 1);
          break;
        case VALUES[2]:
          clone.splice(3, 1);
          clone.splice(0, 1);
          break;
        case VALUES[3]:
          clone.splice(4, 1);
          clone.splice(0, 1);
          break;
        case VALUES[4]:
          clone.splice(4, 1);
          clone.splice(1, 1);
          break;
        case VALUES[5]:
          clone.splice(4, 1);
          clone.splice(2, 1);
          break;
        case VALUES[6]:
          clone.splice(3, 2);
          break;
        case VALUES[7]:
          clone.splice(3, 1);
          clone.splice(1, 1);
          break;
        case VALUES[8]:
          clone.splice(1, 2);
          break;
        case VALUES[9]:
          clone.splice(2, 2);
          break;
        default:
          break;
      }
      // console.log(clone)
      return triplets.push(clone);
    });
  }
  return triplets;
};

const getStraightTriplets = () => {
  var straightTriplets;
  straightTriplets = [];
  ALL_STRAIGHTS.forEach(function (straight) {
    var singleStraightTriplets;
    singleStraightTriplets = getTriplets(straight);
    singleStraightTriplets.forEach(function (triplet) {
      var tripletString;
      tripletString = JSON.stringify(triplet);
      straightTriplets.push(tripletString);
    });
  });
  return straightTriplets.reduce(unique, []).map(parse);
};

const getCardValuesOrdered = (hand) =>
  hand
    .map((card) => cardValue(card))
    .sort((a, b) => VALUES.indexOf(a) - VALUES.indexOf(b));

// Exported

export const fourOfStraights = () => {
  var result;
  result = [];
  ALL_STRAIGHTS.forEach(function (arr) {
    var copy;
    copy = arr.slice(0);
    copy.splice(0, 1);
    result.push(copy);
  });
  ALL_STRAIGHTS.forEach(function (arr) {
    var copy;
    copy = arr.slice(0);
    copy.splice(1, 1);
    result.push(copy);
    return copy;
  });
  ALL_STRAIGHTS.forEach(function (arr) {
    var copy;
    copy = arr.slice(0);
    copy.splice(2, 1);
    result.push(copy);
    return copy;
  });
  ALL_STRAIGHTS.forEach(function (arr) {
    var copy;
    copy = arr.slice(0);
    copy.splice(3, 1);
    result.push(copy);
    return copy;
  });
  ALL_STRAIGHTS.forEach(function (arr) {
    var copy;
    copy = arr.slice(0);
    copy.splice(4, 1);
    result.push(copy);
    return copy;
  });
  return result;
};

export const getSuitCards = (hand, suit) =>
  hand.filter(function (card) {
    if (cardSuit(card) === suit) {
      return true;
    }
    return false;
  });

export const cardSuit = (card) => card[0];
export const cardValue = (card) => card[1];

export const getHighCards = (cards) => {
  let result;
  result = {
    cards: [],
  };
  cards.forEach(function (card) {
    ONLY_HIGH_CARDS.forEach(function (val) {
      if (cardValue(card) === val) {
        result.cards.push(card);
      }
    });
  });
  // console.log("ghc", cards, result.cards)
  return result;
};

export const getRoyalFlushCards = (royal, flush) => {
  var royalFlush;
  royalFlush = {
    cards: [],
    suit: flush.suit,
  };
  if (flush.cards.length !== 0) {
    royal.cards.forEach(function (royalCard) {
      flush.cards.forEach(function (flushCard) {
        if (royalCard === flushCard) {
          royalFlush.cards.push(royalCard);
        }
      });
    });
  }
  return royalFlush;
};

export const getRoyalCards = (hand) => {
  let royal;
  royal = {
    cards: [],
  };
  hand.forEach(function (card) {
    ROYAL_STRAIGHT.forEach(function (val) {
      if (cardValue(card) === val) {
        royal.cards.push(card);
      }
    });
  });
  return royal;
};

export const getFlushCards = (hand) => {
  var flush;
  flush = {
    cards: [],
    suit: "",
  };
  SUITS.forEach(function (suit) {
    let cards, count;
    count = 0;
    cards = [];
    hand.forEach(function (card) {
      if (cardSuit(card) === suit) {
        count++;
        cards.push(card);
      }
    });
    if (cards.length > 2) {
      flush.cards = cards;
      flush.suit = suit;
    }
  });
  return flush;
};

export const getStraightOutlier = (hand, straights = []) => {
  let result;
  result = {
    haveStraight: false,
    outlierIndex: null,
    outlierCard: "",
    // match: straights,
  };
  straights.forEach(function (partialStraight, index) {
    const partialStraightString = JSON.stringify(partialStraight);
    handsWithFourCards(hand).forEach((partialHand, idx) => {
      const partialHandString = JSON.stringify(
        getCardValuesOrdered(partialHand)
      );
      if (partialHandString === partialStraightString) {
        result.haveStraight = true;
        result.outlierIndex = idx;
        result.outlierCard = hand[idx];
      }
    });
  });
  // console.log(result)
  return result;
};

export const getFlushOutlier = (hand) => {
  var flush, outlierIndex;
  flush = getFlushCards(hand);
  outlierIndex = -1;
  if (flush.cards.length !== 4) {
    return false;
  } else {
    hand.forEach(function (card, idx) {
      if (cardSuit(card) !== flush.suit) {
        outlierIndex = idx;
      }
    });
  }
  return outlierIndex;
};

export const find3toStraightFlush = (hand) => {
  // console.log("find3 hand", hand)
  var flush, result, triplets;
  result = {};
  result.foundIt = false;
  result.suit = "";
  flush = getFlushCards(hand);
  triplets = getTriplets(hand);
  // console.log(triplets, flush)
  if (flush.cards.length > 2) {
    triplets.forEach(function (hand_triplet, idx) {
      var handTripletString;
      handTripletString = JSON.stringify(getCardValuesOrdered(hand_triplet));
      getStraightTriplets().forEach(function (straight_triplet) {
        var flushCards, straightTripletString;
        straightTripletString = JSON.stringify(straight_triplet);
        if (straightTripletString === handTripletString) {
          flushCards = getFlushCards(hand_triplet);
          if (flushCards.cards.length === 3) {
            result.suit = flushCards.suit;
            result.foundIt = true;
          }
        }
      });
    });
  }
  return result;
};

export const get2SuitedHighCards = (hand) => {
  var high, result;
  result = {};
  result.success = false;
  result.cards = [];
  high = getHighCards(hand);
  if (high.cards.length > 1) {
    SUITS.forEach(function (idx) {
      var highCards, suitCards;
      suitCards = getSuitCards(hand, idx);
      highCards = getHighCards(suitCards);
      if (highCards.cards.length > 1) {
        result.cards = highCards.cards;
        result.success = true;
      }
    });
  }
  return result;
};

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
