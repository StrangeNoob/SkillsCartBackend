import * as Hapi from "@hapi/hapi";
import * as Validate from './requestValidations';
import Controller from './controller';
import Config from '@config/index';
import Logger from '@utils/logger';
import IRoute from '@utils/types/route';

const controller: Controller = new Controller();
const routePrefix = Config.app.routePrefix

export default class AuthRoutes implements IRoute {
    // Register promise array for routes promise array
    public async register(server: Hapi.Server): Promise<any> {
      return new Promise<void>(resolve => {
        Logger.info('🛫  Register Order Routes\n');
        server.route([
          {
            method: 'POST',
            path: `${routePrefix}/orders`,
            options: {
              handler: controller.create,
              validate: Validate.create,
              description: 'Method that creates Orders for user.',
              tags: ['api','User'],
              auth: false,
            },
          },
          {
            method: 'GET',
            path: `${routePrefix}/orders`,
            options: {
              handler: controller.getAll,
              validate: Validate.getAll,
              description: 'Method that get All Orders of user.',
              tags: ['api', 'User'],
              auth: false,
            },
          },
          
        ]);
        resolve();
      });
    }
  }