import mongoose from 'mongoose';

const readingSchema = new mongoose.Schema({
    apiKey: { type: String, required: true }, // match to Sensor
    date: { type: Date, required: true },
    temp: Number,
    humidity: Number,
    moisture: Number,
    npk: Number,
    ph: Number
});

const Reading = mongoose.model('Reading', readingSchema);
export default Reading;
