require("dotenv").config();

console.log(`MONGO_URI: ${process.env.MONGO_URI}
NODE_ENV: ${process.env.NODE_ENV}
PORT: ${process.env.PORT}`);

module.exports = {
  PORT: process.env.PORT || 3001,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017",
  NODE_ENV: process.env.NODE_ENV || "development",
};
