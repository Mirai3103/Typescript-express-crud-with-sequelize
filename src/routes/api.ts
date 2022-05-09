import { Router } from 'express';
import userRouter from './user-router';
import postRouter from "./post-router";


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/users', userRouter);
baseRouter.use('/posts', postRouter);
// Export default.
export default baseRouter;
