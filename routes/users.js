const router = require('express').Router();
const { verifyTokenAndAuthorization } = require('../middlewares/verifyToken');
const { getUser, updateUser, deleteUser } = require('../controllers/user');

// GET USER
router.get('/:id', verifyTokenAndAuthorization, getUser);

// UPDATE USER
router.put('/:id', verifyTokenAndAuthorization, updateUser);

// DELETE USER
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);

module.exports = router;
