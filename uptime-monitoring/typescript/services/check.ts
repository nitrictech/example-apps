import { schedule } from "@nitric/sdk";
import { statusCheck } from "../common/status";
import { siteUpdateTopic, sitesStore } from "../resources";

const siteUpdateTopicPublish = siteUpdateTopic.allow("publish");

schedule("site-check").every("1 minute", async () => {
  const sites = [];

  for await (const key of sitesStore.keys()) {
    const existingSite = await sitesStore.get(key);
    const site = await statusCheck(key);

    // only publish changes
    if (existingSite.up !== site.up) {
      await siteUpdateTopicPublish.publish(site);
    }

    sites.push({
      key,
      ...site,
    });
  }

  await Promise.all(sites.map(({ key, ...rest }) => sitesStore.set(key, rest)));
});
