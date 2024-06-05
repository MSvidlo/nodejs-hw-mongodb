import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { getAllContacts, getContactsById } from './services/contacts.js';
import mongoose from 'mongoose';

dotenv.config();
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: "success",
        data: contacts,
        message: "Successfully found contacts!"
      });
    } catch (error) {
      console.error('Error fetching contacts:', error.message);
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactsById(contactId);
      if (contact) {
        res.status(200).json({
          status: 'success',
          message: `Successfully found contact with id ${contactId}!`,
          data: contact,
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: `Contact with id ${contactId} not found.`,
        });
      }
    } catch (error) {
      console.error('Error fetching contact by ID:', error.message);
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  const MONGODB_USER = process.env.MONGODB_USER;
  const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
  const MONGODB_URL = process.env.DB_NAME;

  const connectionString = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/?retryWrites=true&w=majority`;

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Таймаут підключення
  }).then(() => {
    console.log('Connected to the database');
  }).catch((error) => {
    console.error('Database connection error:', error.message);
  });
};
