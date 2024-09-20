const express = require('express');
const app = express();

const { auth, validation } = require('../utils/auth')

app.use('/admin',auth)
app.use('/data',validation)

app.get('/admin/auth',(req,res,next)=>{
    res.send(" authorised user data will be sent soon...")
})

app.get('/data/val',(req,res)=>{
    res.send(" data validated,,,,'")
})



app.listen(7777, () => {
    console.log("app is listening on port:7777")
})