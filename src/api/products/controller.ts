import * as Hapi from "@hapi/hapi";
import * as _ from "lodash";
import * as mongoose from "mongoose";
import { IRequest } from "@utils/types/request";
import * as Helper from "@utils/helper";
import { Roles } from "@root/enum/roles";
import { IProduct, Product } from "@models/product";

export default class ProductController {
  public async create(request: IRequest, reply: Hapi.ResponseToolkit) {
    try {
      let authToken = request.headers.authorization;
      let { user, error } = Helper.verifyToken(authToken);
      if (user && user?.role == Roles.Admin) {
        const payload: IProduct = <IProduct>request.payload;
        const product: IProduct = await Product.create(payload);
        return reply
          .response({
            status: true,
            message: "Product Created Successfully",
            data: product,
            error: null,
          })
          .code(200);
      } else {
        return reply
          .response({
            status: false,
            message: "Authorization Failed",
            data: null,
            error: error,
          })
          .code(503);
      }
    } catch (err) {
      return reply
        .response({
          status: false,
          message: "Invalid Request.",
          data: null,
          error: err,
        })
        .code(400);
    }
  }
  public async get(request: IRequest, reply: Hapi.ResponseToolkit) {
    try {
      let productId = request.params.productId;
      const product: IProduct | null = await Product.findById(productId);
      return reply
        .response({
          status: true,
          message: "Products Fetched Successfully",
          data: product,
          error: null,
        })
        .code(200);
    } catch (error) {
      return reply
        .response({
          status: false,
          message: "Invalid Request.",
          data: null,
          error: error,
        })
        .code(400);
    }
  }
  public async getAll(request: IRequest, reply: Hapi.ResponseToolkit) {
    try {
      const products: IProduct[] | null = await Product.find({});
      return reply
        .response({
          status: true,
          message: "Products Fetched Successfully",
          data: products,
          error: null,
        })
        .code(200);
    } catch (error) {
      return reply
        .response({
          status: false,
          message: "Invalid Request.",
          data: null,
          error: error,
        })
        .code(400);
    }
  }
  public async update(request: IRequest, reply: Hapi.ResponseToolkit) {
    try {
      let authToken = request.headers.authorization;
      let productId = request.params.productId;
      let { user, error } = Helper.verifyToken(authToken);
      if (user && user?.role == Roles.Admin) {
        const product: IProduct | null = await Product.findOneAndUpdate(
          { _id: productId },
          { $set: request.payload },
          { new: true }
        );
        return reply
          .response({
            status: true,
            message: "Product Updated Successfully",
            data: product,
            error: null,
          })
          .code(201);
      } else {
        return reply
          .response({
            status: false,
            message: "Authorization Failed",
            data: null,
            error: error,
          })
          .code(503);
      }
    } catch (err) {
      return reply
        .response({
          status: false,
          message: "Invalid Request.",
          data: null,
          error: err,
        })
        .code(400);
    }
  }
  public async delete(request: IRequest, reply: Hapi.ResponseToolkit) {
    try {
        let authToken = request.headers.authorization;
        let productId = request.params.productId;
        let { user, error } = Helper.verifyToken(authToken);
        if (user && user?.role == Roles.Admin) {
          const product: IProduct | null = await Product.findOneAndDelete(
            { _id: productId },
          );
          return reply
            .response({
              status: true,
              message: "Product Deleted Successfully",
              data: product,
              error: null,
            })
            .code(201);
        } else {
          return reply
            .response({
              status: false,
              message: "Authorization Failed",
              data: null,
              error: error,
            })
            .code(503);
        }
      } catch (err) {
        return reply
          .response({
            status: false,
            message: "Invalid Request.",
            data: null,
            error: err,
          })
          .code(400);
      }
  }
}
