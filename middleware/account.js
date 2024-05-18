const jwt = require('jsonwebtoken');
const accountVerify = {
  verifyToken: (req, res, next) => {
    const token = req.cookies.access_token;
    if (token) {
      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          console.log(err);
        }
        res.locals.username = user.id;
        res.locals.role = user.roleid == 1;
        req.body.user = user;
        next();
      });
    } else {
      res.redirect('/user/login');
    }
  },
  isAdmin: (req, res, next) => {
    const userRole = res.locals.role;
    console.log(userRole);
    if (userRole) {
      next();
    } else {
      res.redirect('/room');
    }
  },
};
module.exports = accountVerify;
