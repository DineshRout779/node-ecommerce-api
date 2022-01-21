const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Please provide username, email and password!',
    });
  }

  const user = await User.findOne({ email });
  if (user)
    return res.status(403).json({
      success: false,
      error: 'User already exists',
    });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const { password, ...others } = newUser._doc;

    return res.status(200).json({
      success: true,
      message: 'Registered Successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password!',
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not registered!',
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(403).json({
        success: false,
        error: 'Invalid credentials!',
      });
    }

    generateToken(user, 200, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      err: err.message,
    });
  }
};

const generateToken = (user, statusCode, res) => {
  const payload = {
    _id: user._id,
    isAdmin: user.isAdmin,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });

  const { password, ...others } = user._doc;

  res.status(statusCode).json({ accessToken, ...others });
};
