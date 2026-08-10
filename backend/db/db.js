const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.CONNECTIONSTRING,
  ssl: { rejectUnauthorized: false },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  maxUses: 7500,
});

module.exports = pool;
