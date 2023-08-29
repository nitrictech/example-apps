import { bucket } from '@nitric/sdk';
import imageProcessor from '../resources/image-processor';
import sharp from 'sharp';

const archivedImages = bucket('archive-images').for('writing');

imageProcessor.worker(async file => {
    // read the file
    const fileBytes = await file.read();
    const date = new Date();

    // resize the image
    const timestampedImage = await sharp(fileBytes).composite([{
        input:{
            text: {
                text: date.toISOString(),
                font: 'terminus'
            },
        },
        gravity: 'southeast',
    }]).png().toBuffer();
    
    // write it to the new bucket
    await archivedImages.file(file.name).write(timestampedImage);
});