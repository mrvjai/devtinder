const authentication = require('../../utils/auth')
const express = require('express');
const requestRouter = express.Router();
requestRouter.post('/connectionrequest',authentication,async(req,res)=>{
    let userr = req.data;
    console.log("connection request sent ");
    
    res.send(`connection reqsent by ${userr.firstName}` )
    
    });



    module.exports = requestRouter;

