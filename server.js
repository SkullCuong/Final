'use strict';

const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const route = require('./routes/indexRoute');
const db = require('./models/index');
const dotenv = require('dotenv');
const Handlebars = require('handlebars');
app.use(express.json());
dotenv.config();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'views/assets/')));
app.use('/images', express.static(path.join(__dirname, 'views/images/')));
app.use('/js', express.static(path.join(__dirname, 'views/js/')));
app.engine('hbs', hbs.engine({ defaultLayout: 'index', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', route);
db.sequelize.sync({ force: false }).then(async () => {
  await createRoles();
  app.listen(3000, () => {
    console.log('Website running on: http://localhost:3000');
  });
});

async function createRoles() {
  await db.Role.findOrCreate({ where: { name: 'Admin' } });
  await db.Role.findOrCreate({ where: { name: 'User' } });
}
Handlebars.registerHelper('isCurrentPage', function (currentPage, pageNumber) {
  return currentPage == pageNumber;
});

app.get('/', (req, res) => {
  res.render('home/index');
});
app.post('/123', (req, res) => {
  console.log(req.body);
});
// Admin Page
app.get('/admin', (req, res) => {
  res.render('admin/index', { layout: 'admin' });
});
// Profile Page
app.get('/profile', (req, res) => {
  res.render('home/profile', { layout: 'index' });
});
