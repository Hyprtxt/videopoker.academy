// if (royal && flush) {
//     return {
//       status: "royalflush",
//       win: bet * 800,
//     };
//   } else if (straight && flush) {
//     return {
//       status: "straightflush",
//       win: bet * 50,
//     };
//   } else if (quad) {
//     return {
//       status: "4kind",
//       win: bet * 25,
//     };
//   } else if (triple && pair1) {
//     return {
//       status: "fullhouse",
//       win: bet * 9,
//     };
//   } else if (flush) {
//     return {
//       status: "flush",
//       win: bet * 6,
//     };
//   } else if (straight || royal) {
//     return {
//       status: "straight",
//       win: bet * 4,
//     };
//   } else if (triple) {
//     return {
//       status: "3kind",
//       win: bet * 3,
//     };
//   } else if (pair1 && pair2) {
//     return {
//       status: "2pair",
//       win: bet * 2,
//     };
//   } else if (jacksorbetter) {
//     return {
//       status: "jacksbetter",
//       win: bet * 1,
//     };
//   }
// //   else if (pair1) {
// //     return {
// //       status: "lowpair",
// //       win: 0,
// //     };
// //   }
//   return {
//     status: "ulose",
//     win: 0,
//   };

const PAY_TABLE = [
  {
    status: "royalflush",
    win: bet * 800,
  },
  {
    status: "straightflush",
    win: bet * 50,
  },
  {
    status: "4kind",
    win: bet * 25,
  },
  {
    status: "fullhouse",
    win: bet * 9,
  },
  {
    status: "flush",
    win: bet * 6,
  },
  {
    status: "straight",
    win: bet * 4,
  },
  {
    status: "3kind",
    win: bet * 3,
  },
  {
    status: "2pair",
    win: bet * 2,
  },
  {
    status: "jacksbetter",
    win: bet * 1,
  },
  //   {
  //       status: "lowpair",
  //       win: 0,
  //     };
  {
    status: "ulose",
    win: 0,
  },
];
