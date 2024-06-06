import mongoose from 'mongoose';
import { env } from '../utils/env.js';
import dotenv from 'dotenv';

dotenv.config();

export const initMongoConnection  = async () => {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');
 console.log(`mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`);
    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
