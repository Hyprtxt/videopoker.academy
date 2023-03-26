import PokerPlayer from "@/islands/PokerPlayer.jsx"
import { Layout } from "@/routes/index.jsx"

export default function Home() {
  return (
    <Layout>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/fresh.svg"
          height="100px"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">
          Welcome. This little thing just plays some video poker.
        </p>
        <PokerPlayer count={3} />
      </div>
    </Layout>
  )
}
