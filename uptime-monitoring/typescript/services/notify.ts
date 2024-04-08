import {
  siteAddedTopic,
  siteRemovedTopic,
  siteUpdateTopic,
} from "../resources";

const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

siteAddedTopic.subscribe(async (ctx) => {
  await fetch(discordWebhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Nitric Uptime Monitor",
      content: `📢 **${ctx.req.json().url}** added to sites!`,
    }),
  });
});

siteRemovedTopic.subscribe(async (ctx) => {
  await fetch(discordWebhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Nitric Uptime Monitor",
      content: `📢 **${ctx.req.json().url}** removed from sites!`,
    }),
  });
});

siteUpdateTopic.subscribe(async (ctx) => {
  const { up } = ctx.req.json();

  await fetch(discordWebhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Nitric Uptime Monitor",
      content: up
        ? `✅ **${ctx.req.json().url}** BACK UP!`
        : `🚨 **${ctx.req.json().url}** DOWN!`,
    }),
  });
});
