'use strict';

const User = require('./User');

class Staff extends User {
  constructor(role = 1) {
    super();
  }
}
