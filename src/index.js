const express=require('express');
const middlewearConfig=require('../src/middlewears/middlewears');
const db=require('../src/dbconnection/db');
const router=require('../src/routes/routes');

const app=express();
const a=8081;

middlewearConfig(app);

app.use(router);
app.listen(a,err=>{
    if(err){
       throw err;
    } 
    else{
        console.log(
            ` server is running on port : ${a}
            `
        );
    }
});


