const express = require('express');
const { isAuthenticated } = require('../middlewares');
const {
  findUserById,
  createUser,
  countUsers,
  findUsers,
  updateUserById,
  deleteUserById,
} = require('./users.services');

const router = express.Router();

router.get('/profile', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    delete user.password;
    res.json({
      data: user,
    });
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

    delete newUser.password;
    res.json({
      message: 'User created successfully',
      data: newUser,
    });
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

    users.forEach((u) => {
      delete u.password;
    });

    res.json({ totalData, totalPage, data: users });
  } catch (err) {
    next(err);
  }
});

router.put('/edit/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);

    if (!user.isAdmin) {
      res.status(403);
      throw new Error('You dont have access');
    }

    const { id } = req.params;

    // eslint-disable-next-line object-curly-newline, operator-linebreak
    const { email, fullName, phone, isAdmin, isActive, employed, roleId } =
      req.body;

    const updatedUser = await updateUserById(id, {
      email,
      fullName,
      phone,
      isAdmin,
      isActive,
      employed,
      roleId,
    });

    delete updatedUser.password;
    res.json({
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/delete/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);

    if (!user.isAdmin) {
      res.status(403);
      throw new Error('You dont have access');
    }

    const { id } = req.params;

    await deleteUserById(id);
    res.json({
      message: 'User deleted successfully',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
