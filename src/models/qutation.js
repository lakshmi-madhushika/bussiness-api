const mongoose=require('mongoose');

const qutation=mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,
    quid:Number,
    userId:Number,
    garmentId:Number,
    
   
});

module.exports=mongoose.model('qutation',qutation);