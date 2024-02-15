const jsonwebtoken = require('jsonwebtoken');
//  Verify Token
async function  verifyToken  (req, res, next){
    const token=req.cookies.token;
     console.log(token);
      
     if(token === undefined  ){
          
             return res.json({
                 message: "Access Denied! Unauthorized User"
               });
     } else{
  
         jsonwebtoken.verify(token, process.env.SECRET_KEY||"auth", (err, authData)=>{
             if(err){
                 res.json({
                     message: "Invalid Token..."
                   });
  
             } else{

                let data = authData.partner;
                req.authData = data;

                next();
                 
                // console.log(authData.user.role);
                // const role = authData.user.role;
                // if(role === "admin"){
  
                //  next();
                // } else{
                //     return res.json({
                //         message: "Access Denied! you are not an Admin"
                //       });
  
                // }
             }
         })
     } 
 }

 module.exports = verifyToken