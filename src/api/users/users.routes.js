const express = require('express');
const { isAuthenticated } = require('../middlewares');
const {
  findUserById,
  createUser,
  countUsers,
  findUsers,
} = require('./users.services');

const router = express.Router();

router.get('/profile', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    delete user.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/create', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);

    if (!user.isAdmin) {
      res.status(403);
      throw new Error('You dont have access');
    }

    const {
      email,
      password,
      fullName,
      phone,
      isAdmin,
      isActive,
      employed,
      roleId,
    } = req.body;

    const newUser = await createUser({
      email,
      password,
      fullName,
      phone,
      isAdmin,
      isActive,
      employed,
      roleId,
    });

    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

router.get('/list', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);

    if (!user.isAdmin) {
      res.status(403);
      throw new Error('You dont have access');
    }

    const { page = 1, limit = 10 } = req.query;

    const users = await findUsers(page, limit);
    const totalData = await countUsers();
    const totalPage = Math.ceil(totalData / limit);

    res.json({ totalData, totalPage, data: users });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
