const mongoose = require("mongoose");

module.exports = ({ MONGO_URI }) => {
  mongoose
    .connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((e) => {
      console.log("error connecting to mongodb", e.message);
    });
};
