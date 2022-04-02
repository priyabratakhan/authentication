require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    var decoded = jwt.verify(token, process.env.secret_key, (err, decode) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
};

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(400).send({ message: "Authorization token not found" });

  if (!req.headers.authorization.startsWith("Bearer "))
    return res.status(400).send({ message: "Authorization token not found" });
  const token = req.headers.authorization.trim().split(" ")[1];

  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch (err) {
    return res.status(400).send({ message: "Authorization token not found" });
    }
    req.user = decoded.user;
    return next()
};

module.exports = authenticate;
