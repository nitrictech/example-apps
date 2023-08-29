import { api } from '@nitric/sdk';
import imageProcessor from '../resources/image-processor';

const uploadApi = api('uploads');

uploadApi.put('/upload/image', imageProcessor.uploadFileMiddleware());

// let this function handle the image upload triggers
imageProcessor.startListener();