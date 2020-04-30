const jwt = require("jsonwebtoken");
const validator = require("validator");

const users = [
  { username: "arif", password: "123" },
  { username: "abid", password: "123" },
];

const validationMiddleware = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    if (validator.default.isLowercase(username)) {
      return next();
    } 
    res.send({error: "username must be lowercased"})
  }
  res.send("You must be logged in");
};

const signupMiddleware = (req, res, next) => {
  const { username } = req.body;
  const userExists = users.some((user) => user.username === username);
  if (!userExists) {
    return next();
  }
  res.send(`username ${username} already exists. Try a different one.`);
};

const signinMiddleware = (req, res, next) => {
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
