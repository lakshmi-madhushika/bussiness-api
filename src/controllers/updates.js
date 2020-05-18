const mongoose=require('mongoose');
const orders=require('../models/orders');

const updatesadmincount=async(req,res)=>{  // calculate ongoing , late , orders count for admin dashbord and calculate no of quotations for admin dashboard

    const date= new Date();
    let counto=0;
    let countl=0;
    let countq=0;

   

    orders.find()
    .then(all=>{
        countq=all.length;
        for(let i = 0; i < all.length; i++) { 
            if( all[i].status=="ONGOING"){
                if(all[i].duedate>date){
                    counto+=1; 
                  }
                                    
            }
            
              if ( all[i].status=="COMPLETE"){
                  
                    countl+=1;
                  
               }
           
            
        }    
        res.status(200).json({ongoing:counto,complete:countl,qutationss:countq}); 
    });

}


const updatesgarmentcount=async(req,res)=>{ // calculate ongoing , late , orders count for garment dashbord and calculate no of quotations for garment dashboard

    const date= new Date();
    let gcounto=0;
    let gcountl=0;
    let gcountq=0;
    
   

    orders.find({garmentid:req.params.id})
    .exec()
    .then(all=>{
        gcountq=all.length;
        for(let i = 0; i < all.length; i++) { 
            if( all[i].status=="ONGOING"){
                if(all[i].duedate>date){
                    gcounto+=1; 
                  }
                                    
            }
            
              if ( all[i].status=="ONGOING"){
                  if(all[i].duedate<date){
                    gcountl+=1;
                  }
               }
           
            
        }    
        res.status(200).json({ongoing:gcounto,late:gcountl,qutationss:gcountq}); 
    });
     
}

 
const updatescustomercount=async(req,res)=>{ // calculate ongoing , complete , orders count for customer dashbord and calculate no of quotations for customer dashboard
    const date= new Date();
    let ccounto=0;
    let countc=0;
    let ccountq=0;

    orders.find({customerid:req.params.id})
    .exec()
    .then(all=>{
        ccountq=all.length;
        for(let i = 0; i < all.length; i++) { 
            if( all[i].status=="ONGOING"){
                if(all[i].duedate>date){
                    ccounto+=1; 
                  }
                                    
            }
            
              if ( all[i].status=="COMPLETE"){
               
                    ccountc+=1; 
                 
                 
               }
           
            
        }    
        res.status(200).json({ongoing:ccounto,completes:countc,qutationss:ccountq}); 
    });
     
}


 
module.exports = {
    updatesadmincount,
    updatesgarmentcount,
    updatescustomercount
}