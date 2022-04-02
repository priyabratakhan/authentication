const express = require("express");

const router = express.Router();
const authenticate = require("../middlewares/authenticate");

const Product = require("../models/product.model");
// const { route } = require("./user.controller");
router.post("", authenticate, async (req, res) => {
    req.body.user_id = req.user_id
  try {
    const product = await Product.create(req.body);
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

module.exports = router;
