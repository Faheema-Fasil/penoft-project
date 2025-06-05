const Location = require("../model/locationModel");

exports.createDistrict = async (req, res) => {
  try {
    const { district } = req.body;
    const newLocation = await Location.findOneAndUpdate(
      { district },
      { $setOnInsert: { district, panchayats: [] } },
      { upsert: true, new: true }
    );
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addPanchayat = async (req, res) => {
  try {
    const { district, panchayat } = req.body;
    const updatedLocation = await Location.findOneAndUpdate(
      { district },
      { $addToSet: { panchayats: panchayat } },
      { new: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: "District not found" });
    }

    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDistrictPanchayats = async (req, res) => {
  try {
    const { district } = req.params;
    const location = await Location.findOne({ district });

    if (!location) {
      return res.status(404).json({ message: "District not found" });
    }

    res.json(location.panchayats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
