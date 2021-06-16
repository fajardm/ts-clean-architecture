import { Sequelize, Dialect } from "sequelize";
import conf from "../../../config";

export default new Sequelize(
  conf.database.name,
  conf.database.username,
  conf.database.password,
  {
    host: conf.database.host,
    port: conf.database.port,
    dialect: conf.database.dialect as Dialect,
    logging: conf.database.logging,
  }
);
