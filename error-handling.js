function error400(err, req, res, next) {
  if (err.errors)
    res.status(400).json({ error: "400 - not valid request" }); //createUser / updateUserById
  else if (err.msg === "email already registered") {
    // createUser
    res.status(400).json(err);
  } else if (err.msg === "id not valid") {
    //getIdByUser
    res.status(400).json(err);
  } else {
    next(err);
  }
}

function error404(err, req, res, next) {
  if (err.status === 404) {
    res.status(404).json({ msg: "resource not found" }); //getIdByUser
  } else {
    next(err);
  }
}

function error500(err, req, res, next) {
  res.status(500).json({ error: "500 - internal server error" });
}

module.exports = { error400, error404, error500 };
