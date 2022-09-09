export const SUITS = ["♦", "♣", "♥", "♠"],
  VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"],
  setupCards = (array) => {
    for (let suit_index = 0; suit_index < SUITS.length; suit_index++) {
      for (let value_index = 0; value_index < VALUES.length; value_index++) {
        array.push(SUITS[suit_index] + VALUES[value_index]);
      }
    }
    return array;
  },
  // http://bost.ocks.org/mike/shuffle/
  shuffle = (array) => {
    var counter = array.length,
      temp,
      index;
    while (counter > 0) {
      index = (Math.random() * counter--) | 0;
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  },
  getNewCards = () => shuffle(setupCards([]));
