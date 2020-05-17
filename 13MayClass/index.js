const config = require("./config");

const cb = () => {
  console.log(`Server is up on port ${config.PORT || 3001}`);
};

require("./db")({ MONGO_URI: config.MONGO_URI });
require("./app")({ port: config.PORT || 3001, cb });
