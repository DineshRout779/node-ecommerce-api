const router = require('express').Router();
const { register, login } = require('../controllers/auth');

// REGISTER USER
router.post('/register', register);

// LOGIN USER
router.post('/login', login);

module.exports = router;
