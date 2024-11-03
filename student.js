const mongoose = require("mongoose");

const studentSchema=new mongoose.Schema({
    fname:String,
    father:String,
    mother:String,
    mobileno:String,
    course:String
})
module.exports=mongoose.model('student',studentSchema)