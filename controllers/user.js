const User = require('../model/User');
const bcrypt = require('bcrypt');

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

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json('account has been deleted!');
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getUser = async (req, res) => {};
