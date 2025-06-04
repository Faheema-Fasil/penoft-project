const express = require("express");
const router = express.Router();
const locationController = require("../controller/locationController");

router.post("/districts", locationController.createDistrict);
router.post("/panchayats", locationController.addPanchayat);
router.get("/", locationController.getLocations);
router.get("/:district", locationController.getDistrictPanchayats);

module.exports = router;
