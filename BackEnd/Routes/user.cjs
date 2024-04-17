const express = require('express');
const {zod_signin_schema,zod_signup_schema,zod_update_schema,zod_filter_schema} = require('../zod_validation.cjs');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config.cjs')
const {User} = require('../database.cjs')
const {authMiddleWare} = require('../middlewares.cjs')
const { GenerateId } = require("../Functions/PlayersAndRooms.cjs");
let {players} = require('../Functions/PlayersAndRooms.cjs')


userRouter.post('/sign-up',async (req,res)=>{
    const payload = req.body;
    const user_schema = zod_signin_schema.safeParse(payload);
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

userRouter.get('/sign-in',async (req,res)=>{
    const payload = req.body;
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


userRouter.put('/update_profile',authMiddleWare,async (req,res)=>{
    const payload = zod_update_schema.safeParse(req.body);
    if(!payload.success) res.status(411).json({message:"wrong inputs"}); 
    await User.findByIdAndUpdate(req.userId,req.body);
    res.status(200).json({message:"Update Succesfull"});
});

userRouter.get('/bulk',authMiddleWare,async (req,res)=>
{
    const payload = zod_filter_schema.safeParse({UserName:req.query.filter});
    if(!payload.success) res.status(411).json({message:"wrong inputs"}); 
    const users =  await User.find({UserName:{'$regex':req.query.filter}});
    res.json({user:users.map(user => ({
        UserName:user.UserName,
        _id:user._id
    })
    )});
}); 

userRouter.get('/getid',(req,res)=>
{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) 
    {
        let PlayerId = GenerateId(6);
        players.push(PlayerId);
        res.json({playid:PlayerId});
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token,JWT_SECRET, (err,decoded)=>{
        if(err) res.status(403).json({message:"You are not logged in"});
        else {
            if(decoded.userId) res.json({playid:decoded.userId});
            else res.status(403).json({message:"You are not logged in"});
        }
    }); 
});


module.exports = {userRouter};