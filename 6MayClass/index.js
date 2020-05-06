const config = require("./config");

const cb = () => {
  console.log(`Server is up on port ${config.PORT || 3000}`);
};

require("./server")({ port: config.PORT || 3000, cb });
