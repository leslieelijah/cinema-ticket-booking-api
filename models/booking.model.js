const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    username: { type: String, required: true },
    seatBooked: { type: String, required: true },
    numberOfSeats: { type: String, required: true },
    date: { type: Date, required: true },

}, {
    timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;