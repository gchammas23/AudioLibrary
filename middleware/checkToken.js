//Require jwt to check token
const jwt = require("jsonwebtoken");

//Middleware method to check authentication of user
module.exports = (req, res, next) => {
  //Get Authorization header from request and split to get the token
  const receivedToken = req.get("Authorization").split(" ")[1];

  try {
    //Validate the token
    const decodedToken = jwt.verify(receivedToken, process.env.JWT_SECRET);

    if (!decodedToken) {
      //Token could not be decoded
      res.status(401).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }

  //Move on to the controller
  next();
};