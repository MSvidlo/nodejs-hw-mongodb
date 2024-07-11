import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandlers.js';
import { errorHandler } from './middlewares/errorHandler.js';
import contactsRouter from './routers/contacts.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

dotenv.config();

const PORT = Number(env('PORT', '3007'));

export const setupServer = () => {
  const app = express();

  // Парсинг cookies
  app.use(cookieParser());

  // Парсинг JSON
  app.use(express.json());

  // Дозвіл на CORS
  app.use(cors());

  // Логування запитів
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  // Головний маршрут
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  // Використання маршрутизаторів
  app.use(router);
  app.use('/contacts', contactsRouter);
app.use('/uploads', express.static(UPLOAD_DIR));
  // Обробник помилок
  app.use(errorHandler);

  // Обробник маршруту 404
  app.use('*', notFoundHandler);

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
