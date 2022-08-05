import { schedule } from '@nitric/sdk';

import tenant from '../resources/tenant';
import process from '../resources/process-topic';

const processPub = process.for('publishing');
const tenantColl = tenant.for('reading');

schedule('process-queues').every('hour', async () => {
    // process customer queues every hour
    // This will generate one task per customer to begin processing tenant ingestion queues

    // Read all tenants
    const tenantStream = tenantColl.query().stream();

    tenantStream.on('data', async (data) => {
        // publish an event to begin processing a tenants ingestion queue
        await processPub.publish({
            payload: {
                tenantId: data.id,
            }
        })
    })

    // wait for the stream to finish
    await new Promise((res, rej) => {
        tenantStream.once('end', () => {
            res(null)
        })

        tenantStream.once('error', () => {
            rej()
        })
    })
})
