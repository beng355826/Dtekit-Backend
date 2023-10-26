const { updateUserByIdModel } = require("../models/updateUserById.model");

async function updateUserByIdController(req, res, next) {
  try {
    const response = await updateUserByIdModel(req.params.id, req.body);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
}

module.exports = updateUserByIdController;
