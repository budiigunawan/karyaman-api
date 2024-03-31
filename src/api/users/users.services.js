// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const { db } = require('../../utils/db');

function findUserByEmail(email) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

function createUserByEmailAndPassword(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: {
      email: user.email,
      password: user.password,
    },
  });
}

function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
    include: {
      role: true,
    },
  });
}

function createUser(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  const {
    email,
    password,
    fullName,
    phone,
    isAdmin,
    isActive,
    employed,
    roleId,
  } = user;

  return db.user.create({
    data: {
      email,
      password,
      fullName,
      phone,
      isAdmin,
      isActive,
      employed,
      roleId,
    },
    include: {
      role: true,
    },
  });
}

function countUsers() {
  return db.user.count();
}

function findUsers(page, limit) {
  const take = Number(limit);
  const skip = (page - 1) * limit;

  return db.user.findMany({
    take,
    skip,
    include: {
      role: true,
    },
  });
}

function updateUserById(id, newData) {
  return db.user.update({
    where: { id },
    data: newData,
    include: {
      role: true,
    },
  });
}

function deleteUserById(id) {
  return db.user.delete({
    where: { id },
  });
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUserByEmailAndPassword,
  createUser,
  countUsers,
  findUsers,
  updateUserById,
  deleteUserById,
};
