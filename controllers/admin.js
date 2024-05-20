const { Sequelize, Op } = require('sequelize');
const db = require('../models/index');
async function index(req, res) {
  console.log('hêhe');
  const currentYear = new Date().getFullYear();
  await db.Bookingdetail.findAll({
    attributes: [
      [Sequelize.fn('MONTH', Sequelize.col('order_check_in')), 'month'],
      [Sequelize.fn('COUNT', '*'), 'count'],
    ],
    where: {
      [Sequelize.literal(`YEAR(order_check_in) = ${currentYear}`)]:
        Sequelize.literal('status != "Cancel"'),
    },
    group: ['month'],
  })
    .then(result => {
      const labels = result.map(row => row.getDataValue('month'));
      const data = result.map(row => row.getDataValue('count'));
      res.render('admin/index', { layout: 'admin', labels, data });
    })
    .catch(error => {
      res.redirect('/home/err');
    });
}
module.exports = index;
