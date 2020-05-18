const mongoose=require('mongoose');
const dailyreports=require('../models/dailyreports');

const yearthis=[0,0,0,0,0,0,0,0,0,0,0,0]; // for this year monthly revenues
const yearpre=[0,0,0,0,0,0,0,0,0,0,0,0]; // for last year monthly revenues
const bothyear=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // for both year monthly revenues
const datee=new Date(); 

const achartcreate=async(req,res)=>{
    
    const year=datee.getFullYear();
    const month=datee.getMonth();

    dailyreports.find()
    .then(docs=>{
       
        for(let i=0;i<docs.length;i++){      
            if(docs[i].year==year){ 

                switch(docs[i].month){
                    case 1:
                        yearthis[0]+=docs[i].g_revenue;                    
                        break;
                    case 2:
                        yearthis[1]+=docs[i].g_revenue;                          
                        break;
                    case 3:
                        yearthis[2]+=docs[i].g_revenue;                           
                        break;
                    case 4:
                        yearthis[3]+=docs[i].g_revenue;                          
                        break;
                    case 5:
                        yearthis[4]+=docs[i].g_revenue;                           
                        break;
                    case 6:
                        yearthis[5]+=docs[i].g_revenue;                           
                        break;
                    case 7:
                        yearthis[6]+=docs[i].g_revenue;                           
                        break;
                    case 8:
                        yearthis[7]+=docs[i].g_revenue;                           
                        break;
                    case 9:
                        yearthis[8]+=docs[i].g_revenue;                           
                        break;
                    case 10:
                        yearthis[9]+=docs[i].g_revenue;                           
                        break;
                    case 11:
                        yearthis[10]+=docs[i].g_revenue;                            
                        break;
                    case 12:
                        yearthis[11]+=docs[i].g_revenue;                           
                        break;                                                
                }
            }else if(docs[i].year==(year-1)){
                switch(docs[i].month){
                    case 1:
                        yearpre[0]+=docs[i].g_revenue;
                        break;
                    case 2:
                        yearpre[1]+=docs[i].g_revenue;
                        break;
                    case 3:
                        yearpre[2]+=docs[i].g_revenue;
                        break;
                    case 4:
                        yearpre[3]+=docs[i].g_revenue;
                        break;
                    case 5:
                        yearpre[4]+=docs[i].g_revenue;
                        break;
                    case 6:
                        yearpre[5]+=docs[i].g_revenue;
                        break;
                    case 7:
                        yearpre[6]+=docs[i].g_revenue;
                        break;
                    case 8:
                        yearpre[7]+=docs[i].g_revenue;
                        break;
                    case 9:
                        yearpre[8]+=docs[i].g_revenue;
                        break;
                    case 10:
                        yearpre[9]+=docs[i].g_revenue;
                        break;
                    case 11:
                        yearpre[10]+=docs[i].g_revenue;
                        break;
                    case 12:
                        yearpre[11]+=docs[i].g_revenue;
                        break;                 
                }
            }                   
        }

        let i=0;

        yearpre.forEach(element=>{
            bothyear[i]=element;  
            i+=1;
        });

        i=12;

        yearthis.forEach(element=>{
           bothyear[i]=element;   
           i+=1;
        });

        const c=month+12;
        let e=c-11;
        const newarry=[];

        for(e;e<=c;e++){
           newarry[e]= bothyear[e]
        }

        const info=newarry;

        res.json(info)

        for(i;i<=c;i++){
            newarry[i]= 0;
        }

        for(i=0;i<12;i++){
            yearthis[i]= 0;
            yearpre[i]=0;
        }

        for(i=0;i<24;i++){
            bothyear[i]=0;
        }

    });
    
}

module.exports = {
    achartcreate
}