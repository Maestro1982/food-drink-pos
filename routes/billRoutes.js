import express from 'express';
import { addBillController } from '../controllers/billController.js';

const billRouter = express.Router();

billRouter.post('/addbills', addBillController);

export default billRouter;
