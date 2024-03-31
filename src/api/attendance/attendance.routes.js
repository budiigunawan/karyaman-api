const express = require('express');
const { isAuthenticated } = require('../middlewares');
const { createAttendance } = require('./attendance.services');

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

module.exports = router;
