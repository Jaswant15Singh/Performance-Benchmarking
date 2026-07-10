const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  maxUses: 7500,
});

// pool.on("connect", async (client) => {
//   await client.query("SET search_path TO my_schema");
// });


module.exports = pool;
