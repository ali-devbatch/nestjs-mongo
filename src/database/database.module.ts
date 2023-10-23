import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose, { SchemaOptions } from 'mongoose'; // Import the SchemaOptions type

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const uri = process.env.MONGODB_URI; // Your MongoDB URI
        // const uri = 'mongodb://127.0.0.1:27017/DatabaseName'; // Your MongoDB URI
        const mongooseOptions: SchemaOptions = {
          // useNewUrlParser: true,
        };
        // Attempt to establish a connection and log the status
        try {
          await mongoose.connect(uri, mongooseOptions);
          console.log('Mongoose connection established successfully.');
        } catch (error) {
          console.log(`Mongoose connection error: ${error}`);
        }

        return {
          uri,
          ...mongooseOptions,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
