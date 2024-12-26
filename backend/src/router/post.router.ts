import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { authenticate } from '../middlewares/auth.middleware';

const postRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API for managing posts
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts
 *       500:
 *         description: Internal server error
 */
postRouter.get('/', PostController.getPosts);

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Search posts
 *     tags: [Posts]
 *     parameters:
 *       - name: q
 *         in: query
 *         required: false
 *         description: Query string for searching posts
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of posts per page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of posts matching the query
 *       400:
 *         description: Invalid query parameters
 */
postRouter.get('/search', PostController.searchPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested post
 *       404:
 *         description: Post not found
 */
postRouter.get('/:id', PostController.getPost);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               pub_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
postRouter.post('/', authenticate, PostController.createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */
postRouter.put('/:id', authenticate, PostController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */
postRouter.delete('/:id', authenticate, PostController.deletePost);

export default postRouter;
