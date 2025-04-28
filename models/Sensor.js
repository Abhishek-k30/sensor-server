import mongoose from 'mongoose';

const sensorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  apiKey: { type: String, required: true, unique: true }
});

const Sensor = mongoose.model('Sensor', sensorSchema);
export default Sensor;