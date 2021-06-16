export interface Config {
  app: App;
  http: HTTP;
  database: Database;
  env: string;
  timezone: string;
}

export interface App {
  name: string;
  version: string;
}

export interface HTTP {
  enabled: boolean;
  port: number;
  gracefullTimeoutInSecond: number;
}

export interface Database {
  name: string;
  username: string;
  password: string;
  host: string;
  port: number;
  logging: boolean;
  automigrate: boolean;
  dialect: string;
}

export function getEnv<Type>(key: string, def?: any): Type {
  return process.env[key] || def;
}
