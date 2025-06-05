const Profile = require("../model/profileModel");
const QrCode = require("qrcode");
const { transporter } = require("../utils/email");

exports.createProfile = async (req, res) => {
  try {
    const { name, dob, phone, email, district, panchayat,gender,category,qrcode } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }


    const qrCode = qrcode;

    const imagePath = req.file.path;
    const imageDownloadLink = `${req.protocol}://${req.get("host")}/${imagePath.replace(/\\/g, "/")}`;

    const newProfile = new Profile({
      name,
      dob,
      phone,
      email,
      district,
      panchayat,
      images: [imagePath],
      qrCode,gender,category 
    });

    await newProfile.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Profile Image Download Link",
      html: `
        <p>Hi ${name},</p>
        <p>Your profile has been created successfully!</p>
        <p>Download image: <a href="${imageDownloadLink}">${imageDownloadLink}</a></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      ...newProfile.toJSON(),
      imageDownloadLink,
      mailOptions,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
