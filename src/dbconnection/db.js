const mongo=require('mongoose');

const db=mongo.connect("mongodb+srv://lakshmi:199762Jj@@cluster0-gevl4.mongodb.net/test?retryWrites=true&w=majority",
                    { useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify:false},
                    (err,res) => { if(err){ console.log(err);} else{console.log('connected to mongodb');} }
                    );

module.exports = {
    db
}