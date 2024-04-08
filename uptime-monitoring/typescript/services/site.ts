import { statusCheck } from "../common/status";
import {
  type Site,
  publicApi,
  siteAddedTopic,
  sitesStore,
  siteRemovedTopic,
} from "../resources";

const siteAddedTopicPublish = siteAddedTopic.allow("publish");
const siteRemovedTopicPublish = siteRemovedTopic.allow("publish");

const getAllSites = async () => {
  const sites: Site[] = [];

  for await (const key of sitesStore.keys()) {
    sites.push(await sitesStore.get(key));
  }

  return sites;
};

publicApi.post("/sites/:url", async (ctx) => {
  const { url } = ctx.req.params;

  const siteData = await statusCheck(url);

  await sitesStore.set(url, siteData);

  await siteAddedTopicPublish.publish(siteData);

  return ctx;
});

publicApi.delete("/sites/:url", async (ctx) => {
  const { url } = ctx.req.params;

  await sitesStore.delete(url);

  await siteRemovedTopicPublish.publish({
    url,
  });

  return ctx;
});

publicApi.get("/sites", async (ctx) => {
  return ctx.res.json(await getAllSites());
});

publicApi.options("/sites/:url", async (ctx) => ctx);
