const express = require("express");
const Razorpay = require("razorpay");
const { nanoid } = require("nanoid");
const crypto = require("crypto");
const paymentRouter = express.Router();

const razorpay = new Razorpay({
  key_id: 'rzp_test_ga3R1OnaDIhRXY',
  key_secret: process.env.RAZORPAY_SECRET,
})

paymentRouter.route("/razorpay")
  .post(async (req, res) => {
    try {
      const { amount } = req.body;
      const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: nanoid()
      };

      const razorpayResponse = await razorpay.orders.create(options);

      console.log(razorpayResponse)

      res.json({ success: true, orderId: razorpayResponse.id, amount: razorpayResponse.amount, currency: razorpayResponse.currency })
    } catch (error) {
      res.json({ success: false, errorMessage: error.message })
    }
  })

paymentRouter.route("/verification")
  .post((req, res) => {

    const { orderId, paymentId, signature } = req.body;

    const shasum = crypto.createHmac('sha256', process.env['razorpay_secret'])
    shasum.update(`${orderId}|${paymentId}`);
    const digest = shasum.digest('hex');

    if (digest !== signature) {
      return res.json({ success: false, message: "transaction failed!" })
    }

    res.json({ success: true, message: "order successfully placed!" });
  })



module.exports = paymentRouter;

