const mongoose=require('mongoose');

const garment=mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    
});

module.exports=mongoose.model('garment',garment);