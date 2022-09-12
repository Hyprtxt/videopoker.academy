import { useState } from "preact/hooks";
import { apply, tw } from "twind";
import { aspectRatio } from "@/utils/aspect-ratio.ts";

export const Card = ({ card, idx, hold, active = false }) => {
  // const btn = apply`inline-block bg-gray-500 text-base`;
  const INDEX = idx + 1;
  const card_base_style =
    apply`mb-4 rounded overflow-hidden shadow-lg border-4`;
  const card_back_style = apply`${card_base_style} border-sky-600 `;
  const card_front_style = apply`${card_base_style} bg-white border-sky-200`;
  const card_hold_style = apply`${card_base_style} bg-white border-sky-400`;
  const button_style =
    apply`text-center cursor-pointer bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full`;
  // console.log(card);
  if (!card) {
    return (
      <div
        class={tw`${card_back_style} ${aspectRatio("2.5/3.5")} bg-sky-500`}
      />
    );
  }
  const [suit, val] = card;
  // console.log(suit, val, card, "yep");
  if (!active) {
    return (
      <div class="mb-4 w-full">
        <div
          class={tw`${hold ? card_hold_style : card_front_style} ${
            aspectRatio("2.5/3.5")
          }`}
        >
          <div
            class={`flex justify-center text-xl sm:text-3xl md:text-4xl items-center font-bold ${
              suit === "♥" || suit === "♦" ? "text-red-500" : ""
            }`}
          >
            {suit} {val}
          </div>
        </div>
      </div>
    );
  }
  if (!hold) {
    hold = false;
  }
  const [s_hold, setHold] = useState(false);
  const handleClick = (e) => {
    setHold((curr) => !curr);
  };
  return (
    <div class="mb-4 w-full">
      <div
        class={tw`${s_hold ? card_hold_style : card_front_style} ${
          aspectRatio("2.5/3.5")
        }`}
        onClick={handleClick}
      >
        <div
          class={`flex justify-center text-xl sm:text-3xl md:text-4xl items-center font-bold ${
            suit === "♥" || suit === "♦" ? "text-red-500" : ""
          }`}
        >
          {suit} {val}
        </div>
      </div>
      {active
        ? (
          <div class="flex">
            <input
              type="checkbox"
              id={`hold_${INDEX}`}
              class="peer hidden"
              name={`hold_${INDEX}`}
              checked={s_hold}
            />
            {
              <label
                for={`hold_${INDEX}`}
                class={tw`${button_style} ${s_hold ? "bg-sky-700" : ""}`}
                onClick={handleClick}
              >
                Hold
              </label>
            }
          </div>
        )
        : <></>}
    </div>
  );
};

export default Card;
