import * as Hapi from "@hapi/hapi";
import * as _ from "lodash";
import * as mongoose from "mongoose";
import { IRequest } from "@utils/types/request";
import * as Helper from "@utils/helper";
import { IOrder, Order } from "@models/order";
import { IUser, User } from "@models/user";
import { Roles } from "@root/enum/roles";

export default class UserController {
  public async create(request: IRequest, reply: Hapi.ResponseToolkit) {
    try {
      let authToken = request.headers.authorization;
      let { user, error } = Helper.verifyToken(authToken);
      if (user && (user?.role === Roles.Admin || user?.role === Roles.User)) {
        const payload = <IOrder>request.payload
        payload.user = user._id
        const order: IOrder | null = await Order.create(payload)
        await User.updateOne({_id: user._id},{"$push":{ orderHistory: order._id} }) 
        return reply
          .response({
            status: true,
            message: "Order Updated Successfully",
            data: order,
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

  public async getAll(request: IRequest, reply: Hapi.ResponseToolkit) {
    try {
      let authToken = request.headers.authorization;
      let { user, error } = Helper.verifyToken(authToken);
      if (user && (user?.role === Roles.Admin || user?.role === Roles.User)) {
        const orderedUser: IUser| null = await User.findById({_id: user._id}).populate("orderHistory") 
        console.log(orderedUser)
        return reply
          .response({
            status: true,
            message: "User Updated Successfully",
            data: orderedUser?.orderHistory,
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

}
