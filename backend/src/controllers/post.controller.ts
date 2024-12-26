import { Request, Response } from 'express';
import PostService from '../services/post.service';
import { notFoundError, internalServerError } from '../utils/error.handler';

class PostController {

  searchPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const searchTerm = req.query.q as string || ''; 
      const from = req.query.from ? new Date(req.query.from as string) : null; 
      const to = req.query.to ? new Date(req.query.to as string) : null; 
      const page = parseInt(req.query.page as string, 10) || 1; 
      const limit = parseInt(req.query.limit as string, 10) || 10; 
      const order = (req.query.order as 'asc' | 'desc') || 'desc'; 

      const { posts, totalPages } = await PostService.searchPosts(searchTerm, from, to, page, limit, order);
      res.json({ posts, totalPages });
    } catch (error) {
      internalServerError(res, 'Failed to search posts');
    }
  };

  getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const posts = await PostService.getAllPosts();
      if (posts.length === 0) {
        notFoundError(res, 'No posts found');
        return;
      }
      res.json(posts);
    } catch (error) {
      internalServerError(res);
    }
  };

  getPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const post = await PostService.getPostById(req.params.id);
      if (!post) {
        notFoundError(res, 'Post not found');
        return;
      }
      res.json(post);
    } catch (error) {
      internalServerError(res);
    }
  };

  createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const newPost = await PostService.createPost(req.body);
      res.status(201).json(newPost);
    } catch (error) {
      internalServerError(res, 'Error creating post');
    }
  };

  updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedPost = await PostService.updatePost(req.params.id, req.body);
      if (!updatedPost) {
        notFoundError(res, 'Post not found');
        return;
      }
      res.json(updatedPost);
    } catch (error) {
      internalServerError(res, 'Error updating post');
    }
  };

  deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedPost = await PostService.deletePost(req.params.id);
      if (!deletedPost) {
        notFoundError(res, 'Post not found');
        return;
      }
      res.json(deletedPost);
    } catch (error) {
      internalServerError(res, 'Error deleting post');
    }
  };
}

export default new PostController();
