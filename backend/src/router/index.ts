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

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 */
mainRouter.use('/posts', postRouter);

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: User registered
 */
mainRouter.use('/user', userRouter);

export default mainRouter;
