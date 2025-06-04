const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const { getProfiles, createProfile } = require("../controller/profileController");

router.post("/", upload.single("image"), createProfile);
router.get("/", getProfiles);

module.exports = router;
