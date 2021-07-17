import * as Hapi from "@hapi/hapi";
import * as _ from "lodash";
import * as mongoose from "mongoose";
import { IRequest } from "@utils/types/request";
import * as Helper from "@utils/helper";
import { IUser, User } from "@models/user";
import { Roles } from "@root/enum/roles";

export default class UserController {
  public async login(request: IRequest, reply: Hapi.ResponseToolkit) {
    try {
      let firebaseUid: string = request.payload.firebaseUid;
      const currentUser: IUser | null = await User.findOne({
        firebaseUid: firebaseUid,
      });
      if (currentUser) {
        let token = Helper.createJwtAuthToken(currentUser);
        return reply
          .response({
            status: true,
            message: "Logged In Successfully",
            data: currentUser,
            token: token,
            error: null,
          })
          .code(200);
      } else {
        const payload: IUser = <IUser>{ ...request.payload, role: Roles.User };
        const user: IUser = await User.create(payload);
        let token = Helper.createJwtAuthToken(user);
        return reply
          .response({
            status: true,
            message: "Account Created Successfully",
            data: user,
            token: token,
            error: null,
          })
          .code(200);
      }
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
  public async get(request: IRequest, reply: Hapi.ResponseToolkit) {
    try {
      let authToken = request.headers.authorization;
      let { user, error } = Helper.verifyToken(authToken);
      if (user && (user?.role === Roles.Admin || user.role === Roles.User)) {
        const currentUser: IUser | null = await User.findById(user._id);
        return reply
          .response({
            status: true,
            message: "User Fetched Successfully",
            data: currentUser,
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
      let authToken = request.headers.authorization;
      let { user, error } = Helper.verifyToken(authToken);
      if (user && user?.role === Roles.Admin) {
        const currentUser: IUser[] | null = await User.find({});
        return reply
          .response({
            status: true,
            message: "User Updated Successfully",
            data: currentUser,
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
      let { user, error } = Helper.verifyToken(authToken);
      if (user && (user?.role === Roles.Admin || user.role === Roles.User)) {
        const currentUser: IUser | null = await User.findOneAndUpdate({_id:user._id},{$set: request.payload},{new:true});
        return reply
          .response({
            status: true,
            message: "User Updated Successfully",
            data: currentUser,
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
  public async delete(request: IRequest, reply: Hapi.ResponseToolkit) {}
}
