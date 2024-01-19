const mysql = require("mysql2/promise");
require("dotenv").config();
const pool = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: 3306,
});

// pool.connect().then(() => console.log("DB Connected!"));

module.exports = pool;
