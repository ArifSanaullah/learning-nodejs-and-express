const healthApi = (req, res) => {
  res.send({
    platform: process.platform,
    uptime: process.uptime(),
    status: 200,
    "content-type": req.headers["content-type"],
    "user-agent": req.headers["user-agent"],
    host: req.headers.host,
  });
};

signInApi = (req, res) => {
  res.send({ query: req.query, params: req.params, user: req.user });
};

module.exports = { healthApi, signInApi };
