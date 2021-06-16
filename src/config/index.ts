import dotenv from "dotenv";
import { getEnv, Config } from "./types";

dotenv.config();

const conf: Config = {
  app: {
    name: getEnv<string>("APP_NAME", "app"),
    version: getEnv<string>("APP_VERSION", "1.0"),
  },
  http: {
    enabled: getEnv<boolean>("HTTP_ENABLED", true),
    port: getEnv<number>("HTTP_PORT", 9010),
    gracefullTimeoutInSecond: getEnv<number>(
      "HTTP_GRACEFULL_TIMEOUT_IN_SECOND",
      10
    ),
  },
  database: {
    name: getEnv<string>("DATABASE_NAME"),
    username: getEnv<string>("DATABASE_USER"),
    password: getEnv<string>("DATABASE_PASSWORD"),
    host: getEnv<string>("DATABASE_HOST", "localhost"),
    port: getEnv<number>("DATABASE_PORT", 3306),
    logging: getEnv<boolean>("DATABASE_LOGGING", true),
    automigrate: getEnv<boolean>("DATABASE_AUTOMIGRATE", true),
    dialect: getEnv<string>("DATABASE_DIALECT", "mysql"),
  },
  env: getEnv<string>("NODE_ENV", "development"),
  timezone: getEnv<string>("TIMEZONE", "Asia/Jakarta"),
};

export default conf;
