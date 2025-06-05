const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { transporter } = require("../utils/email");

const userModel = require("../model/userModel");

exports.register = async (req, res) => {
  console.log("register");
  console.log(req.body);

  try {
    const { name, email, password, userType } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(existingUser);
      console.log("user already exists! please login ");

      return res.status(400).send({ msg: "User already exists. Please login." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType,
    });

    await newUser.save();
    console.log(newUser);
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

exports.loginUser = async (req, res) => {
  console.log("inside login");
  try {
    const { email, password, rememberMe } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("User does not exist.");
      return res.status(400).send("User not found");
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      console.log("Incorrect password");
      console.log("Entered password:", password);
      console.log("Stored hashed password:", user.password);
      console.log("Password match result:", matchPassword);

      return res.status(400).send("Incorrect password");
    }

    const tokenExpiry = rememberMe ? "7d" : "1h";

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiry }
    );

    console.log("token", token);
    return res.status(200).send({ token, user });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = crypto.randomInt(100000, 999999).toString().padStart(6, "0");
    user.resetPasswordOtp = await bcrypt.hash(otp, 10);
    user.resetPasswordExpires = Date.now() + 600000; 

    await user.save();

    const mailOptions = {
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP: ${otp} (Valid for 10 minutes)`,
    };

    transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent to email", otp: otp });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await userModel.findOne({
      email,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "OTP expired or invalid" });

    const isValidOtp = await bcrypt.compare(otp.trim(), user.resetPasswordOtp);
    if (!isValidOtp) return res.status(400).json({ message: "Invalid OTP" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
