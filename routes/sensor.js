import express from 'express';
import Sensor from '../models/Sensor.js';

const router = express.Router();

// Utility to generate unique 4-digit API key
async function generateUniqueApiKey() {
  let apiKey;
  let exists = true;

  while (exists) {
    apiKey = Math.floor(1000 + Math.random() * 9000).toString();
    exists = await Sensor.findOne({ apiKey });
  }

  return apiKey;
}

// ✅ Create a new channel
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Channel name is required' });

  const apiKey = await generateUniqueApiKey();

  try {
    const newSensor = new Sensor({ name, apiKey });
    await newSensor.save();
    res.status(201).json(newSensor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get all channels (name + apiKey)
router.get('/', async (req, res) => {
  try {
    console.log('Attempting to fetch channels...');
    const channels = await Sensor.find({}, 'name apiKey');
    console.log('Found channels:', channels);
    res.json({ channels });
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ Delete a channel by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Sensor.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    res.json({ message: 'Channel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
