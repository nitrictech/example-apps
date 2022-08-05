import process from '../resources/process-topic';
import staging from '../resources/staging-bucket';

const stagingBucket = staging.for('reading', 'deleting');

// process trigger for a tenant
process.subscribe(async ({req}) => {
    const { tenantId } = req.json();

    const stagedFiles = await stagingBucket.files()

    // process all of this tenants files
    await Promise.all(stagedFiles.filter(f => f.name.startsWith(tenantId)).map(async f => {
        // Add your file processing here...
        console.log(`processing file ${f.name} for tenant ${tenantId}`);
        // clean up the file when finished processing
        await f.delete();
    }))
});