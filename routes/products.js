const router = require('express').Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middlewares/verifyToken');
// const {
//   getUser,
//   updateUser,
//   deleteUser,
//   getAllUsers,
// } = require('../controllers/user');

const {
  addProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/product');

// CREATE
router.post('/', verifyTokenAndAdmin, addProduct);

// GET A PRODUCT
router.get('/:id', getProduct);

// GET ALL PRODUCTS
router.get('/', getAllProducts);

// UPDATE A PRODUCT
router.put('/:id', verifyTokenAndAdmin, updateProduct);

// DELETE A PRODUCT
router.delete('/:id', verifyTokenAndAdmin, deleteProduct);

module.exports = router;
