import session from "express-session";
import config from "../config/main.js";
import MySQLStore from "express-mysql-session";
export function createStore() {
  const configuration = {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
  };
  return new MySQLStore(configuration);
}
