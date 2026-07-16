const pool = require("../db/db.js");

const category = {
  getCategory: async (req, res, next) => {
    try {
      const result = await pool.query(
        "SELECT * FROM category ORDER BY category_id",
      );
      res
        .status(200)
        .json(
          result.rows.length < 1
            ? { success: true, message: "No categories exist", data: [] }
            : { success: true, data: result.rows },
        );
    } catch (error) {
      next({ message: error.message });
    }
  },

  getCategoryById: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!Number.isInteger(Number(id))) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category id" });
      }

      const result = await pool.query(
        "SELECT * FROM category WHERE category_id = $1",
        [id],
      );

      if (result.rows.length < 1) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      next({ message: error.message });
    }
  },

  addCategory: async (req, res, next) => {    
    console.log(11);
    
    try {
      const { category_name, category_description } = req.body;
      console.log(req.body);
      
      if (!category_name) {
        return res.status(400).json({
          success: false,
          message: "category_name is required",
        });
      }

      const category_image = req.file ? req.file.filename : null;

      const result = await pool.query(
        `INSERT INTO category (category_name, category_description, category_image)
       VALUES ($1, $2, $3)
       RETURNING *`,
        [category_name, category_description, category_image],
      );

      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.log(error);
      
      next({ message: error.message });
    }
  },

  updateCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { category_name, category_description } = req.body;

      if (!Number.isInteger(Number(id))) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category id" });
      }

      const category_image = req.file ? req.file.filename : null; // null = keep existing via COALESCE

      const result = await pool.query(
        `UPDATE category
       SET category_name = COALESCE($1, category_name),
           category_description = COALESCE($2, category_description),
           category_image = COALESCE($3, category_image)
       WHERE category_id = $4
       RETURNING *`,
        [category_name, category_description, category_image, id],
      );

      if (result.rows.length < 1) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      next({ message: error.message });
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!Number.isInteger(Number(id))) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category id" });
      }

      const result = await pool.query(
        "DELETE FROM category WHERE category_id = $1 RETURNING *",
        [id],
      );

      if (result.rows.length < 1) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      res.status(200).json({
        success: true,
        message: "Category deleted",
        data: result.rows[0],
      });
    } catch (error) {
      next({ message: error.message });
    }
  },
};

module.exports = category;
