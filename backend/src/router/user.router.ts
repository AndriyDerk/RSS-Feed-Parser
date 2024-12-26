import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
userRouter.post('/register', UserController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
userRouter.post('/login', UserController.login);

/**
 * @swagger
 * /users/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Invalid refresh token
 */
userRouter.post('/refresh', UserController.refresh);

/**
 * @swagger
 * /users/status:
 *   get:
 *     summary: Check user authentication status
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User is authenticated
 *       401:
 *         description: Unauthorized
 */
userRouter.get('/status', authenticate, UserController.checkAuth);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
userRouter.post('/logout', authenticate, UserController.logout);

export default userRouter;
