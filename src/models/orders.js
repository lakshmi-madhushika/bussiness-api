const mongoose=require('mongoose');

const order = mongoose.Schema({
  name: {
    type: String,
   
  },
  status: {
    type: String,
    
  },
  customerid: {
    type: mongoose.Schema.Types.ObjectId,
   
  },
  garmentid: {
    type: mongoose.Schema.Types.ObjectId,
    
  },
  quotationid: {
    type: mongoose.Schema.Types.ObjectId,
    
  },
  amount: {
    type: Number,
    
  },
  price: {
    type: Number,
    
  },

  paid: {
    type: Number,
   
  },

  placedate: {
    type: Date,
    default: Date.now,
  },
  duedate: {
    type: Date,
    default: Date.now,
  },
});



module.exports=mongoose.model('order',order);
