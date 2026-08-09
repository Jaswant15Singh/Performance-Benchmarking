const multer = require("multer");
const path = require("path");
const fs = require("fs");

const file_utils = {
  DeleteFile: (file_path) => {
    // if (!file_path) {
    //   console.log("A File is not present");
    //   return;
    // }
  
    
    // const fullPath = path.join(__dirname, "../public", file_path);
    // fs.unlink(fullPath, (err) => {
    //   if (err) {
    //     console.error(`Error deleting file: ${err.message}`);
    //     return;
    //   }
    //   console.log(`File deleted: ${file_path}`);
    // });
  },
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {    
    const folder =
      file.fieldname === "product_image"
        ? "public/uploads/products"
        : file.fieldname === "category_image"
          ? "public/uploads/categories"
          : "public/uploads/misc";

    fs.mkdirSync(folder, { recursive: true }); 
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg, png, and webp images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = {upload,file_utils};
