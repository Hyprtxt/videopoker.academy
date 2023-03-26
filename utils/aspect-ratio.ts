// I got this from somewhere, but I can't make it work as a remote include.

import type {
  Context,
  CSSRules,
  Directive,
  MaybeThunk,
  ThemeSection,
} from "twind"
import { apply, directive } from "twind"

declare module "twind" {
  interface Theme {
    aspectRatio?: ThemeSection<string>
  }
}

export interface Ratio {
  w: string | number
  h: string | number
}

export interface AspectRatio {
  (ratio: "none" | `${number}/${number}` | Ratio): Directive<CSSRules>
  (width: string | number, height: string | number): Directive<CSSRules>
  (parts: string[], context: Context): Directive<CSSRules>
}

const aspectRatioCalc = () => ({
  paddingBottom: `calc(var(--tw-aspect-h)/var(--tw-aspect-w)*100%)`,
})

const aspectRatio$ = (
  ratio: "none" | { w?: string | number; h?: string | number },
  { theme, tag }: Context,
): MaybeThunk<CSSRules | ""> =>
  ratio === "none"
    ? apply`static pb-0 children:(static h-auto w-auto inset-auto)`
    : ratio.w === "ratio"
    ? ""
    // {
    //     position: 'static',
    //     paddingBottom: '0',
    //     '&>*': {
    //       position: 'static',
    //       height: 'auto',
    //       width: 'auto',
    //       top: 'auto',
    //       right: 'auto',
    //       bottom: 'auto',
    //       left: 'auto',
    //     },
    //   }
    : {
      "--tw-aspect-w": ratio.w &&
        theme("aspectRatio", "" + ratio.w, "" + ratio.w),
      "--tw-aspect-h": ratio.h &&
        theme("aspectRatio", "" + ratio.h, "" + ratio.h),
      // Add additional aspect-ratio class only once
      _: ratio.h ? tag("aspect-ratio") : undefined,
      ":global": {
        [
          "." +
          tag(
            "aspect-ratio",
          )
        ]: apply`relative ${aspectRatioCalc} children:(absolute h-full w-full inset-0)`,
        // {
        //   position: 'relative',
        //   paddingBottom: `calc(var(--tw-aspect-h)/var(--tw-aspect-w)*100%)`,
        //   '&>*': {
        //     position: 'absolute',
        //     height: '100%',
        //     width: '100%',
        //     top: '0',
        //     right: '0',
        //     bottom: '0',
        //     left: '0',
        //   },
        // },
      },
    }

export const aspectRatio = ((
  ratio: "none" | Ratio | string | number | string[],
  context: string | number | Context,
): Directive<CSSRules | ""> => {
  if (Array.isArray(ratio)) {
    switch (ratio[0]) {
      // aspect-w-16
      case "w":
        return directive(aspectRatio$, { w: ratio[1] })
      // aspect-h-9
      case "h":
        return directive(aspectRatio$, { h: ratio[1] })
      // aspect-none
      case "none":
        return directive(aspectRatio$, ratio[0])
      default: {
        // aspect-16/9
        if (ratio.length === 1) {
          ratio = ratio[0].split("/")
        }

        // aspect-16-9
        return directive(aspectRatio$, { w: ratio[0], h: ratio[1] })
      }
    }
  }

  // aspectRatio('none')
  if (ratio === "none") {
    return directive(aspectRatio$, ratio)
  }

  // aspectRatio({w: 16, h: 9})
  if (typeof ratio === "object") {
    return directive(aspectRatio$, ratio)
  }

  // aspectRatio(16, 9)
  if (context !== undefined) {
    return directive(aspectRatio$, { w: ratio, h: context as string | number })
  }

  // aspectRatio('16/9')
  const [w, h] = (ratio as string).split("/")
  return directive(aspectRatio$, { w, h })
}) as AspectRatio
