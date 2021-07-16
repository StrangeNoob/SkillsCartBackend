import * as Hapi from "@hapi/hapi";
import * as Validate from './requestValidations';
import Controller from './controller';
import Config from '@config/index';
import Logger from '@utils/Logger';
import IRoute from '@utils/types/route';

const controller: Controller = new Controller();
const routePrefix = Config.app.routePrefix

export default class AuthRoutes implements IRoute {
    // Register promise array for routes promise array
    public async register(server: Hapi.Server): Promise<any> {
      return new Promise<void>(resolve => {
        Logger.info('🛫  Register User Routes\n');
        server.route([
          {
            method: 'POST',
            path: `${routePrefix}/user`,
            options: {
              handler: controller.create,
              validate: Validate.create,
              description: 'Method that creates a new Guest user.',
              tags: ['api','User'],
              auth: false,
            },
          },
          {
            method: 'GET',
            path: `${routePrefix}/user/all`,
            options: {
              handler: controller.getAll,
              validate: Validate.getAll,
              description: 'Method that update a Guest user.',
              tags: ['api', 'User'],
              auth: false,
            },
          },
          
        ]);
        resolve();
      });
    }
  }