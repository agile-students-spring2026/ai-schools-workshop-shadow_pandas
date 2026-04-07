import express from 'express';
import morgan from 'morgan';
import districtRoutes from './routes/districtRoutes.js';

const app = express();

app.use(morgan('dev')); // logs every request
app.use(express.json());
app.use('/districts', districtRoutes);

export default app;