// db.js
import {Pool} from 'pg';

let conn: Pool | undefined = undefined;

if (!conn) {
  conn = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    database: process.env.DB_NAME,
  });
}
export {conn};
export default conn;
