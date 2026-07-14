const express = require("express");
const product = require("../controller/products.js");
const upload = require("../middlewares/multer.js");

const router = express.Router();

router.get("/products", product.getProducts);
router.post("/product",upload.single("product_image"),product.addProduct)
module.exports = router;
