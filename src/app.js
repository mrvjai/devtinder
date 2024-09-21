const express = require('express');
const app = express();
const DB = require('./config/datanase');
const userModel = require('./models/users')


app.post('/signup',async(req,res)=>{
    console.log(req.query.body)
    const userData = new userModel( {
        firstName:"vijay",
        lastName:"kumar",
        surName:"Nallagatla",
        age:26,
        gender:"Male"
    })

await userData.save();

res.send("data saved succesfully")

})


DB()
.then(()=>{
    console.log("connected succesfully");
    app.listen(7777, () => {
        console.log("app is listening on port:7777")
    })
})
.catch(()=>{
    console.log("not connected ......")
})

