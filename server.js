import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import billRouter from './routes/billRoutes.js';

dotenv.config();

//Connect with MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Routes
app.use('/api/products/', productRouter);
app.use('/api/users/', userRouter);
app.use('/api/bills/', billRouter);

//Create Port
const PORT = process.env.PORT || 5000;

//Listen
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
