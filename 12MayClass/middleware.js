const authMiddleware = (req, res, next) => {
  const users = [
    {
      name: "arif",
      userId: "123",
    },
    {
      name: "abid",
      userId: "234",
    },
  ];

  if (req.params) {
    console.log(req.params);
    const foundUser = users.find(
      (user) =>
        user[req.params.name] === req.params.name &&
        user[req.params.id] === req.params.id
    );
    req.user = foundUser;
    next();
  } else {
    res.send("must provide params");
  }
};

const createUserMiddleware = (req, res, next) => {
  const { name, username, email, password } = req.body;
  if (!name && !username && !email && !password) {
    res.send({ error: "must provide name, username, email and a password" });
  }
  req.user = { name, username, email, password };
  next();
};

const getUserMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.send({ error: "must provide username" });
  }
  req.name = name;
  next();
};

module.exports = { authMiddleware, createUserMiddleware, getUserMiddleware };
