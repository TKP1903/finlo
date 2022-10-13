const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootuser@123",
  database: "finlo",
});
module.exports = db;
