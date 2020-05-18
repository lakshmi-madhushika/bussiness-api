const mongoose=require('mongoose');

const dailyreports=mongoose.Schema({

  
    garmentId:mongoose.Schema.Types.ObjectId,
    no_of_orders:Number,
    no_of_quotations:Number,
    year:Number,
    month:Number,    
    g_revenue:Number,
    a_revenue:Number,
        
});

module.exports=mongoose.model('dailyreports',dailyreports);