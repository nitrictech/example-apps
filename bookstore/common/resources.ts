import { api, collection, topic } from "@nitric/sdk";

// Collections
export const bookCollection = collection("customers").for("writing");
// API
export const bookApi = api("public");
// Topics
export const bookCreatePub = topic("created").for("publishing");
export const bookCreateSub = topic("created");
