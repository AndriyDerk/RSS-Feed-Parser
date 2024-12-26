import { User, IUser } from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {

    private SECRET_KEY: string;
    
    constructor() {
      this.SECRET_KEY = process.env.SECRET_KEY || '';
      if (!this.SECRET_KEY) {
        throw new Error('SECRET_KEY is not defined in environment variables');
      }
    }

    async createUser(username: string, password: string): Promise<IUser> {
      const existingUser = await this.getUserByUsername(username);
      if (existingUser) {
        throw new Error('User already exists');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      return await user.save();
    }
  
    async getUserByUsername(username: string): Promise<IUser | null> {
      return await User.findOne({ username });
    }
  
    async saveRefreshToken(username: string, refreshToken: string): Promise<void> {
      await User.updateOne({ username }, { refreshToken });
    }
  
    async getUserByRefreshToken(refreshToken: string): Promise<IUser | null> {
      return await User.findOne({ refreshToken });
    }
  
    async login(username: string, password: string): Promise<{ accessToken: string; refreshToken: string } | null> {
      const user = await this.getUserByUsername(username);
      if (!user) {
        return null;
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null;
      }
  
      const accessToken = jwt.sign({ id: user._id, username: user.username }, this.SECRET_KEY, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ id: user._id, username: user.username }, this.SECRET_KEY, { expiresIn: '7d' });
  
      await this.saveRefreshToken(username, refreshToken);
  
      return { accessToken, refreshToken };
    }
  
    async refreshAccessToken(refreshToken: string): Promise<string | null> {
      try {
        const decoded = jwt.verify(refreshToken, this.SECRET_KEY);
        const user = await this.getUserByRefreshToken(refreshToken);
        if (!user) {
          return null;
        }
  
        const accessToken = jwt.sign({ id: user._id, username: user.username }, this.SECRET_KEY, { expiresIn: '15m' });
        return accessToken;
      } catch (error) {
        return null;
      }
    }

    verifyAccessToken(token: string): Pick<IUser, '_id' | 'username'> | null {
      try {
        const decoded = jwt.verify(token, this.SECRET_KEY) as Pick<IUser, '_id' | 'username'>;
        return decoded;
      } catch (error) {
        return null;
      }
    }

    async revokeRefreshToken(username: string): Promise<void> {
      await User.updateOne({ username }, { refreshToken: null });
    }

  }
  

export default new UserService();