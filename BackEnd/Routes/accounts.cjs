const express = require('express');
const { authMiddleWare } = require('../middlewares.cjs');
const { Accounts } = require('../database.cjs');
const mongoose = require('mongoose');

const accountsRouter = express.Router();



accountsRouter.get('/balance',authMiddleWare,async (req,res)=>{           
    const account =  await Accounts.findOne({UserId:req.userId.userId});
    res.json({balance:account.Balance})
})


accountsRouter.post('/transfer',authMiddleWare,async (req,res)=>{
    const session = await mongoose.startSession();
    await session.startTransaction();
    const sender_account = await Accounts.findOne({UserId:req.userId}).session(session);
    const reciever_account = await Accounts.findOne({UserId:req.body.to}).session(session);
    console.log(req.userId,req.body.to);
    if(!reciever_account){
        await session.abortTransaction();
        res.status(400).json({message:"Invalid account"});
    }
    if(sender_account.Balance<req.body.amount){
        await session.abortTransaction();
        res.status(400).json({message:"Insufficient Balance"});
    }
    await Accounts.findOneAndUpdate({UserId:req.userId},{$inc:{Balance: -req.body.amount}}).session(session);
    await Accounts.findOneAndUpdate({UserId:req.body.to},{$inc:{Balance: req.body.amount}}).session(session);

    await session.commitTransaction();
    res.json({message:"Transacition Successfull"});
}); 

module.exports = {accountsRouter}