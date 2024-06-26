'use strict';
const db = require('../models/index');
const page = require('../middleware/page');
const { Pagination, userPage } = require('../middleware/page');
class Role {
  constructor(name) {
    this.name = name;
  }
  static async index(req, res) {
    const currentPage = req.query.page || 1;
    const { objects, pagesArray } = await Pagination(currentPage, db.Role);
    res.render('Role/index', {
      layout: 'admin',
      role: objects,
      pagesArray,
      currentPage,
    });
  }

  static async createRender(req, res) {
    res.render('Role/CreateRole', { layout: 'admin' });
  }

  static async create(req, res) {
    const { name } = req.body;
    const role = new Role(name);
    try {
      await db.Role.create(role);
      res.redirect('/role');
    } catch (err) {
      res.redirect('/home/err');
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
      res.redirect('/home/err');
    }
  }
  static async update(req, res) {
    const id = req.params.id;
    const { name } = req.body;
    try {
      await db.Role.update({ name }, { where: { id: id } });
      res.redirect('/role');
    } catch (err) {
      res.redirect('/home/err');
    }
  }
  static async checkExist(req, res) {
    try {
      const { name } = req.body;
      const Role = await db.Role.findOne({ where: { name: name } });
      if (Role) {
        res.json({ exist: true });
      } else {
        res.json({ exist: false });
      }
    } catch (err) {
      res.redirect('/home/err');
    }
  }
}

module.exports = Role;
