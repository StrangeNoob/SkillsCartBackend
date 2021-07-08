import * as Mongoose from "mongoose";

export interface IUser extends Mongoose.Document {
  _id: string | null | any;
  firebaseUid: string;
  name: string;
  email: string;
  photoUrl: string|null;
  role: string|null;
  orderHistory: string[];
  createdAt: Date | null;
  updateAt: Date | null;
}

export const UserSchema = new Mongoose.Schema(
  {
    name: String,
    email: Number,
    firebaseUid: String,
    photoUrl: { type: String },
    role: {type: String},
    orderHistory: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const User = Mongoose.model<IUser>("User",UserSchema)