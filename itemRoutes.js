const express = require('express');
const Item = require('../models/Item');
const { runProducer } = require('../kafka/producer');

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add item
router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const item = new Item({ name, quantity });
    await item.save();
    if (quantity < 5) {
      await runProducer(`Low stock alert: ${name} has ${quantity} units`);
    }
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update item
router.put('/:id', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const item = await Item.findByIdAndUpdate(req.params.id, { name, quantity }, { new: true });
    if (quantity < 5) {
      await runProducer(`Low stock alert: ${name} has ${quantity} units`);
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;