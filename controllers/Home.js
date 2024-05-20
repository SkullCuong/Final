'use strict';
class Home {
  static async err(req, res) {
    res.render('home/err');
  }
  static async homepage(req, res) {
    res.redirect('/room');
  }
}
module.exports = Home;
