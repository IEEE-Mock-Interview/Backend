require("dotenv").config();
const config = {
  db: {
    user: process.env.USER,
    host: process.env.HOST,
    port: process.env.DBPORT,
    dbName: process.env.DATABASE,
    password: process.env.PASSWORD,
  },
};

module.exports = config;
