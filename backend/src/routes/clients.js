const express = require('express');
const router = express.Router();
const Client = require('../schemas/Client');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const clients = await Client.find({});
    res.json(clients);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    res.json(client);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, address, pets } = req.body;

    const client = new Client({
      name,
      email,
      phone,
      address,
      pets,
    });

    await Client.save();

    res.json(client);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { name, email, phone, address, pets } = req.body;

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, pets },
      { returnDocument: 'after' }
    );

    res.json(client);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted', client });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
