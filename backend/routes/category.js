const express=require("express");
const category=require("../controller/category.js")
const router=express.Router();

router.get("/categories", category.getCategory);
module.exports=router;