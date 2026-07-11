const pool = require("../db/db.js");
const product = {
  getProducts: async (req, res, next) => {
    try {
      const result = await pool.query("select * from products");
      res
        .status(200)
        .json(
          result.rows < 1
            ? { success: true, message: "No product exist" }
            : { success: true, data: result.rows },
        );
    } catch (error) {
      next({ message: error.message });
    }
  },
};

module.exports = product;
