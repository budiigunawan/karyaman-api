const { db } = require('../../utils/db');

function createAttendance(attendance) {
  return db.attendance.create({
    data: attendance,
    include: {
      user: true,
    },
  });
}

module.exports = {
  createAttendance,
};
