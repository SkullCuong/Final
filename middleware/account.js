const jwt = require('jsonwebtoken');
const accountVerify = {
  verifyToken: (req, res, next) => {
    const token = req.cookies.access_token;
    if (token) {
      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          console.log(err);
        }
        res.locals.username = user.username;
        req.body.user = user;
        next();
      });
    } else {
      res.redirect('/user/login');
    }
  },
};
module.exports = accountVerify;
