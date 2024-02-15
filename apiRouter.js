const express =require('express');
const apiRouter = express.Router();
const db = require('./db.js');
const {genSaltSync, hashSync, compareSync } = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

apiRouter.post('/register', async (req, res, next)=>{
    try{
        let {name,prenom,adresse,telephone,email,password} = req.body;
  
  
              if (!name || !email || !password) {
                return res.sendStatus(400);
             }
  
             const salt = genSaltSync(10);
             password = hashSync(password, salt);
  
               
  
        const partenaire =  await db.insertPartenaire(name,prenom,adresse,telephone,email,password);
         
        const jsontoken = jsonwebtoken.sign({partenaire: partenaire}, process.env.SECRET_KEY||"auth", { expiresIn: '30m'} );
        res.cookie('token', jsontoken, { httpOnly: true, secure: true, SameSite: 'strict' , expires: new Date(Number(new Date()) + 30*60*1000) }); //we add secure: true, when using https.
 
 
        res.json({token: jsontoken});
 
  
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});

apiRouter.post('/login', async(req, res, next)=>{
    try{
    const email = req.body.email;
    const password = req.body.password;
    const partner = await db.getPartenaireByEmail(email);
    console.log(partner);

     
    if(!partner){
        return res.json({
            message: "Invalid email or password"
        })
    }
 
    const isValidPassword = compareSync(password, partner.password);
    if(isValidPassword){
        partner.password = undefined;
        const jsontoken = jsonwebtoken.sign({partner: partner}, process.env.SECRET_KEY||"auth", { expiresIn: '30m'} );
        res.cookie('token', jsontoken, { httpOnly: true, secure: false, SameSite: 'strict' , expires: new Date(Number(new Date()) + 30*60*1000) }); //we add secure: true, when using https.
 
        res.json({token: jsontoken, isAuth: true,partner: partner});
    //    return res.redirect('/mainpage') ;
 
    }  else{
        return res.json({
            message: "Invalid email or password"
        });
    } 
 
    } catch(e){
        console.log(e);
    }
});

    
    
module.exports = apiRouter;