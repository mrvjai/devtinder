const express = require('express');
const app = express();
const tes = require('./src/tes')


app.use("/hi",(req,res)=>{
res.send("hi vijay good to see you")
})

app.use("/hello",(req,res)=>{
    res.send("hi hello")
    })

    app.use("/namaste",(req,res)=>{
        res.send("hi hello namaste vankam")
        })

app.listen(7777,()=>{
    console.log("app is listening on port:7777")
})