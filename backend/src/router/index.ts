import { Router } from 'express';
import postRouter from './post.router';
import userRouter from './user.router';

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management and authentication
 *   - name: Posts
 *     description: Post management
 */

const mainRouter = Router();

mainRouter.use('/posts', postRouter);

mainRouter.use('/user', userRouter);

export default mainRouter;
