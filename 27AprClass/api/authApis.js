const moment = require("moment");
const os = require("os");

const signupApi = (req, res) => {
  res.send(`You signed up with username ${req.body.username}, password: ${req.body.password}, on ${moment().format()} from ${os.platform} OS`);
};

const signinApi = (req, res) => {
  const token = req.token;
  res.send({ token });
};

const blogsApi = (req, res) => {
  res.status(200).send({
    blogs: [
      { blogID: 1, data: "Blog data 1" },
      { blogID: 2, data: "Blog data 2" },
      { blogID: 3, data: "Blog data 3" },
    ],
    data: req.data,
  });
};

module.exports = { signinApi, signupApi, blogsApi };
