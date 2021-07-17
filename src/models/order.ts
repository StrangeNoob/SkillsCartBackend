import * as Mongoose from "mongoose";
import { IUser } from "./user";

export interface IOrder extends Mongoose.Document {
  _id: string | null | any;
  products: [{
    product: object;
    quanity: number;
  }];
  user: string | IUser;
  createdAt: Date | null;
  updateAt: Date | null;
}

export const OrderSchema = new Mongoose.Schema(
  {
    products: [{
        product:{
            type: Object,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
        }
    }],
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Order = Mongoose.model<IOrder>("Order",OrderSchema)