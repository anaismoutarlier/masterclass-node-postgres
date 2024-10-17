// Documentation: https://node-postgres.com/
import pg from "pg";

const config = {
  host: "localhost",
  port: 5432,
  database: "",
  user: "",
  password: "",
};

const client = new pg.Pool(config);

export default client;
