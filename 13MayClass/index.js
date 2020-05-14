const config = require("./config");

const cb = () => {
  console.log(`Server is up on port ${config.PORT || 3001}`);
};

require("./db")({ MONGO_URI: config.MONGO_URI });
require("./server")({ port: config.PORT || 3001, cb });
