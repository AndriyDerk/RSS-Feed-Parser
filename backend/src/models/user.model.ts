import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
    _id: any;
    username: string;
    password: string;
    refreshToken?: string; 
  }
  
  const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
  });
  
  export const User = mongoose.model<IUser>('User', UserSchema);
  