const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contractSchema = new Schema({
    recruiterId : {type:mongoose.Types.ObjectId,ref:"User"},
    freelancerId : {type:mongoose.Types.ObjectId,ref:"User"},
    rating:Number,
    status:String, 
    date:Date,
    service:String
})
const contractModel = mongoose.model('Contract',contractSchema);
module.exports = contractModel