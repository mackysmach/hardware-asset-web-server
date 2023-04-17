const express = require("express");

const Asset = require("../models/asset");
const Type = require("../models/type");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const data = await Asset.find();
    const total = await Asset.countDocuments();
    return res.json({
      total: total,
      data: data
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get("/each-page", async (req, res) => {

  try {
    const { page, pageSize, type, sortedBy, text } = req.query;
    if (page === undefined) page = 1;
    if (pageSize === undefined) pageSize = 10;


    let data;
    if (text === "") {
      data = await Asset
      .find({ Type: type.toLowerCase() })
      .sort({ [sortedBy]: "asc" })
    } else {
      data = await Asset
        .find({
          Type: type,
          $or: [
            {"AssetNo": { "$regex": text, "$options": "i" }},
            {"BougthDate": { "$regex": text, "$options": "i" }},
            {"Brand": { "$regex": text, "$options": "i" }},
            {"Duration": { "$regex": text, "$options": "i" }},
            {"Expense": { "$regex": text, "$options": "i" }},
            {"Expire": { "$regex": text, "$options": "i" }},
            {"MSOffice": { "$regex": text, "$options": "i" }},
            {"MTM": { "$regex": text, "$options": "i" }},
            {"Model": { "$regex": text, "$options": "i" }},
            {"Owner": { "$regex": text, "$options": "i" }},
            {"Remark": { "$regex": text, "$options": "i" }},
            {"SerialNo": { "$regex": text, "$options": "i" }},
          ]
        })
        .skip((page - 1) * pageSize)
    }

    return res.json({
      total: data.length,
      data: data
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get("/pages/:pageSize/:type", async (req, res) => {
  try {
    const pageSize = req.params.pageSize;
    const type = req.params.type;
    const filter = { Type: type }
    const count = (await Asset.find(filter)).length;
    return res.json({
      "pages": Math.ceil(count / pageSize)
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get("/type/all", async (req, res) => {
  try {
    const allObj = await Type.find();
    const allTypes = [];
    for (let obj of allObj) {
      allTypes.push(obj.name);
    }
    return res.json(allTypes);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get("/assetno/:type", async (req, res) => {
  try {
    const type = req.params.type;
    const docs = await Asset.find({ Type: type }).sort({ AssetNo: "desc" }).limit(1);
    return res.send(docs[0].AssetNo);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get("/search/:type/:pageSize/:page/:text", async (req, res) => {
  try {
    const type = req.params["type"];
    const pageSize = req.params["pageSize"];
    const page = req.params["page"];
    const text = req.params["text"];
    const data = await Asset.find({
      Type: type,
      $or: [
        {"AssetNo": { "$regex": text, "$options": "i" }},
        {"BougthDate": { "$regex": text, "$options": "i" }},
        {"Brand": { "$regex": text, "$options": "i" }},
        {"Duration": { "$regex": text, "$options": "i" }},
        {"Expense": { "$regex": text, "$options": "i" }},
        {"Expire": { "$regex": text, "$options": "i" }},
        {"MSOffice": { "$regex": text, "$options": "i" }},
        {"MTM": { "$regex": text, "$options": "i" }},
        {"Model": { "$regex": text, "$options": "i" }},
        {"Owner": { "$regex": text, "$options": "i" }},
        {"Remark": { "$regex": text, "$options": "i" }},
        {"SerialNo": { "$regex": text, "$options": "i" }},
      ]
    })
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize));
    return res.json({
      "total": data.length,
      "data": data,
    });
    
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;