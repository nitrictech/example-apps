import { bucket } from '@nitric/sdk';
import sharp from 'sharp';
import imageProcessor from '../resources/image-processor';

const optimizedImages = bucket('resized-images').for('writing');

imageProcessor.worker(async file => {
    // read the file
    const fileBytes = await file.read();

    // resize the image
    const imageBuffer = await sharp(fileBytes).resize(128, 128).toBuffer();
    
    // write it to the new bucket
    await optimizedImages.file(file.name).write(imageBuffer);
});