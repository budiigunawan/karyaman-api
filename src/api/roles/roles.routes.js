const express = require('express');
const { isAuthenticated } = require('../middlewares');
const { createRole } = require('./roles.services');

const router = express.Router();

router.post('/create', isAuthenticated, async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400);
      throw new Error('You must provide a role name.');
    }

    const role = await createRole(name);
    res.json(role);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
