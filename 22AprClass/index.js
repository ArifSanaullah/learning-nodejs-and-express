const PORT = process.env.PORT || 3000;

const cb = () => {
  console.log(`Server started at ${PORT} port.`);
};

require("./server")({ PORT, cb });
