const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../schemas/User');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign(
          { username, uid: user._id },
          process.env.JWT_SECRET,
          {
            expiresIn: '1d',
          }
        );

        // TODO: remove password from user body response:
        res.status(200).json({ user, token });
      } else {
        res.status(400).json({ error: 'Invalid Password' });
      }
    } else {
      res.status(401).json({ error: 'User does not exist' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, name, email, phone, address } = req.body;

    if (!username || !password || !name || !email || !phone || !address) {
      return res.status(401).json({
        error:
          'The user must have a username, password, name, email, phone and address.',
      });
    }

    const user = new User({ username, name, email, phone, address, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = jwt.sign(
      { username, uid: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
