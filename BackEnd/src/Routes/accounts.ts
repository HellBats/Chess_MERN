import express,{Request,Response} from 'express';
const { authMiddleWare } = require('../middlewares');
const { Accounts } = require('../database');

const accountsRouter = express.Router();



accountsRouter.get('/balance',authMiddleWare,async (req:Request,res:Response)=>{           
    const account =  await Accounts.findOne({UserId:req.get('userId')});
    res.json({balance:account.Balance})
})

module.exports = {accountsRouter}