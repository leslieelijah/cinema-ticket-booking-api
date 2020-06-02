const router = require('express').Router();

let Booking = require('../models/booking.model');

router.route('/').get((req, res) => {
    Booking.find()
        .then(booking => res.json(booking))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const seatBooked = req.body.seatBooked;
    const numberOfSeats = req.body.numberOfSeats;
    const date = Date.parse(req.body.date);

    const newBooking = new Booking({
        username,
        seatBooked,
        numberOfSeats,
        date
    });

    newBooking.save()
        .then(() => res.json('Booking added!'))
        .catch(err => res.status(400).json('Error: ' + err));


});
router.route('/:id').get((req, res) => {
    Booking.findById(req.params.id)
        .then(booking => res.json(booking))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Booking.findByIdAndDelete(req.params.id)
        .then(() => res.json('Booking deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Booking.findById(req.params.id)
        .then(booking => {
            booking.username = req.body.username;
            booking.seatBooked = req.body.seatBooked;
            booking.numberOfSeats = req.body.numberOfSeats;
            booking.date = Date.parse(req.body.date);

            booking.save()
                .then(() => res.json('Booking updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;