"use strict";
const db = require("../models/index");
class Room {
  constructor(
    name,
    type,
    floor,
    price,
    capacity,
    image_url = "12314",
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
    const roomDb = await db.Room.findAll();
    const rooms = roomDb.map((room) => room.get({ plain: true }));
    res.render("Room/room", { room: rooms });
  }

  static createRender(req, res) {
    res.render("Room/CreateRoom");
  }

  static async create(req, res) {
    const { name, type, floor, price, capacity } = req.body;
    const room = new Room(name, type, floor, price, capacity);
    try {
      await db.Room.create(room);
      res.redirect("/room");
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
        res.render("Room/UpdateRoom", { layout: "index", room: room });
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async update(req, res) {
    const id = req.params.id;
    const { name, type, floor, price, capacity } = req.body;
    try {
      await db.Room.update(
        { name, type, floor, price, capacity },
        { where: { id: id } }
      );
      res.redirect("/room");
    } catch (err) {
      console.log(err);
    }
  }

  static async delete(req, res) {
    const id = req.params.id;
    const delete_status = true;
    try {
      await db.Room.update({ delete_status }, { where: { id: id } });
      res.redirect("/room");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Room;
