import { createPool } from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_USER } from "../config";

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  namedPlaceholders: true,
  decimalNumbers: true,
});
