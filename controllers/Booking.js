'use strict ';
const { where } = require('sequelize');
const db = require('../models/index');
const BookingDetail = require('./BookingDetail');
class Booking {
  constructor(date, Userid) {
    this.date = date;
    this.UserId = Userid;
  }

  static async bookRender(req, res) {
    const { id } = req.body.user;
    res.render('Booking/book', { id });
  }

  static async book(req, res) {
    const { id, checkIn, checkout, roomId } = req.body;
    const date = await Booking.date();
    const book = new Booking(date, id);
    console.log(book);
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

  static async date() {
    const dateObject = new Date();
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return [year, month, day].join('-');
  }
}
module.exports = Booking;
