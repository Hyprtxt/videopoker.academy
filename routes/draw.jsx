import { PokerGame } from "@/routes/index.jsx";

export const handler = {
  GET: (req, ctx) => {
    return ctx.render({ ...ctx.state });
  },
  // POST: async (req, ctx) => {
  //   console.log(await req.formData());
  //   return new Response(null, {
  //     status: 302,
  //     headers: new Headers({
  //       location: "/deal",
  //     }),
  //   });
  //   // ctx.render({ ...ctx.state });
  // },
};

export default function Home({ data }) {
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <a href="/">
        <img
          src="/logo.svg"
          height="100px"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
      </a>
      <p class="my-6">
        Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <PokerGame hand={["♥2", "♥3", "♥4", "♥5", "♥6"]} result={[]} />
      <pre>{JSON.stringify( data, null, 2 )}</pre>
    </div>
  );
}
