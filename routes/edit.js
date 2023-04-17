const express = require("express");

const Asset = require("../models/asset");

const router = express.Router();

router.put("/", async (req, res) => {
  try {
    await Asset.updateOne({ AssetNo: req.body.AssetNo }, { $set: req.body });
    return res.json({
      msg: "edit asset successfully!"
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;