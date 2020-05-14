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
  if (!name || !username || !email || !password) {
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

const updateUserMiddleware = (req, res, next) => {
  const { newPassword, username, password } = req.body;
  if (!username || !newPassword || !password) {
    res
      .status(400)
      .send({ error: "must provide username, password and new password" });
  }
  req.user = { username, password, newPassword };
  next();
};

const deleteUserMiddleware = (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({ error: "must provide id" });
  }
  req.id = id;
  next();
};

module.exports = {
  authMiddleware,
  createUserMiddleware,
  getUserMiddleware,
  updateUserMiddleware,
  deleteUserMiddleware,
};
