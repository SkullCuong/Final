'use strict';
const db = require('../models/index');
class Room {
  constructor(name) {
    this.name = name;
  }
  static async index(req, res) {
    const roleDb = await db.Role.findAll();
    const roles = roleDb.map(role => role.get({ plain: true }));
    res.render('Role/index', { layout: 'admin', role: roles });
  }

  static async createRender(req, res) {
    res.render('Role/CreateRole', { layout: 'admin' });
  }

  static async create(req, res) {
    const { name } = req.body;
    const room = new Room(name);
    try {
      await db.Role.create(room);
      res.redirect('/role');
    } catch (err) {
      console.log(err);
    }
  }
  static async updateRender(req, res) {
    const id = req.params.id;
    try {
      const roleDb = await db.Role.findByPk(id);
      if (roleDb) {
        const role = roleDb.get({ plain: true });
        res.render('Role/UpdateRole', { layout: 'admin', role: role });
      }
    } catch (err) {
      console.log(err);
    }
  }
  static async update(req, res) {
    const id = req.params.id;
    const { name } = req.body;
    try {
      await db.Role.update({ name }, { where: { id: id } });
      res.redirect('/role');
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Room;
