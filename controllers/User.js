'use strict';
const db = require('../models/index');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');
const { v4: uuidv4 } = require('uuid');
const { use } = require('../routes/UserRoute');
const { where } = require('sequelize');

class User {
  constructor(
    name,
    email,
    phone,
    sex,
    password,
    dob,
    active_token,
    address = 'none',
    image_url = 'none',
    isActive = 0,
    RoleId = 2
  ) {
    this.name = name;
    this.email = email;
    this.dob = dob;
    this.sex = sex;
    this.password = password;
    this.phone = phone;
    this.address = address;
    this.image_url = image_url;
    this.isActive = isActive;
    this.RoleId = RoleId;
    this.active_token = active_token;
  }

  static async signUpRender(req, res) {
    res.render('User/signUp');
  }

  static async signUp(req, res) {
    const { name, email, phone, sex, password, dob } = req.body;
    const hashPassword = await User.hashPassword(password);
    const active_token = User.generate_Token();
    const user = new User(
      name,
      email,
      phone,
      sex,
      hashPassword,
      dob,
      active_token
    );
    const htmlBody = `
    <html>
    <head>
        <title>Account Confirmation</title>
    </head>
    <body>
        <h1>Account Confirmation</h1>
        <p>Please click the following link to confirm your account:</p>
        <a href="http://localhost:3000/user/confirm?token=${active_token}">Confirm Account</a>
    </body>
    </html>`;
    try {
      await db.User.create(user);
      await sendMail
        .sendMail('Account Confirmation', htmlBody, email)
        .then(res.render('User/activeAccount'));
    } catch (err) {
      console.log(err);
    }
  }

  static async confirm(req, res) {
    const { token } = req.query;
    const isActive = true;
    try {
      const [row] = await db.User.update(
        { isActive, active_token: null },
        { where: { active_token: token } }
      );
      if (row != 0) {
        res.redirect('/user/login');
      }
      res.redirect('/user/login');
    } catch (err) {
      console.log(err);
    }
  }

  static async signInRender(req, res) {
    const { user } = req.body;
    console.log(user);
    res.render('User/signIn', { user: user });
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await db.User.findOne({
        where: { email: email },
        include: [db.Role],
      });
      const validPassword = await brypt.compare(password, user.password);
      if (user && validPassword) {
        const token = User.jwtToken(user);
        res.cookie('access_token', token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: 'strict',
        });

        res.render('home/index');
      } else {
        console.log('Not valid');
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async signOut(req, res) {
    console.log('312312');
    res.clearCookie('access_token');
    res.redirect('/user/login');
  }

  static async forgetRender(req, res) {
    res.render('User/forgetpass');
  }

  static async forget(req, res) {
    const { email } = req.body;
    const user = db.User.findOne({ where: { email: email } });
    if (!user) {
      return;
    }
    const token = User.generate_Token();
    const htmlBody = `
    <html>
    <head>
        <title>New Password</title>
    </head>
    <body>
        <h1>New Password</h1>
        <p>Please click the following link to change your password account:</p>
        <a href="http://localhost:3000/user/change?token=${token}">Change Password</a>
    </body>
    </html>`;
    try {
      await db.User.update(
        { forget_Token: token },
        { where: { email: email } }
      );
      await sendMail
        .sendMail('New Password', htmlBody, email)
        .then(res.render('User/activeAccount'));
    } catch (err) {
      console.log(err);
    }
  }

  static async changePassRender(req, res) {
    const { token } = req.query;
    res.render('User/forgetFrom', { token: token });
  }

  static async changePass(req, res) {
    const { password, token } = req.body;
    const hashPassword = await User.hashPassword(password);
    try {
      await db.User.update(
        { password: hashPassword, forget_Token: null },
        { where: { forget_Token: token } }
      );
      res.redirect('/user/login');
    } catch (err) {
      console.log(err);
    }
  }

  static generate_Token() {
    return uuidv4();
  }

  static jwtToken(user) {
    const access_token = jwt.sign(
      {
        id: user.id,
        username: user.name,
        roleid: user.RoleId,
        role: user.Role.name,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: '365d',
      }
    );
    return access_token;
  }

  static async hashPassword(password) {
    const salt = await brypt.genSalt(10);
    const hashed = await brypt.hash(password, salt);
    return hashed;
  }
}

module.exports = User;
