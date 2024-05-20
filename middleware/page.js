'use strict';
const { Op } = require('sequelize');
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
    res.redirect('/home/err');
  }
}
async function PaginationRoom(currentPage, db, filter) {
  const page = currentPage;
  const perPage = 6;
  const offset = (page - 1) * perPage;
  try {
    const total = await db.count();
    const totalPages = Math.ceil(total / perPage);
    let object;
    switch (filter) {
      case 'olded':
        object = await db.findAll({
          offset: offset,
          limit: perPage,
          order: [['id', 'ASC']],
        });
        break;
      case 'price':
        object = await db.findAll({
          offset: offset,
          limit: perPage,
          order: [['price', 'DESC']],
        });
        break;
      case 'capacity':
        object = await db.findAll({
          offset: offset,
          limit: perPage,
          order: [['capacity', 'DESC']],
        });
        break;
      default:
        object = await db.findAll({
          offset: offset,
          limit: perPage,
          order: [['id', 'DESC']],
        });
        break;
    }
    const objects = object.map(object => object.get({ plain: true }));
    const pagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }
    return { objects, pagesArray };
  } catch (err) {
    res.redirect('/home/err');
  }
}

async function SearchRoom(currentPage, db, name) {
  const page = currentPage;
  const perPage = 6;
  const offset = (page - 1) * perPage;
  try {
    const total = perPage;
    const totalPages = Math.ceil(total / perPage);
    const object = await db.findAll({
      where: {
        name: { [Op.like]: `%${name}%` },
      },
      order: [['id', 'DESC']],
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
    res.redirect('/home/err');
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
    res.redirect('/home/err');
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
    res.redirect('/home/err');
  }
}
async function bookDetailPage(currentPage, db, id) {
  const page = currentPage;
  const perPage = 5;
  const offset = (page - 1) * perPage;
  try {
    const total = await db.Bookingdetail.count();
    const totalPages = Math.ceil(total / perPage);
    const object = await db.Bookingdetail.findAll({
      offset: offset,
      limit: perPage,
      where: { BookingId: id },
      include: {
        model: db.Room,
        attributes: ['name'],
      },
    });
    const objects = object.map(object => object.get({ plain: true }));
    const pagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }
    return { objects, pagesArray };
  } catch (err) {
    res.redirect('/home/err');
  }
}
async function detailPagination(bookingid, currentPage, db) {
  const page = currentPage;
  const perPage = 5;
  const offset = (page - 1) * perPage;
  try {
    const status = 'Pending';
    const total = await db.Bookingdetail.count({
      where: { BookingId: bookingid, status },
    });
    const totalPages = Math.ceil(total / perPage);
    const object = await db.Bookingdetail.findAll({
      offset: offset,
      limit: perPage,
      where: { BookingId: bookingid, status },
      include: {
        model: db.Room,
        attributes: ['name'],
      },
      order: [['id', 'DESC']],
    });
    const objects = object.map(object => object.get({ plain: true }));
    const pagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }
    return { objects, pagesArray };
  } catch (err) {
    res.redirect('/home/err');
  }
}
module.exports = {
  Pagination,
  userPage,
  bookPage,
  PaginationRoom,
  SearchRoom,
  bookDetailPage,
  detailPagination,
};
