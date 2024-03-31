const express = require('express');
const { isAuthenticated } = require('../middlewares');
const {
  createAttendance,
  findAttendances,
  findAttendancesByUserId,
  countAttendances,
  countAttendancesByUserId,
} = require('./attendance.services');
const { findUserById } = require('../users/users.services');

const router = express.Router();

router.post('/create', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const { clockIn, pointIn, imgIn } = req.body;
    const newAttendance = await createAttendance({
      clockIn,
      pointIn,
      imgIn,
      userId,
    });

    res.json({
      message: 'Attendance created successfully',
      data: newAttendance,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/list', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const { page = 1, limit = 10 } = req.query;
    const user = await findUserById(userId);

    let attendances;
    let totalData;
    let totalPage;

    if (user.isAdmin) {
      attendances = await findAttendances(page, limit);
      totalData = await countAttendances();
      totalPage = Math.ceil(totalData / limit);
    } else {
      attendances = await findAttendancesByUserId(page, limit, userId);
      totalData = await countAttendancesByUserId(userId);
      totalPage = Math.ceil(totalData / limit);
    }

    res.json({ totalData, totalPage, data: attendances });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
