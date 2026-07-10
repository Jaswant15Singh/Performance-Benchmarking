const pool = require("../db/db.js");
const category = {
  getCategory: async(req, res,next) => {    
    try {
        const result=await pool.query("select * from category");
        res.status(200).json(result.rows<1?{success:true,message:"No categories exist"}:{success:true,data:result.rows})
    } catch (error) {
        
        next({message:error.message});
    }
  },
};

module.exports = category;
