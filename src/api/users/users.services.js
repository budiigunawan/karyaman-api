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
  });
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUserByEmailAndPassword,
  createUser,
};
