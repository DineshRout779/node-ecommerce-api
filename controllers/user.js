const User = require('../model/User');
const bcrypt = require('bcrypt');

// Update user
exports.updateUser = async (req, res) => {
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    return res.status(200).json('account has been updated!');
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json('account has been deleted!');
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Get user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ err });

    const { password, ...others } = user._doc;

    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    if (!users) return res.status(404).json({ error: 'No users found!' });

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
};
