const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./config.cjs')

const authMiddleWare = (req,res,next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')) res.status(403).json({message:"Login Required"});
    const token = authHeader.split(' ')[1];
    jwt.verify(token,JWT_SECRET, (err,decoded)=>{
        if(err) res.status(403).json({message:"You are not logged in"});
        else {
            if(decoded.userId)
            {
                req.userId = decoded.userId; 
                next();
            }
            else res.status(403).json({message:"You are not logged in"});
        }
    });   
}


module.exports = {authMiddleWare}