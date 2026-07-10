const express = require("express");
const cors=require('cors');
require("dotenv").config();
const categoryRouter=require("./routes/category");
const app = express();
app.use(cors({origin:'http://localhost:5173'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api", categoryRouter);
// app.use('/test',(req,res)=>{
//     res.send("ttest")
// })
app.use((err,req,res,next)=>{    
    res.status(500).json({success:false, message:err.message})
})
module.exports=app;

