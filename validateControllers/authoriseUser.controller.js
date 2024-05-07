const { authoriseUserModel } = require("../validateModels/authoriseUser.model");
const sessionIdCreator = require("../utils/generateKey");

async function authoriseUserController(req, res, next) {
  try {
    const sessionId = sessionIdCreator();
    const response = await authoriseUserModel(req.body, sessionId);

    if (req.body.rememberMe) {
      res.cookie("rememberMe", true, { secure: true, httpOnly: true });
      res.cookie("session_id", sessionId, {
        secure: true,
        httpOnly: true,
      });
    } else {
      res.cookie("rememberMe", false, { secure: true, httpOnly: true });
      res.cookie("session_id", sessionId, {
        secure: true,
        httpOnly: true,
        maxAge: 360 * 10000,
      });
    }
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
}

module.exports = authoriseUserController;
