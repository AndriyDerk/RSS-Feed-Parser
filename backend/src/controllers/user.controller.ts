import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import { internalServerError, notFoundError, forbiddenServerError } from '../utils/error.handler';

class UserController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await UserService.createUser(username, password);
      res.status(201).json({ message: 'User created', user });
    } catch (error: any) {
      if (error.message === 'User already exists') {
        forbiddenServerError(res, 'User already exists');
      } else {
        internalServerError(res, 'Failed to register user');
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const tokens = await UserService.login(username, password);
      if (!tokens) {
        forbiddenServerError(res, 'Invalid credentials');
        return;
      }

      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, 
      });

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ message: 'Logged in successfully' });
    } catch (error) {
      internalServerError(res, 'Failed to login');
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        forbiddenServerError(res, 'No refresh token provided');
        return;
      }

      const accessToken = await UserService.refreshAccessToken(refreshToken);
      if (!accessToken) {
        forbiddenServerError(res, 'Invalid refresh token');
        return;
      }

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, 
      });

      res.json({ message: 'Access token refreshed' });
    } catch (error) {
      internalServerError(res, 'Failed to refresh token');
    }
  }

  async checkAuth(req: Request, res: Response): Promise<void> {
    try {
      const accessToken = req.cookies.accessToken;  
      console.log('ok1');

      if (!accessToken) {
        forbiddenServerError(res, 'Access token missing');
        return;
      }

      const user = UserService.verifyAccessToken(accessToken);  
      console.log('ok2');
      if (!user) {
        forbiddenServerError(res, 'Invalid token');
        return;
      }
      console.log('ok3');
      res.status(200).json({ isAuthenticated: true, user });
    } catch (error) {
      internalServerError(res, 'Failed to check authentication status');
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
    
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
  
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
  
      res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
      internalServerError(res, 'Failed to logout');
    }
  }

}

export default new UserController();
