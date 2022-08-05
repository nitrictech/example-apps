import { collection } from '@nitric/sdk';

// The tenant interface
export interface Tenant {
    name: string
    publicKey: string
}

export default collection<Tenant>('tenants');