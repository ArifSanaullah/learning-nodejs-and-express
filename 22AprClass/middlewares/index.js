const loginMiddleware = (req, res, next) => {
  console.log("login middleware");
  next();
};

const signupMiddleware = (req, res, next) => {
  const { username, password } = req.body;

  console.log("signup middleware.");
  if (!username || !password) {
    res.send("Must provide username and password");
  }
  next();
};

module.exports = { loginMiddleware, signupMiddleware };
