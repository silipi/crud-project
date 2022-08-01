const express = require('express');
const router = express.Router();
const Pet = require('../schemas/Pet');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const pets = await Pet.find({});
    console.log({ pets });
    res.json(pets);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    res.json(pet);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { name, nickname, age, type, breed, description, image, client } =
      req.body;

    const pet = new Pet({
      name,
      nickname,
      age,
      type,
      breed,
      description,
      image,
      client,
    });

    await pet.save();

    res.json(pet);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { name, nickname, age, type, breed, description, image, client } =
      req.body;

    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      {
        name,
        nickname,
        age,
        type,
        breed,
        description,
        image,
        client,
      },
      { returnDocument: 'after' }
    );

    res.json(pet);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet deleted', pet });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
