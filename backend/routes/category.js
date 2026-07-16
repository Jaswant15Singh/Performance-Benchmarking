const express=require("express");
const category=require("../controller/category.js");
const upload = require("../middlewares/multer.js");
const router=express.Router();

router.get("/categories", category.getCategory);
router.post("/category",upload.single("category_image"),category.addCategory)
router.get("/category/:id",category.getCategoryById);
router.delete("/category/:id",category.deleteCategory);
module.exports=router;