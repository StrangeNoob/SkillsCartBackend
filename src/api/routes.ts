import * as Hapi from "@hapi/hapi";
import ProductRoutes from "./products/routes";
import UserRoutes from "./user/routes"

export default class Router {
  // Fetch all routes and register then with server with call register method
  public static async registerRoutes(server: Hapi.Server): Promise<any> {
    await new ProductRoutes().register(server);
    await new UserRoutes().register(server);
  }
}