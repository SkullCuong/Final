'use strict ';
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
    try {
      const booking = await db.Booking.create(book);
      const bookingDetail = new BookingDetail(
        checkIn,
        checkout,
        id,
        booking.id
      );
      console.log(bookingDetail);
      await db.Bookingdetail.create(bookingDetail);
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
