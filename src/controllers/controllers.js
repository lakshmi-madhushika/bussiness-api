const mongoose=require('mongoose');
const dailyreport=require('../models/dailyreports');
const garment=require('../models/garment');
const orders=require('../models/orders');


//create all monthly reports year by year
const createreport=async(req,res)=>{
    
    const day=[ 0,1,2,3,4,5,6,7,8,9,10,11 ]; // all months which store in mongodb like this
    let years=[];
    const garment_id=[];

    orders.find()
    .exec()
    .then(all=>{
       
        for(let i = 0; i < all.length; i+=1) {  
            years[i]=all[i].placedate.getFullYear();
            
        }
        const distinct=(value,index,self)=>self.indexOf(value)===index;
        years=years.filter(distinct) ;
       
    })
    .catch(err=>{          
        res.status(500).json(err);
    });  

    garment.find()
    .exec()
    .then(docs=>{
        if(docs.length>0){  
             
            for(let i = 0; i < docs.length; i++) { 
                        garment_id[i]=docs[i]._id;                        
            }
            orders.find()
            .exec()
            .then(result=>{
                for(let i = 0; i <  garment_id.length; i+=1) {                       
                       for(let j = 0; j <  years.length; j++) {                          
                          for(let k = 0; k <  day.length; k++) { 
                            let total=0;
                            let count=0; 
                            let qcount=0;
                            for(let l=0;l<result.length;l+=1){
                                if(result[l].garmentid.equals(garment_id[i]) ){
                                    if(result[l].placedate.getFullYear()===years[j]){
                                        if( result[l].placedate.getMonth()===day[k]){
                                            total+=result[l].price;
                                                  count+=1;
                                                    qcount+=1;
                                        }                                       
                                    }                                    
                                }                               
                            }
                            
                            if(count>0 | qcount>0){
                              
                                const dailyReport=new dailyreport({
                                                         
                                      garmentId:garment_id[i],
                                      no_of_orders:count,
                                      no_of_quotations:qcount,
                                      year:years[j],
                                      month:day[k]+1,    
                                      g_revenue:total,                                       
                                                                            
                                });

                                dailyReport
                               .save()
                               .then(result=>{
                                   res.status(200).json();
                                })
                               .catch(err=>{          
                                    res.status(500).json(err);
                                 });    
                             }
                          }
                       }
                }
                
                
            })
            .catch(err=>{           
                res.status(500).json(err);
            });                                                                               
        }else{
            res.status(404).json();
        }      
    })
   .catch(err=>{          
        res.status(500).json(err);
   });     
   
}

// get a report from dailyreport when user give his garment id ,year and month
const getareport=async(req,res)=>{
    dailyreport.find({garmentId:req.params.id,month:req.params.month,year:req.params.year,})
    .then(doc=>{
        if(doc.length>0){
           res.status(200).json(doc);
        }else{  
            garment.find({_id:req.params.id})
            .then(result=>{
               if (result.length>0) {
                  
                     const g_id=result[0]._id;
                    
                     orders.find({garmentid:g_id,})
                     .then(doc=>{
                       let year=req.params.year;
                       let month=req.params.month;
                        let total=0;
                         let count=0; 
                       let qcount=0; 
                       for(let l=0;l<doc.length;l+=1){

                           
                               
                               if(doc[l].placedate.getFullYear()==year){
                        
                                     if( doc[l].placedate.getMonth() == month){
                                       // console.log(doc)
                                       total+=doc[l].price;
                                              count+=1;
                                               qcount+=1;
                                     }                                       
                              }                                    
                                                        
                        }
                       
                              
                           const dailyReport=new dailyreport({
                                                     
                                 garmentId:g_id,
                                 no_of_orders:count,
                                   no_of_quotations:qcount,
                                  year:year,
                                  month:month,    
                                 g_revenue:total,                                       
                                                                        
                             });

                            dailyReport
                          .save()
                            .then(result=>{
                              res.status(200).json(result);
                             })
                           .catch(err=>{          
                                 res.status(500).json(err);
                            });    
                                                    
                     });
                } else{
                   res.send('no this garment in here')
                }
            });
        }    
    })
    .catch(err=>{
       res.status(500).json({eror:err});
    });
}

 // get all reports from dailyreport
const getreports=async(req,res)=>{    
    dailyreport.find()
    .exec()
    .then(docs=>{
        if(docs.length>0){
            res.status(200).json(docs);
        }else{
            res.status(404).json({message:'no any reports'});
        } 
    })
    .catch(err=>{
        res.status(500).json({  error:err });
    });
}

// delete a report from dailyreport
const deletereport=async(req,res)=>{
    dailyreport.findByIdAndRemove(req.params.id)
    .exec()
    .then(result=>{
        if(result){
            res.status(200).json({message:'delete data'});
        }else{
            res.status(404).json({message:'no  enterd report'});
        }   
    })
    .catch(err=>{
         res.status(500).json({ error:err }); 
    });
}

// update a report from dailyreport
const updaterepo=async(req,res)=>{
    dailyreport.findByIdAndUpdate(req.params.id, {$set: req.body})
    .exec()
    .then(result=>{
        if(result){
            res.status(200).json({message:'update data'});
        }else{
            res.status(404).json({message:'no  entered report'});
        }    
    })
    .catch(err=>{
        res.status(500).json({ error:err }); 
    });
}

module.exports = {
    createreport,
    getareport,
    getreports,
    deletereport,
    updaterepo,
    
}
