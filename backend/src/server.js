import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './routes/index.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use("api/users", userRoutes);

app.use('/api', router);

app.listen(process.env.PORT || 4000, ()=> {
    console.log('Servidor corriendo en puerto', process.env.PORT || 4000);
});