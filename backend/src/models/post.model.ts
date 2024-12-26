import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IPost extends Document {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPlainPost {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    id: { type: String, default: uuidv4().replace(/-/g, '').toUpperCase() , unique: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    pubDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model<IPost>('Post', PostSchema);
