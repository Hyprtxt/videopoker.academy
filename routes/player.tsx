import PokerPlayer from "@/islands/PokerPlayer.jsx";

export default function Home() {
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class="my-6">
        Welcome. This little thing just plays some video poker.
      </p>
      <PokerPlayer count={3} />
    </div>
  );
}
