// ./routes/sitemap.xml.ts
import { SitemapContext } from "fresh_seo";
import manifest from "@/fresh.gen.ts";
import { BASE_URL } from "@/utils/config.js";

export const handler = {
  GET(_req, _ctx) {
    const sitemap = new SitemapContext(
      BASE_URL,
      manifest,
    );
    sitemap.routes.map((route) => {
      console.log(route);
      switch (route.pathName) {
        case "/deal":
        case "/draw":
        case "/player":
          route.changefreq = "always";
          break;
        default:
          route.changefreq = "monthly";
          break;
      }
      return route;
    });
    return sitemap.render();
  },
};
