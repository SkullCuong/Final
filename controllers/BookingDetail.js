'use strict';

class BookingDetail {
  constructor(
    order_check_in,
    order_check_out,
    RoomId,
    BookingId,
    check_in = null,
    check_out = null
  ) {
    this.order_check_in = order_check_in;
    this.order_check_out = order_check_out;
    this.check_in = check_in;
    this.check_out = check_out;
    this.RoomId = RoomId;
    this.BookingId = BookingId;
  }
}

module.exports = BookingDetail;
