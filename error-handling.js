function error400(err, req, res, next) {
  if (err.msg === "400 - needs an email and password to create user") {
    res.status(400).json(err);
  } else if (err.msg === "400 - email not registered") {
    res.status(400).json(err);
  } else if (err.errors)
    res.status(400).json({ error: "400 - not valid request" });
  else if (err.msg === "email already registered") {
    res.status(400).json(err);
  } else if (err.msg === "id not valid") {
    res.status(400).json(err);
  } else {
    next(err);
  }
}

function error403(err, req, res, next){
if(err.msg === "403 - incorrect credentials"){
  res.status(403).json(err);
  console.log(err);
} else {
  next(err)
}

}

function error404(err, req, res, next) {
  if (err.status === 404) {
    res.status(404).json({ msg: "resource not found" });
  } else {
    next(err);
  }
}

function error500(err, req, res, next) {
  res.status(500).json({ error: "500 - internal server error" });
}

module.exports = { error400, error404, error500, error403 };
