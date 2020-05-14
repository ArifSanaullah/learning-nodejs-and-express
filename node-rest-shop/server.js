const http = require("http");
const config = require("./config");
const app = require("./app");

const port = config.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
