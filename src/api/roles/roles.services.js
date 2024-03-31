const { db } = require('../../utils/db');

function createRole(name) {
  return db.role.create({
    data: {
      name,
    },
  });
}

module.exports = {
  createRole,
};
