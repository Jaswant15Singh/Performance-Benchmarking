const express = require("express");
const cors=require('cors');
require("dotenv").config();
const categoryRouter=require("./routes/category");
const productRouter=require("./routes/products.js")
const app = express();
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use("/api", categoryRouter);
app.use("/api", productRouter);

app.use('/weather',async(req,res)=>{
       const data = await fetch(
         "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Dublin &appid=00ff5679c7f76386d63846772ebab5ed"
       );
       const result=await data.json();
       res.status(200).json({result,message:"This is a public api."})
})

app.use((err,req,res,next)=>{    
    res.status(500).json({success:false, message:err.message})
})
module.exports=app;

