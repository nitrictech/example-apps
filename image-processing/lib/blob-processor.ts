import { File, bucket, faas, topic } from "@nitric/sdk";
import short from "short-uuid";

interface FileEvent {
    key: string;
}

export default (name: string) => {
    const blobBucket = bucket(name);
    const eventFanout = topic<FileEvent>(`${name}-fanout`);
    
    return {
        // register the handler for picking up bucket events
        startListener: () => {
            const eventFanoutPub = eventFanout.for('publishing');
            blobBucket.on('write', '*', async (ctx) => {
                await eventFanoutPub.publish({
                    key: ctx.req.key,
                });
            });
        },
        uploadFileMiddleware: () => {
            const operableBucket = blobBucket.for('writing');
            return async (ctx: faas.HttpContext, next: faas.HttpMiddleware) => {
                const name = short.generate();
                const uploadUrl = await operableBucket.file(`uploads/${name}`).getUploadUrl();

                ctx.res.headers['Location'] = [uploadUrl];
                ctx.res.status = 307;

                return next ? next(ctx) : ctx;
            }
        },
        // register a worker for upload events
        worker: (handler: (file: Pick<File, 'read' | 'name'>) => Promise<void>) => {
            const readableBucket = blobBucket.for('reading');
            eventFanout.subscribe(async ctx => {
                await handler(readableBucket.file(ctx.req.json().payload.key))
            });
        },
        // Allow access to the underlying bucket
        resource: blobBucket,
    }
}