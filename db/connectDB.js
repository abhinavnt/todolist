const mongoose = require("mongoose");


const connectDB= async ()=>{
    try {
    const connect=await mongoose.connect('mongodb://localhost:27017/to-doList')
        
    } catch (error) {
        console.log("mongodb error",error);
        
    }
}

module.exports={connectDB}