// const Poker = require("../poker");

import { VALUES } from "../deck.js"
import { STRAIGHTS_LIST, ROYAL_STRAIGHT } from "../poker.js"

export const STRATEGY_RULES = [
  { number: 0, rule: "Is Filler" },
  { number: 1, rule: "Hold Royal Flush, Straight Flush, 4 of a Kind" },
  { number: 2, rule: "Hold 4 to a Royal Flush" },
  { number: 3, rule: "Hold 3 of a Kind, Flush, Straight or Full House" },
  { number: 4, rule: "Hold 4 to a Straight Flush" },
  { number: 5, rule: "Hold 2 Pair" },
  { number: 6, rule: "Hold High Pair" },
  { number: 7, rule: "Hold 3 to a Royal Flush" },
  { number: 8, rule: "Hold 4 to a Flush" },
  { number: 9, rule: "Hold the Low Pair" },
  { number: 10, rule: "Hold 4 to an Outside Straight" },
  { number: 11, rule: "Hold 2 Suited High Cards" },
  { number: 12, rule: "Hold 3 to a Straight Flush" },
  {
    number: 13,
    rule: "Hold 2 Unsuited High Cards (lowest 2)",
  },
  { number: 14, rule: "Hold Suited 10/J, 10/Q, or 10/K" },
  { number: 15, rule: "Hold 1 High Card" },
  { number: 16, rule: "Hold Nothing" },
];

export const ONLY_HIGH_CARDS = [
  VALUES[10],
  VALUES[11],
  VALUES[12],
  VALUES[0],
];

export const HIGH_CARDS_ORDER = [
  VALUES[1],
  VALUES[2],
  VALUES[3],
  VALUES[4],
  VALUES[5],
  VALUES[6],
  VALUES[7],
  VALUES[8],
  VALUES[9],
  VALUES[10],
  VALUES[11],
  VALUES[12],
  VALUES[0],
];

export const OUTSIDE_STRAIGHTS = [
  [VALUES[1], VALUES[2], VALUES[3], VALUES[4]],
  [VALUES[2], VALUES[3], VALUES[4], VALUES[5]],
  [VALUES[3], VALUES[4], VALUES[5], VALUES[6]],
  [VALUES[4], VALUES[5], VALUES[6], VALUES[7]],
  [VALUES[5], VALUES[6], VALUES[7], VALUES[8]],
  [VALUES[6], VALUES[7], VALUES[8], VALUES[9]],
  [VALUES[7], VALUES[8], VALUES[9], VALUES[10]],
  [VALUES[8], VALUES[9], VALUES[10], VALUES[11]],
];

export const ALL_STRAIGHTS = STRAIGHTS_LIST.concat([ROYAL_STRAIGHT]);
