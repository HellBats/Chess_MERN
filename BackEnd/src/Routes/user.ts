import express, {Request,Response} from 'express'
import {zod_signin_schema,zod_signup_schema,zod_update_schema,zod_filter_schema} from '../zod_validation'
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')
const {User} = require('../database')
const {authMiddleWare} = require('../middlewares')
const { GenerateId } = require("../Functions/PlayersAndRooms");
let {players} = require('../Functions/PlayersAndRooms');

export const userRouter = express.Router();

type user = [{
    UserName:string,
    _id:string
}]


userRouter.post('/sign-up',async (req:Request,res:Response)=>{
    const payload = req.body;
    const user_schema = zod_signin_schema.safeParse(payload);
    console.log(req.body,user_schema);
    if(!user_schema.success) res.status(411).json({message:"wrong inputs"}); 
    else
    {
        const existing_user = await User.findOne(
            {EmailId:payload.EmailId}
        )
        if(existing_user) res.status(411).json({message:"User already exist"}); 
        else {
            const existing_user = await User.findOne(
                {UserName:payload.PhoneNo});
            if(existing_user) res.status(411).json({message:"Username is taken"});
            else{ 
                const user = await User.create({
                    Name:req.body.Name,
                    UserName:req.body.UserName,
                    EmailId:req.body.EmailId,
                    Password:req.body.Password,
                });
                const userId = user._id;
                const token = jwt.sign({userId},JWT_SECRET);
                res.status(200).json({message:"User created Succesfully",token:token});
            }
        }
    }
});

userRouter.get('/sign-in',async (req:Request,res:Response)=>{
    const payload = {
        EmailId:req.query.emailid,
        Password:req.query.password
    }
    const user_schema = zod_signup_schema.safeParse(payload);
    if(!user_schema.success) res.status(411).json({message:"wrong inputs"}); 
    else
    {
        const user = await User.findOne({
            EmailId:payload.EmailId,
            Password:payload.Password
            });
        if(!user) res.status(411).json({message:"Email or Password is incorrect"}); 
        else {
            const userId = user._id;
            const token = jwt.sign({userId},JWT_SECRET);
            res.status(200).json({message:"Logged in Succesfully",token:token});
        }
    }
});


userRouter.put('/update_profile',authMiddleWare,async (req:Request,res:Response)=>{
    const payload = zod_update_schema.safeParse(req.body);
    if(!payload.success) res.status(411).json({message:"wrong inputs"}); 
    await User.findByIdAndUpdate(req.get('userId'),req.body);
    res.status(200).json({message:"Update Succesfull"});
});

userRouter.get('/bulk',authMiddleWare,async (req:Request,res:Response)=>
{
    const payload = zod_filter_schema.safeParse({UserName:req.query.filter});
    if(!payload.success) res.status(411).json({message:"wrong inputs"}); 
    const users:user =  await User.find({UserName:{'$regex':req.query.filter}});
    res.json({user:users.map(user => ({
        UserName:user.UserName,
        _id:user._id
    })
    )});
}); 

userRouter.get('/getid',(req:Request,res:Response)=>
{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) 
    {
        let PlayerId = GenerateId(6);
        players.push(PlayerId);
        res.json({playid:PlayerId});
    }
    else{
        const token = authHeader.split(' ')[1];
        jwt.verify(token,JWT_SECRET, (err:Error,decoded:any)=>{
            if(err) res.status(403).json({message:"You are not logged in"});
            else {
                if(decoded.userId) res.json({playid:decoded.userId});
                else res.status(403).json({message:"You are not logged in"});
            }
        });
    }
});