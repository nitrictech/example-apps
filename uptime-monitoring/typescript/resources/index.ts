import { api, kv, topic } from "@nitric/sdk";
import { corsMiddleware } from "../common/cors";

export interface Site {
  url: string;
  lastChecked: string;
  up: boolean;
}

export const publicApi = api("public", {
  middleware: corsMiddleware,
});

export const sitesStore = kv<Site>("sites").allow("set", "get", "delete");

export const siteAddedTopic = topic<Site>("site-added");

export const siteRemovedTopic = topic<Pick<Site, "url">>("site-removed");

export const siteUpdateTopic = topic<Site>("site-update");
