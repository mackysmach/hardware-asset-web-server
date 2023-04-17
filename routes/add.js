const express = require("express");

const Asset = require("../models/asset");
const Type = require("../models/type");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const obj = { ...req.body };
    obj.Type = obj.Type.toLowerCase();
    const newAsset = new Asset(obj);
    await newAsset.save();

    const result = await Type.findOne({ name: obj.Type });
    if (result === null) {
      const newType = new Type({ name: obj.Type });
      await newType.save();
    }

    return res.json({
      msg: "add new Asset successfully"
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;