'use strict';

const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const route = require('./routes/indexRoute');
const db = require('./models/index');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'views/assets/')));
app.use('/images', express.static(path.join(__dirname, 'views/images/')));
app.engine('hbs', hbs.engine({ defaultLayout: 'index', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', route);
db.sequelize.sync({ force: false }).then(() =>
  app.listen(3000, () => {
    console.log('Website running on: http://localhost:3000');
  })
);

app.get('/', (req, res) => {
  res.render('home/index');
});
