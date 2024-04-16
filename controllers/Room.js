'use strict';
const db = require('../models/index');
const fs = require('fs').promises;
const path = require('path');
const page = require('../middleware/page');
class Room {
  constructor(
    name,
    type,
    floor,
    price,
    capacity,
    image_url,
    status = true,
    delete_status = false
  ) {
    this.name = name;
    this.type = type;
    this.floor = floor;
    this.price = price;
    this.image_url = image_url;
    this.status = status;
    this.capacity = capacity;
    this.delete_status = delete_status;
  }
  static async index(req, res) {
    const currentPage = req.query.page || 1;
    const { objects, pagesArray } = await page(currentPage, db.Room);
    res.render('Room/index', {
      layout: 'admin',
      room: objects,
      pagesArray,
      currentPage,
    });
  }
  static async room(req, res) {
    const roomDb = await db.Room.findAll();
    const rooms = roomDb.map(room => room.get({ plain: true }));
    res.render('Room/room', { room: rooms });
  }

  static async detail(req, res) {
    const id = req.params.id;
    try {
      const roomDb = await db.Room.findByPk(id);
      if (roomDb) {
        const room = roomDb.get({ plain: true });
        res.render('Room/DetailRoom', { room: room });
      }
    } catch (err) {
      console.log(err);
    }
  }

  static createRender(req, res) {
    res.render('Room/CreateRoom', { layout: 'admin' });
  }

  static async create(req, res) {
    const image_url = req.file.filename;
    const { name, type, floor, price, capacity } = req.body;
    const room = new Room(name, type, floor, price, capacity, image_url);
    try {
      await db.Room.create(room);
      res.redirect('/room/roomIndex');
    } catch (err) {
      console.log(err);
    }
  }

  static async updateRender(req, res) {
    const id = req.params.id;
    try {
      const roomDb = await db.Room.findByPk(id);
      if (roomDb) {
        const room = roomDb.get({ plain: true });
        res.render('Room/UpdateRoom', { layout: 'admin', room: room });
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async update(req, res) {
    let image_url;
    const id = req.params.id;
    const { name, type, floor, price, capacity, oldimage } = req.body;
    if (req.file?.filename) {
      image_url = req.file.filename;
      const oldPath = path.join('views/images/', oldimage);
      await fs.unlink(oldPath);
    } else {
      image_url = oldimage;
    }
    try {
      await db.Room.update(
        { name, type, floor, price, capacity, image_url },
        { where: { id: id } }
      );
      res.redirect('/room/roomIndex');
    } catch (err) {
      console.log(err);
    }
  }

  static async delete(req, res) {
    const id = req.params.id;
    const delete_status = true;
    try {
      await db.Room.update({ delete_status }, { where: { id: id } });
      res.redirect('/room');
    } catch (err) {
      console.log(err);
    }
  }

  static async checkExist(req, res) {
    const { name } = req.body;
    const room = await db.Room.findOne({ where: { name: name } });
    if (room) {
      res.json({ exist: true });
    } else {
      res.json({ exist: false });
    }
  }
}

module.exports = Room;
