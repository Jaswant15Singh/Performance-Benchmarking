const pool = require("../db/db.js");
const product = {
  getProducts: async (req, res, next) => {
    try {
      const result = await pool.query(
        "SELECT * FROM products ORDER BY product_id",
      );
      res
        .status(200)
        .json(
          result.rows.length < 1
            ? { success: true, message: "No products exist", data: [] }
            : { success: true, data: result.rows },
        );
    } catch (error) {
      next({ message: error.message });
    }
  },

  getProductById: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!Number.isInteger(Number(id))) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid product id" });
      }

      const result = await pool.query(
        "SELECT * FROM products WHERE product_id = $1",
        [id],
      );

      if (result.rows.length < 1) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      next({ message: error.message });
    }
  },

  addProduct: async (req, res, next) => {
    try {
      console.log(req.body);
      console.log(req.file);
      
      
      const {
        product_name,
        product_description,
        product_stock,
        product_price,
        category_id
      } = req.body;

      if (!product_name || product_price === undefined) {
        return res.status(400).json({
          success: false,
          message: "product_name and product_price are required",
        });
      }

      const product_image = req.file ? req.file.filename : null;

      const result = await pool.query(
        `INSERT INTO products (product_name, product_description, product_image, product_stock, product_price,category_id)
       VALUES ($1, $2, $3, $4, $5,$6)
       RETURNING *`,
        [
          product_name,
          product_description,
          product_image,
          product_stock,
          product_price,
          category_id
        ],
      );

      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      next({ message: error.message });
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(req.body);
      console.log(req.file);
      
      
      const {
        product_name,
        product_description,
        product_stock,
        product_price,
        category_id
      } = req.body;

      if (!Number.isInteger(Number(id))) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid product id" });
      }

      const product_image = req.file ? req.file.filename : null; 

      const result = await pool.query(
        `UPDATE products
       SET product_name = COALESCE($1, product_name),
           product_description = COALESCE($2, product_description),
           product_image = COALESCE($3, product_image),
           product_stock = COALESCE($4, product_stock),
           product_price = COALESCE($5, product_price),
           category_id=COALESCE($6, category_id)
       WHERE product_id = $7
       RETURNING *`,
        [
          product_name,
          product_description,
          product_image,
          product_stock,
          product_price,
          category_id,
          id,
        ],
      );

      if (result.rows.length < 1) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      next({ message: error.message });
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!Number.isInteger(Number(id))) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid product id" });
      }

      const result = await pool.query(
        "DELETE FROM products WHERE product_id = $1 RETURNING *",
        [id],
      );

      if (result.rows.length < 1) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      res.status(200).json({
        success: true,
        message: "Product deleted",
        data: result.rows[0],
      });
    } catch (error) {
      next({ message: error.message });
    }
  },
};

module.exports = product;
