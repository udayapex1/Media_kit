import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import kitRoutes from './routes/kit.routes';
import exportRoutes from './routes/export.routes';
import currencyRoutes from './routes/currency.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/kit', kitRoutes);
app.use('/api/kit', exportRoutes);
app.use('/api/currency', currencyRoutes);

app.use((req, res, next) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

export default app;
