'use strict';
const db = require('../models/index');
const fs = require('fs').promises;
const path = require('path');
const {
  Pagination,
  PaginationRoom,
  SearchRoom,
} = require('../middleware/page');
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
    const { objects, pagesArray } = await Pagination(currentPage, db.Room);
    res.render('Room/index', {
      layout: 'admin',
      room: objects,
      pagesArray,
      currentPage,
    });
  }
  static async room(req, res) {
    const { search, order } = req.query;
    const currentPage = req.query.page || 1;
    let result;
    if (!search) {
      result = await PaginationRoom(currentPage, db.Room, order);
    } else {
      result = await SearchRoom(currentPage, db.Room, search);
    }
    const { objects, pagesArray } = result;
    res.render('Room/room', {
      room: objects,
      pagesArray,
      currentPage,
    });
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
      res.redirect('/home/err');
    }
  }

  // For User
  static async roomdetail(req, res) {
    const id = req.params.id;
    try {
      const roomDb = await db.Room.findByPk(id);
      if (roomDb) {
        const room = roomDb.get({ plain: true });
        res.render('Room/roomDetail', { room: room });
      }
    } catch (err) {
      res.redirect('/home/err');
    }
  }
  // For Admin
  static async adminroomdetail(req, res) {
    const id = req.params.id;
    try {
      const roomDb = await db.Room.findByPk(id);
      if (roomDb) {
        const room = roomDb.get({ plain: true });
        res.render('Room/adminroomDetail', { layout: 'admin', room: room });
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
      res.redirect('/home/err');
    }
  }

  static async updateRender(req, res) {
    try {
      const id = req.params.id;
      const roomDb = await db.Room.findByPk(id);
      if (roomDb) {
        const room = roomDb.get({ plain: true });
        res.render('Room/UpdateRoom', { layout: 'admin', room: room });
      }
    } catch (err) {
      res.redirect('/home/err');
    }
  }

  static async update(req, res) {
    try {
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
      await db.Room.update(
        { name, type, floor, price, capacity, image_url },
        { where: { id: id } }
      );
      res.redirect('/room/roomIndex');
    } catch (err) {
      res.redirect('/home/err');
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const delete_status = true;
      await db.Room.update({ delete_status }, { where: { id: id } });
      res.redirect('/room');
    } catch (err) {
      res.redirect('/home/err');
    }
  }

  static async checkExist(req, res) {
    try {
      const { name, id } = req.body;
      const room = await db.Room.findOne({ where: { name: name } });
      if (room && room.id != id) {
        res.json({ exist: true });
      } else {
        res.json({ exist: false });
      }
    } catch (err) {
      res.redirect('/home/err');
    }
  }
}

module.exports = Room;
