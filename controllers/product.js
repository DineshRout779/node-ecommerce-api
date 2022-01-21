const Product = require('../model/Product');

// get a product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'No such product found!',
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// get all products
exports.getAllProducts = async (req, res) => {
  const { title, category } = req.query;
  try {
    let products = [];
    if (title) {
      products = await Product.find({ title: new RegExp(title, 'i') });
    } else if (category) {
      products = await Product.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      products = await Product.find();
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// add product
exports.addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    return res.status(200).json(savedProduct);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// update product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        error: 'No such product found!',
      });
    }

    return res.status(200).json('Product updated successfully!');
  } catch (error) {
    return res.status(500).json(error);
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        error: 'No such product found!',
      });
    }

    return res.status(200).json('Product deleted successfully!');
  } catch (error) {
    return res.status(500).json(error);
  }
};
