const router = require('express').Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middlewares/verifyToken');
const {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} = require('../controllers/user');

// GET USER
router.get('/:id', verifyTokenAndAdmin, getUser);

// GETALL USERS
router.get('/', verifyTokenAndAdmin, getAllUsers);

// UPDATE USER
router.put('/:id', verifyTokenAndAuthorization, updateUser);

// DELETE USER
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);

module.exports = router;
