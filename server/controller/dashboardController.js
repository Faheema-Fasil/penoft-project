const Profile=require('../model/profileModel')
exports.GetDashboard = async (req, res) => {
  try {
    const result = await Profile.aggregate([
      {
        $facet: {
          genderCounts: [
            { $match: { gender: { $in: ["men", "women", "others"] } } },
            { $group: { _id: "$gender", count: { $sum: 1 } } },
          ],
          categoryCounts: [
            { $match: { category: { $in: ["cat1", "cat2", "cat3"] } } },
            { $group: { _id: "$category", count: { $sum: 1 } } },
          ],
        },
      },
    ]);

    // Convert arrays to object for easy access
    const genderCounts = {};
    result[0].genderCounts.forEach(item => {
      genderCounts[item._id] = item.count;
    });

    const categoryCounts = {};
    result[0].categoryCounts.forEach(item => {
      categoryCounts[item._id] = item.count;
    });

    res.status(200).json({ genderCounts, categoryCounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

