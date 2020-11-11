const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.HOST,
  user: 'root', //process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  //   port: process.env.DB_PORT,
  //   insecureAuth: true,
});

module.exports = db;
