import * as Hapi from "@hapi/hapi";
import * as Validate from './requestValidations';
import ProductController from './controller';
import Config from '@config/index';
import Logger from '@utils/Logger';
import IRoute from '@utils/types/route';

const controller: ProductController = new ProductController();
const routePrefix = Config.app.routePrefix
export default class AuthRoutes implements IRoute {
  // Register promise array for routes promise array
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise<void>(resolve => {
      Logger.info('🛫  Register Product Routes\n');
      server.route([
        {
          method: 'POST',
          path: `${routePrefix}/product`,
          options: {
            handler: controller.create,
            validate: Validate.create,
            description: 'Method that creates a new Guest user.',
            tags: ['api', 'Product', 'Admin'],
            auth: false,
          },
        },
        {
          method: 'PUT',
          path: `${routePrefix}/product/{productId}`,
          options: {
            handler: controller.update,
            validate: Validate.update,
            description: 'Method that update a Guest user.',
            tags: ['api', 'Product', 'Admin'],
            auth: false,
          },
        },
        {
          method: 'GET',
          path: `${routePrefix}/product`,
          options: {
            handler: controller.getAll,
            // validate: Validate.getAll,
            description: 'Method that update a Guest user.',
            tags: ['api', 'Product'],
            auth: false,
          },
        },
        {
            method: 'GET',
            path: `${routePrefix}/product/{productId}`,
            options: {
              handler: controller.get,
              validate: Validate.get,
              description: 'Method that update a Guest user.',
              tags: ['api', 'Product'],
              auth: false,
            },
          },
      ]);
      resolve();
    });
  }
}
