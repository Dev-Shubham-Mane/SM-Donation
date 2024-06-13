const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    amount: Number,
    date: { type: Date, default: Date.now },
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor' }
});

module.exports = mongoose.model('Donation', donationSchema);
