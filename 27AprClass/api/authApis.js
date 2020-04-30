const jwt = require("jsonwebtoken");

const signupApi = (req, res) => {
  console.log("signupApi");
  res.send("Signed up...");
};

const signinApi = (req, res) => {
  console.log("signinApi");
  const token = req.token;
  if (token) {
    jwt.verify()
  }
  console.log(token);
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
