/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcrypt';
import db from '../../utils/db';

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
    data: user,
  });
}

function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

export default { findUserByEmail, createUserByEmailAndPassword, findUserById };
