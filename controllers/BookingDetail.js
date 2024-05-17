'use strict';

class BookingDetail {
  constructor(
    order_check_in,
    order_check_out,
    RoomId,
    BookingId,
    status = 'Pending'
  ) {
    this.order_check_in = order_check_in;
    this.order_check_out = order_check_out;
    this.RoomId = RoomId;
    this.BookingId = BookingId;
    this.status = status;
  }
}

module.exports = BookingDetail;
