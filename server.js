const express  =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
 
 
const apiRouter = require('./apiRouter');
const protectedRouter = require('./protectedRoutes');
    
const app = express();


    
    
const PORT= process.env.PORT || 5000;
    
app.use(bodyParser.json());
const corsOptions = {
    origin: '*', // Autoriser toutes les origines
    credentials: true // Autorise l'envoi de cookies avec les requêtes
  };
  
app.use(cors(corsOptions));
app.use(cookieParser());

apiRouter.use(cookieParser());
protectedRouter.use(cookieParser());
    
app.use('/protected',protectedRouter)
 
    
app.use('/auth',apiRouter)
    
app.listen(PORT, ()=>{
    console.log(`server is listening  on ${PORT}`);
});
    
module.exports = app;