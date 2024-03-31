const { db } = require('../../utils/db');

function createAttendance(attendance) {
  return db.attendance.create({
    data: attendance,
    include: {
      user: true,
    },
  });
}

function countAttendancesByUserId(userId) {
  return db.attendance.count({
    where: {
      userId,
    },
  });
}

function countAttendances() {
  return db.attendance.count();
}

function findAttendancesByUserId(page, limit, userId) {
  const take = Number(limit);
  const skip = (page - 1) * limit;

  return db.attendance.findMany({
    take,
    skip,
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          fullName: true,
          role: true,
        },
      },
    },
  });
}

function findAttendances(page, limit) {
  const take = Number(limit);
  const skip = (page - 1) * limit;

  return db.attendance.findMany({
    take,
    skip,
    include: {
      user: {
        select: {
          fullName: true,
          role: true,
        },
      },
    },
  });
}

function updateAttendanceById(id, newData) {
  return db.attendance.update({
    where: { id },
    data: newData,
  });
}

module.exports = {
  createAttendance,
  findAttendancesByUserId,
  findAttendances,
  countAttendancesByUserId,
  countAttendances,
  updateAttendanceById,
};
