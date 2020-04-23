const loginApi = (req, res) => {
  res.send(`You requested at ${req.route.path} .`);
  console.log("Login API");
};

const signupApi = (req, res) => {
  const { username, password } = req.body;
  res.send(`username: ${username}, password: ${password}`);
  console.log("signup API");
};

module.exports = { signupApi, loginApi };
