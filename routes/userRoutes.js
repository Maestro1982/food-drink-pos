import express from 'express';
import {
  loginController,
  registerController,
} from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/login', loginController);

userRoutes.post('/register', registerController);

export default userRoutes;
