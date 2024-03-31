const express = require('express');
const { isAuthenticated } = require('../middlewares');
const { findUserById, createUser, findUsers } = require('./users.services');

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

router.get('/all', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);

    if (!user.isAdmin) {
      res.status(403);
      throw new Error('You dont have access');
    }

    const users = await findUsers();
    res.json({ data: users.length, users });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
