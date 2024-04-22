const jwt = require('jsonwebtoken');
const username = {
  name: (req, res, next) => {
    const token = req.cookies.access_token;
    if (token) {
      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          console.log(err);
        }
        res.locals.username = user.username;
      });
    }
    next();
  },
};
module.exports = username;
