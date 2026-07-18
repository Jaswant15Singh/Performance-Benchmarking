const express = require("express");
const product = require("../controller/products.js");
const upload = require("../middlewares/multer.js");

const router = express.Router();

router.get("/products", product.getProducts);
router.post("/product",upload.single("product_image"),product.addProduct);
router.put("/category/:id",upload.single("category_image"),product.updateProduct)
router.get("/product/:id", product.getProductById);
router.delete("/product/:id", product.deleteProduct);
module.exports = router;
