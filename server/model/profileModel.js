const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  id:{ type: String, required: true },
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  phone: { type: String, required: true },
  gender:{type:String,required:true},
  category:{type:String,required:true},
  email: { type: String, required: true },
  district: { type: String, required: true },
  panchayat: { type: String, required: true },
  images: [String],
  qrCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Profile", profileSchema);
