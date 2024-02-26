import { kv } from "@nitric/sdk";

// The tenant interface
export interface Tenant {
  id: string;
  name: string;
  publicKey: string;
}

export default kv<Tenant>("tenants");
