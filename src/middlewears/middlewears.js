
const bodyparser =require( 'body-parser');
const helmet =require( 'helmet');

module.exports = app=>{

   app.use(bodyparser.urlencoded({extended:true}));
   app.use(bodyparser.json());
   app.use(helmet());
   
}

