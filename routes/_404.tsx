import { Layout } from "@/routes/index.jsx";

export default function Page404() {
  return (
    <Layout>
      <div class="p-4 mx-auto max-w-screen-md">
        <a href="/">
          <img
            src="/logo.svg"
            height="100px"
            alt="the fresh logo: a sliced lemon dripping with juice"
          />
        </a>
        <p class="my-6">
          Oops 404
        </p>
      </div>
    </Layout>
  );
}
