import { Options } from "$fresh/plugins/twind.ts"
import * as colors from "twind/colors"

export default {
  selfURL: import.meta.url,
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      // Build your palette here
      teal: colors.teal,
      sky: colors.sky,
      red: colors.red,
      yellow: colors.yellow,
      white: colors.white,
      black: colors.black,
    },
  },
} as Options
