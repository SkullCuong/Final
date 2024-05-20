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

const username = require('./middleware/username');
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
  const pass = '$2b$10$/vOj2IJBsv17qz.uldVdI.9A14xlAAKlloOqrd3qbYtrQnq20OS4G';
  const dob = '2002-05-17';
  const sex = true;
  const address = 'none';
  const image_url = 'default.jpg';
  const isActive = 'true';
  const RoleId = 1;
  const phone = 'none';
  await db.Role.findOrCreate({ where: { name: 'Admin' } });
  await db.Role.findOrCreate({ where: { name: 'User' } });
  await db.User.findOrCreate({
    where: {
      name: 'Admin',
      email: 'Admin',
      password: pass,
      dob,
      sex,
      address,
      image_url,
      isActive,
      RoleId,
      phone,
    },
  });
}
Handlebars.registerHelper('isCurrentPage', function (currentPage, pageNumber) {
  return currentPage == pageNumber;
});
Handlebars.registerHelper('equal', function (a, b) {
  return a === b;
});
Handlebars.registerHelper('json', function (context) {
  return JSON.stringify(context);
});
