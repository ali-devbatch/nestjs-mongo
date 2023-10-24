import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';

async function bootstrap() {
  // Load the shared environment variables from .env
  config();

  // Set NODE_ENV based on your deployment environment
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  const app = await NestFactory.create(AppModule);
  // Enable Mongoose debugging
  mongoose.set('debug', true);
  await app.listen(3000);
}
bootstrap();
