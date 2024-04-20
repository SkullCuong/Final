'use strict';

async function Pagination(currentPage, db) {
  const page = currentPage;
  const perPage = 5;
  const offset = (page - 1) * perPage;
  try {
    const total = await db.count();
    const totalPages = Math.ceil(total / perPage);
    const object = await db.findAll({
      offset: offset,
      limit: perPage,
    });
    const objects = object.map(object => object.get({ plain: true }));
    const pagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }
    return { objects, pagesArray };
  } catch (err) {
    console.log(err);
  }
}

async function userPage(currentPage, db) {
  const page = currentPage;
  const perPage = 5;
  const offset = (page - 1) * perPage;
  try {
    const total = await db.User.count();
    const totalPages = Math.ceil(total / perPage);
    const object = await db.User.findAll({
      offset: offset,
      limit: perPage,
      include: db.Role,
    });
    const objects = object.map(object => object.get({ plain: true }));
    const pagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }
    return { objects, pagesArray };
  } catch (err) {
    console.log(err);
  }
}

async function bookPage(currentPage, db) {
  const page = currentPage;
  const perPage = 5;
  const offset = (page - 1) * perPage;
  try {
    const total = await db.Booking.count();
    const totalPages = Math.ceil(total / perPage);
    const object = await db.Booking.findAll({
      offset: offset,
      limit: perPage,
      include: {
        model: db.User,
        attributes: ['name', 'email'],
      },
    });
    const objects = object.map(object => object.get({ plain: true }));
    const pagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }
    return { objects, pagesArray };
  } catch (err) {
    console.log(err);
  }
}
module.exports = { Pagination, userPage, bookPage };
