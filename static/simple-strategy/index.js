import { score } from "../poker.js"

import {
  VALUES
} from "../deck.js"

import {
  OUTSIDE_STRAIGHTS,
  STRATEGY_RULES,
  HIGH_CARDS_ORDER,
} from "./constants.js";

import {
  cardSuit,
  cardValue,
  fourOfStraights,
  getHighCards,
  getRoyalFlushCards,
  getRoyalCards,
  getFlushCards,
  getSuitCards,
  getStraightOutlier,
  getFlushOutlier,
  find3toStraightFlush,
  get2SuitedHighCards,
} from "./functions.js";

const rule = (rule_number, INPUT_HAND) => {
  const getHoldEvents = {
    cards: (cardsArray) =>
      cardsArray
        .map((hold_card) => `HOLD_${INPUT_HAND.indexOf(hold_card) + 1}`)
        // fixes it?, but which rule is outputting results out of order...
        .sort((a, b) => b - a),
    suit: (holdSuit) =>
      INPUT_HAND.map((card, index) =>
        cardSuit(card) === holdSuit ? `HOLD_${index + 1}` : ""
      ).filter((cur) => cur.length > 0),
    all: () => [1, 2, 3, 4, 5].map((value) => `HOLD_${value}`),
    dupes: () => {
      const map = INPUT_HAND.map((card) => cardValue(card)).reduce(
        (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
        new Map()
      );
      const dupe_vals = [...map.entries()]
        .filter((entry) => entry[1] > 1)
        .map((entry) => entry[0]);
      return INPUT_HAND.map((card, index) => {
        return dupe_vals.filter(
          (dupe_card_value) => dupe_card_value === cardValue(card)
        ).length;
      })
        .map((card, index) => (card === 1 ? `HOLD_${index + 1}` : ""))
        .filter((cur) => cur.length > 0);
    },
  };

  const result = score(INPUT_HAND);
  const flush = getFlushCards(INPUT_HAND);
  const royal = getRoyalCards(INPUT_HAND);
  const royalFlush = getRoyalFlushCards(royal, flush);
  const flushOutlier = getFlushOutlier(INPUT_HAND);
  const straightOutlier = getStraightOutlier(INPUT_HAND, fourOfStraights());
  const high = getHighCards(INPUT_HAND);
  switch (rule_number) {
    case 1:
      switch (result.status) {
        case "royalflush":
        case "straightFlush":
        case "4kind":
          return {
            rule_number,
            strategy: getHoldEvents.all(),
            rule: STRATEGY_RULES[1].rule,
          };
          break;
        default:
          break;
      }
      break;
    case 2:
      if (royalFlush.cards.length > 3) {
        return {
          rule_number,
          strategy: getHoldEvents.cards(royalFlush.cards),
          rule: STRATEGY_RULES[2].rule,
        };
      }
      break;
    case 3:
      switch (result.status) {
        case "3kind":
        case "fullhouse":
          return {
            rule_number,
            strategy: getHoldEvents.dupes(),
            rule: STRATEGY_RULES[3].rule,
          };
        case "straight":
        case "flush":
          return {
            rule_number,
            strategy: getHoldEvents.all(),
            rule: STRATEGY_RULES[3].rule,
          };
        default:
          break;
      }
      break;
    case 4:
      if (flushOutlier) {
        if (straightOutlier.haveStraight) {
          if (flushOutlier === straightOutlier.outlierIndex) {
            return {
              rule_number,
              strategy: getHoldEvents.suit(flush.suit),
              rule: STRATEGY_RULES[4].rule,
            };
          }
        }
      }
      break;
    case 5:
      if (result.status === "2pair") {
        return {
          rule_number,
          strategy: getHoldEvents.dupes(),
          rule: STRATEGY_RULES[5].rule,
        };
      }
      break;
    case 6:
      if (result.status === "jacksbetter") {
        return {
          rule_number,
          strategy: getHoldEvents.dupes(),
          rule: STRATEGY_RULES[6].rule,
        };
      }
      break;
    case 7:
      if (royalFlush.cards.length > 2) {
        return {
          rule_number,
          strategy: getHoldEvents.cards(royalFlush.cards),
          rule: STRATEGY_RULES[7].rule,
        };
      }
      break;
    case 8:
      if (flush.cards.length > 3) {
        return {
          rule_number,
          strategy: getHoldEvents.suit(flush.suit),
          rule: STRATEGY_RULES[8].rule,
        };
      }
      break;
    case 9:
      if (result.status === "lowpair") {
        return {
          rule_number,
          strategy: getHoldEvents.dupes(),
          rule: STRATEGY_RULES[9].rule,
        };
      }
      break;
    case 10:
      const rule10 = getStraightOutlier(INPUT_HAND, OUTSIDE_STRAIGHTS);
      // console.log("rule10", rule10)
      if (rule10.haveStraight) {
        return {
          rule_number,
          strategy: getHoldEvents.cards(
            INPUT_HAND.filter((item, index) => {
              // console.log(index, rule10.outlierIndex)
              return index === rule10.outlierIndex ? false : item;
            })
          ),
          rule: STRATEGY_RULES[10].rule,
        };
      }
      break;
    case 11:
      const rule11 = get2SuitedHighCards(INPUT_HAND);
      if (rule11.success) {
        // console.log("DO HOLD STUFF rule11", rule11)
        // 2 suited high cards
        return {
          rule_number,
          strategy: getHoldEvents.cards(rule11.cards),
          rule: STRATEGY_RULES[11].rule,
        };
      }
      break;
    case 12:
      // console.log("rule12", rule12)
      const rule12 = find3toStraightFlush(INPUT_HAND);
      if (rule12.foundIt) {
        return {
          rule_number,
          strategy: getHoldEvents.suit(rule12.suit),
          rule: STRATEGY_RULES[12].rule,
        };
      }
      break;
    case 13:
      const rule = STRATEGY_RULES[13].rule;
      if (high.cards.length === 2) {
        return {
          rule_number,
          strategy: getHoldEvents.cards(high.cards),
          rule,
        };
      }
      if (high.cards.length > 2) {
        return {
          rule_number,
          strategy: getHoldEvents.cards(
            high.cards
              .sort(
                (a, b) =>
                  HIGH_CARDS_ORDER.indexOf(cardValue(a)) -
                  HIGH_CARDS_ORDER.indexOf(cardValue(b))
              )
              .splice(0, 2)
          ),
          // console.log("rule 13", holdem)
          rule,
        };
      }
      break;
    case 14:
      // Rule 14 JQK/T suited
      if (high.cards.length === 1) {
        const cardT = INPUT_HAND.filter((card) =>
          cardValue(card) === VALUES[9] ? card : false
        );
        // Only ever one Ten here, rule 9 hold low pair.
        if (cardT[0]) {
          const tSuitedHighCards = getSuitCards(high.cards, cardSuit(cardT[0]));
          // console.log(cardSuit(cardT[0]), suitCards, highCards)
          if (tSuitedHighCards.length > 0) {
            // No Aces
            if (cardValue(tSuitedHighCards[0]) !== VALUES[0]) {
              return {
                rule_number,
                strategy: getHoldEvents.cards([cardT[0], tSuitedHighCards[0]]),
                rule: STRATEGY_RULES[14].rule,
              };
            }
          }
        }
      }
      break;
    case 15:
      if (high.cards.length === 1) {
        // Rule 15, one high card
        return {
          rule_number,
          strategy: getHoldEvents.cards(high.cards),
          rule: STRATEGY_RULES[15].rule,
        };
      }
      break;
    case 16:
    default:
      // Rule 16
      return {
        rule_number,
        strategy: [],
        rule: STRATEGY_RULES[16].rule,
      };
      break;
  }
  return false;
};

export const simpleStrategy = (THE_CARDS) => {
  const CURRENT_HAND = [...THE_CARDS];
  for (let index = 1; index < 17; index++) {
    const result = rule(index, CURRENT_HAND);
    if (result) return result;
  }
};
