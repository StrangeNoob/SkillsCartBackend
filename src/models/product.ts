import * as Mongoose from "mongoose";

export interface IProduct extends Mongoose.Document {
  _id: string | null | any;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: Date | null;
  updateAt: Date | null;
}

export const ProductSchema = new Mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    image: String,
  },
  {
    timestamps: true
  }
);

export const Product = Mongoose.model<IProduct>("Product", ProductSchema)
