'use strict';

class User {
  constructor(name, email, dob, sex, password, address, phone, image_url) {
    this.name = name;
    this.email = email;
    this.dob = dob;
    this.sex = sex;
    this.password = password;
    this.address = address;
    this.phone = phone;
    this.image_url = image_url;
  }
}

module.exports = User;
