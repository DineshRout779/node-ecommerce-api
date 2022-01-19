const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send('users...');
});

router.post('/', (req, res) => {
  const { email, password } = req.body;

  res.status(200).json({
    email,
    password,
  });
});

module.exports = router;
