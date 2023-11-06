const { uploadPicModel } = require("../PicModels/uploadPic.model");

async function uploadPicController(req, res, next) {
  try {
    if (req.file && req.body.year && req.body.setting) {
      req.file.originalname = `${req.body.year}${req.body.activity}${req.file.originalname}`;
      const response = await uploadPicModel(req.file);
      res.status(201).json(response);
    }
    res.status(400).json({ error: "400 - not valid request" });
  } catch (err) {
    next(err);
  }
}

module.exports = uploadPicController;
