const mongoose=require('mongoose');
const orders=require('../models/orders');

const getadminorders=async(req,res)=>{  // calculate ongoing , late , orders count for admin dashbord and calculate no of quotations for admin dashboard

    const date= new Date();
    let counto=0;
    let countl=0;
   
   
   let o=0;
   let l=0;

    orders.find()
    .then(all=>{
       
        for(let i = 0; i < all.length; i++) { 
            if( all[i].status=="ONGOING"){
                if(all[i].duedate>date){
                    counto+=1; 
                  }
                                    
            }
            
              if ( all[i].status=="ONGOING"){
                  if(all[i].duedate<date){
                    countl+=1;
                  }
               }
           
            
        }  
        const ongoingarray=[counto]; 
        const lategarray=[countl]; 
        orders.find()
        .then(all=>{
           
            for(let i = 0; i < all.length; i++) { 
                if( all[i].status=="ONGOING"){
                    if(all[i].duedate>date){
                        ongoingarray[o]=all[i]; 
                        o+=1;
                      }
                                        
                }
                
                  if ( all[i].status=="ONGOING"){
                      if(all[i].duedate<date){
                        lategarray[l]=all[i];
                      }
                   }
               
                
            }  
            const ongoing=ongoingarray;
            const late=lategarray;
        res.status(200).json({ongoing:ongoing,late:late,qutationss:all}); 
    });

});

}



const getgarmentorders=async(req,res)=>{ // calculate ongoing , late , orders count for garment dashbord and calculate no of quotations for garment dashboard

    const date= new Date();
    let gcounto=0;
    let gcountl=0;
   
   
   let o=0;
   let l=0;
   

    orders.find({garmentid:req.params.id})
    .exec()
    .then(all=>{
        
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


        const ongoingarray=[gcounto]; 
        const lategarray=[gcountl]; 
        orders.find({garmentid:req.params.id})
        .then(all=>{
           
            for(let i = 0; i < all.length; i++) { 
                if( all[i].status=="ONGOING"){
                    if(all[i].duedate>date){
                        ongoingarray[o]=all[i]; 
                        o+=1;
                      }
                                        
                }
                
                  if ( all[i].status=="ONGOING"){
                      if(all[i].duedate<date){
                        lategarray[l]=all[i];
                      }
                   }
               
                
            }  
            const ongoing=ongoingarray;
            const late=lategarray;
        res.status(200).json({ongoing:ongoing,late:late,qutationss:all}); 
    });

    });
     
}



 
module.exports = {
    getadminorders,
    getgarmentorders,
}