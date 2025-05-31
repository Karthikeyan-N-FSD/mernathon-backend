const nodemailer = require("nodemailer");
const Subscription = require("../model/subscription");

const generateDiscountCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code
};

const sendDiscountEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Your Exclusive Discount Code!",
    html: `<h2>Thank you for subscribing!</h2>
           <p>Your 6-digit discount code is: <b>${code}</b></p>
           <p>Use this code on your next purchase to enjoy your discount!</p>`,
  };

  await transporter.sendMail(mailOptions);
};

exports.subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const existing = await Subscription.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "You have already subscribed with this email." });
    }

    const code = generateDiscountCode();
    await sendDiscountEmail(email, code);

    await Subscription.create({ email, code });

    res.json({ message: "Discount code sent to your email!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
};