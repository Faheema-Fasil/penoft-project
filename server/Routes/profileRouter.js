const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const { getProfiles, createProfile, getID } = require("../controller/profileController");

router.post("/", upload.single("image"), createProfile);
router.get("/", getProfiles);
router.get("/id", getID);

module.exports = router;
