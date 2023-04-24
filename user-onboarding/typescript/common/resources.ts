import { api, collection, topic } from '@nitric/sdk';

// Collections
export const custCollection = collection("customers").for("writing");
// API
export const custApi = api("public");
// Topics
export const custCreatePub = topic('created').for('publishing'); 
export const custCreateSub = topic('created')