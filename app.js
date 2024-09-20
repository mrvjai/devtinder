const express = require('express');
const app = express();
const tes = require('./src/tes')


app.get('/user',(req,res)=>{
    res.send("Data fetched successfully!!")
})

app.post('/user',(req,res)=>{
    res.send("Data inserted successfully!!")
})

app.delete('/user',(req,res)=>{
    res.send("Data deleted successfully!!")
})

app.listen(7777,()=>{
    console.log("app is listening on port:7777")
})