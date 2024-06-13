const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const Donor = require('../models/donor');
const Donation = require('../models/donation');

const razorpay = new Razorpay({
    key_id: 'your_razorpay_key_id',
    key_secret: 'your_razorpay_secret_key'
});

router.get('/donate', (req, res) => {
    res.render('donate');
});

router.post('/donate', async (req, res) => {
    const { name, email, amount } = req.body;

    const donor = new Donor({ name, email });
    await donor.save();

    const donation = new Donation({ amount, donor: donor._id });
    await donation.save();

    const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: donation._id.toString()
    };

    const order = await razorpay.orders.create(options);
    res.json({ order_id: order.id });
});

router.post('/payment-success', async (req, res) => {
    // Validate payment and update database
    res.render('success');
});

router.post('/payment-failure', (req, res) => {
    res.render('failure');
});

module.exports = router;
