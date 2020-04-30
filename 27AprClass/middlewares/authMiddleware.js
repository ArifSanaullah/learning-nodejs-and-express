const jwt = require("jsonwebtoken");

const users = [
  { username: "arif", password: "123" },
  { username: "abid", password: "123" },
];

const validationMiddleware = (req, res, next) => {
  console.log("validationMiddleware");
  const { username, password } = req.body;
  if (username && password) {
    return next();
  }
  res.send("You must be logged in");
};

const signupMiddleware = (req, res, next) => {
  console.log("singupMiddleware");
  const { username } = req.body;
  const userExists = users.some((user) => user.username === username);
  if (!userExists) {
    const token = jwt.sign({ username }, "mySecret");
    req.token = token;
    return next();
  }
  res.send(`username ${username} already exists. Try a different one.`);
};

const signinMiddleware = (req, res, next) => {
  console.log("signInMiddleware");
  const { username, password } = req.body;
  const userExists = users.some(
    (user) => user.username === username && user.password === password
  );

  if (userExists) {
    const token = jwt.sign({ username }, "mySecret");
    req.token = token;
    return next();
  }
  res.status(403).send("Invalid username or password");
};

const accessMiddleware = (req, res, next) => {
  console.log("accessMiddleware");
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "mySecret", (err, data) => {
      if (err) {
        res.send({ error: "You must be logged in" });
      }
      req.data = data;
      next();
    });
  }
  res.send({ error: "You must be logged in" });
};

module.exports = {
  signinMiddleware,
  validationMiddleware,
  signupMiddleware,
  accessMiddleware,
};
