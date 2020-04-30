const express = require("express");
const authRoutes = require("./routes/authRoutes");
const config = require("./config");

const app = express();
const port = config.PORT || 3000;

app.use(express.json());
app.use(authRoutes);

app.get("/", (req, res) => {
  res.send("You requested at / route.");
});

app.listen(port, () => {
  console.log(`server is up at port ${port}...`);
});
