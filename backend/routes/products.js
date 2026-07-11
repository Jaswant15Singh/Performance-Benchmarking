const express = require("express");
const product = require("../controller/product.js");
const router = express.Router();

router.get("/products", product.getProducts);
module.exports = router;
