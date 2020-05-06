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

module.exports = { authMiddleware };
