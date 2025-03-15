import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './Routes/UserRoutes.js'
import connect_db from './config/db.js' ;

const app = express();
const port = process.env.PORT;
connect_db();

app.use(cors({
  origin : process.env.FRONTEND_URL
}));
app.use(cookieParser())
app.use(express.json())
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log('server is running on port : ', port)
})
