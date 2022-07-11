import express from 'express';
import {
  addBillController,
  getBillsController,
} from '../controllers/billController.js';

const billRouter = express.Router();

billRouter.post('/addbills', addBillController);
billRouter.get('/getbills', getBillsController);

export default billRouter;
