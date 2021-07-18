const NODE_ENV = process.env.NODE_ENV || "development";

const production = {
  environment: "production",
  app: {
    port: process.env.PORT || 4003,
    host: process.env.HOST || 'localhost',
    jwtSecret: process.env.JWT_SECRET,
    verifyOptions: { algorithms: ["HS256"] },
    jwtExpiration: "20 day",
    routePrefix: "/api"
  },
  db: {
    mongoUrl: process.env.MONGO_DB_URL || "mongodb://localhost:27017/ps-server-prod"
  }
}
const development = {
  environment: "development",
  app: {
    port: process.env.PORT || 4003,
    host: process.env.HOST || 'localhost',
    jwtSecret: process.env.JWT_SECRET || "9nvuNxXYIxjGBVGs6YUQ",
    verifyOptions: { algorithms: ["HS256"] },
    jwtExpiration: "60 day",
    routePrefix: "/api"
  },
  db: {
    mongoUrl: process.env.MONGO_DB_URL || "mongodb://localhost:27017/ps-server-dev"
  }
}

const test = {
  environment: "test",
  app: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5002,
    jwtSecret: "9nvuNxXYIxjGBVGs6YUQ",
    jwtExpiration: "20 day",
    routePrefix: "/api"
  },
  db: {
    url: process.env.TEST_MONGODB_URL || "mongodb://localhost:27017/ps-server-test"
  }
}

const config: any = { production, development, test  }

export default config[NODE_ENV]