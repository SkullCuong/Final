'use strict ';
const { where } = require('sequelize');
const db = require('../models/index');
const BookingDetail = require('./BookingDetail');
const {
  bookPage,
  bookDetailPage,
  detailPagination,
} = require('../middleware/page');
class Booking {
  constructor(date, Userid) {
    this.date = date;
    this.UserId = Userid;
  }

  static async bookRender(req, res) {
    try {
      const { id, username } = req.body.user;
      const roomId = req.params.id;
      const roomDb = await db.Room.findByPk(roomId);
      const room = roomDb.get({ plain: true });
      res.render('Booking/book', { id, username, room });
    } catch (err) {
      console.log('12312');
    }
  }

  static async book(req, res) {
    const { id, checkIn, checkout, roomId } = req.body;
    const date = await Booking.date();
    const book = new Booking(date, id);
    try {
      const [booking, created] = await db.Booking.findOrCreate({
        where: { date: book.date, UserId: book.UserId },
      });
      const bookingDetail = new BookingDetail(
        checkIn,
        checkout,
        roomId,
        booking.id
      );
      await db.Bookingdetail.create(bookingDetail);
    } catch (err) {
      console.log(err);
    }
  }

  static async checkInRender(req, res) {
    res.render('Booking/checkin', { layout: 'admin' });
  }

  static async checkIn(req, res) {
    const { id } = req.params;
    const { checkIn } = req.body;
    try {
      await db.Bookingdetail.update({ check_in: checkIn }, { where: { id } });
    } catch (err) {
      console.log(err);
    }
  }

  static async checkOutRender(req, res) {
    res.render('Booking/checkout', { layout: 'admin' });
  }

  static async checkOut(req, res) {
    const { id } = req.params;
    const { checkOut } = req.body;
    try {
      await db.Bookingdetail.update({ check_out: checkOut }, { where: { id } });
    } catch (err) {
      console.log(err);
    }
  }

  static async indexAdmin(req, res) {
    const currentPage = req.query.page || 1;
    const { objects, pagesArray } = await bookPage(currentPage, db);
    res.render('Booking/indexAdmin', {
      layout: 'admin',
      book: objects,
      pagesArray,
      currentPage,
    });
  }
  static async detailAdminRender(req, res) {
    const { id } = req.params;
    const currentPage = req.query.page || 1;
    const { objects, pagesArray } = await bookDetailPage(currentPage, db, id);
    res.render('Booking/bookingAdmin', {
      id: id,
      layout: 'admin',
      bookdetail: objects,
      pagesArray,
      currentPage,
    });
  }

  // // Change Status
  static async changeStatusRender(req, res) {
    try {
      const { id } = req.params;
      res.render('Booking/status', { layout: 'admin', id: id });
    } catch (err) {
      console.log(err);
    }
  }
  static async changeStatus(req, res) {
    try {
      const { status, id } = req.body;
      await db.Bookingdetail.update({ status: status }, { where: { id } });
      res.redirect(`/booking/index`);
    } catch (err) {
      console.log(err);
    }
  }

  // // API Check valid
  static async checkDate(req, res) {
    try {
      const { id, checkIn, checkOut } = req.body;
      const status = 'Pending';
      const bookingDb = await db.Bookingdetail.findAll({
        where: { RoomId: id, status },
      });
      const booking = bookingDb.map(object => object.get({ plain: true }));
      console.log(booking);
      const result = Booking.checkValid(booking, checkIn, checkOut);
      if (result) {
        res.json({ valid: true });
      } else {
        res.json({ valid: false });
      }
    } catch (err) {
      console.log(err);
    }
  }
  static async date() {
    const dateObject = new Date();
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return [year, month, day].join('-');
  }
  // // Find min and max date;
  static checkValid(bookings, givenCheckIn, givenCheckOut) {
    const checkIn = new Date(givenCheckIn);
    const checkOut = new Date(givenCheckOut);
    for (const booking of bookings) {
      const bookingCheckIn = new Date(booking.order_check_in);
      const bookingCheckOut = new Date(booking.order_check_out);
      if (
        (checkIn >= bookingCheckIn && checkIn <= bookingCheckOut) ||
        (checkOut >= bookingCheckIn && checkOut <= bookingCheckOut) ||
        (checkIn <= bookingCheckIn && checkOut >= bookingCheckOut)
      ) {
        return true;
      }
    }
    return false;
  }

  // // Order
  static async orderRender(req, res) {
    try {
      const { id } = req.params;
      const userDb = await db.User.findByPk(id);
      const bookDb = await db.Booking.findAll({ where: { UserId: id } });
      const user = userDb.get({ plain: true });
      const book = bookDb.map(book => book.get({ plain: true }));
      res.render('Booking/order', { layout: 'profile', user, book });
    } catch (err) {
      console.log(err);
    }
  }
  static async orderdetailRender(req, res) {
    try {
      const currentPage = req.query.page || 1;
      console.log(currentPage);
      const { id } = req.params;
      const { userid } = req.query;
      const userDb = await db.User.findByPk(userid);
      const { objects, pagesArray } = await detailPagination(
        id,
        currentPage,
        db
      );
      const user = userDb.get({ plain: true });
      res.render('Booking/orderDetail', {
        id: id,
        layout: 'profile',
        pagesArray,
        user,
        bookdetail: objects,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async userCancel(req, res) {
    try {
      const { id, userid } = req.body;
      const status = 'Cancel';
      await db.Bookingdetail.update({ status }, { where: { id: id } });
      res.redirect(`/booking/order/${userid}`);
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = Booking;
