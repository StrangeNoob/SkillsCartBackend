import 'module-alias/register';
import * as Hapi from "@hapi/hapi";
import "dotenv/config"
import Config from "@config/index"
import Router from "@api/routes"
import Plugin from "@utils/plugins"
import Logger from "@utils/Logger"


// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
  console.error(`uncaughtException 1 ${error.message}`)
})

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
  console.error(`unhandledRejection 2 ${reason}`)
})

const start = async () => {
  const host = Config.app.host
  const port = Config.app.port
  const routePrefix = Config.app.routePrefix

  const app = new Hapi.Server({ port, host })

  // All register function to register all plugins
  await Plugin.registerAll(app)

  // call registerRoutes function for register routes
  await Router.registerRoutes(app)

  app.start().then((server: any) => {
    Logger.info(`🚀  Server started at http://${host}:${port} 🚀`)
    Logger.info(`🚀  REST API Server started at http://${host}:${port}${routePrefix} 🚀`)
    Logger.info(`🚀  Swagger docs at http://${host}:${port}/documentation 🚀`)
  })
}

start()