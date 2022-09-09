export const handler = {
  async GET(req, ctx) {
    const res = new Response(null, {
      status: 302,
      headers: new Headers({
        location: new URL(req.url).origin + `/`,
      }),
    });
    if (ctx.state?.user?.id) {
      const state = ctx.state;
      delete state.user;
      delete state.jwt;
      await ctx.store.set(state.uuid, JSON.stringify(state));
      return res;
    } else {
      // They were not logged in?
      return new Response(null, {
        headers: {
          "Location": "/signin",
        },
        status: 302,
      });
    }
  },
};
