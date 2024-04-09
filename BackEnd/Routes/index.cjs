const express = require('express');
const { userRouter } = require('./user.cjs');
const { accountsRouter } = require('./accounts.cjs');

const router = express.Router();

router.use('/user',userRouter);
router.use('/account',accountsRouter);

module.exports = {router};