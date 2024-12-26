import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import { connectDB, closeDB } from './db/db.connection';
import router from './router/index';
import RSSCron from './cron/rss.cron';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import service from './services/rss.service';

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', '*'], 
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(router);
RSSCron();

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Swagger docs on http://localhost:${PORT}/api-docs`);
    });

    process.on('SIGINT', async () => {
      console.log('Shutting down server...');
      await closeDB();
      process.exit(0);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();

(async ()=> {
  await service.saveParsed('https://lifehacker.com/feed/rss');
})()