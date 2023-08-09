import { http } from '@nitric/sdk';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function listen(port: number) {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  console.log(`Application listening on ${port}`);
}

http(listen);
