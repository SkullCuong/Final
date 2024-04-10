'use strict';
class Home {
  static async about(req, res) {
    res.render('Home/about');
  }
  static async contact(req, res) {
    res.render('Home/contact');
  }
}
module.exports = Home;
