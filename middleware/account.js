const jwt = require('jsonwebtoken');
const accountVerify = {
  verifyToken: (req, res, next) => {
    const token = req.cookies.access_token;
    if (token) {
      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          console.log(err);
        }
        console.log(user.username);
        res.locals.username = user.username;
        req.body.user = user;
        next();
      });
    } else {
      console.log('da dang xuat');
      next();
    }
  },
};
module.exports = accountVerify;
