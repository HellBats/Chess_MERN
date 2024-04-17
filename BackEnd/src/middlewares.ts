const jwt = require('jsonwebtoken');
import {Request,Response} from 'express'
import  {JWT_SECRET} from './config'


type authHeader = string | undefined;

export interface custom_request extends Request{
    userId:string;
}
const authMiddleWare = (req:custom_request,res:Response,next:any) => {
    const authHeader:authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) res.status(403).json({message:"Login Required"});
    else{
        const token = authHeader.split(' ')[1];
        jwt.verify(token,JWT_SECRET, (err:Error,decoded:any)=>{
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
}


module.exports = {authMiddleWare}