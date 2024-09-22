const express = require('express');
const app = express();
const DB = require('./config/datanase');
const userModel = require('./models/users')

app.use(express.json())


app.post('/signup', async (req, res) => {
    const userData =req.body.mail;

try{
    const res1=await userModel.find({mail:userData})
if(res1.length>0){
    return res.send("user exist with this mailid")
}
 

    try {
        const userData = new userModel(req.body)

        await userData.save();

        return res.send("data saved succesfully")
    }
    catch (err) {
        res.status(500).send("error in daving data")
    }}
    catch (err) {
        res.status(500).send("error in fetching data")
    }  

})

//find by mail id
app.get('/fetch', async (req, res) => {
    console.log(req.query)
    try {

        const userEmail = req.body.mail;
        if (!userEmail) {
            res.send("please give mail")
        }
        const resp = await userModel.findOne({ mail: userEmail })
        if (resp.length === 0) {
            res.send("mail not found")
        }
        res.send(resp)
    }
    catch (err) {
        res.status(404).send("error in daving data")
    } 

})

// find all users
app.get('/fetch/all',async (req,res)=>{
    try{
    const userEmail = req.body.mail;
    const resp=await userModel.find({mail:userEmail},{firstName:1,lastName:1})
    res.send(resp)
    }
    catch(err){
        res.send("err")
    }

})



app.delete('/deleteuser',async (req,res)=>{
    const userEmail = req.body.mail;
    console.log(userEmail)
    try{
    const resp2=await userModel.find({mail:userEmail});
    console.log(resp2)
    if(resp2.length === 0){
        res.send("user not found")
        await userModel.deleteOne({mail:userEmail})
        res.send("ddleted user")
    }
    else{
        await userModel.deleteMany({mail:userEmail})
        res.send("ddleted user")
    }
    }
    catch(err){
    res.status(500).send("porblem deleting user")
    }
})



app.put('/userupdate',async(req,res)=>{
    
    const det = req.body.mail;
    const det2 = req.body.updatedemail;
    console.log(det)
    try{
        const resp = await userModel.find({mail : det})
        console.log(resp)
        if(resp.length === 0){
            res.send("user not found")
        }
        else{
            await userModel.updateMany({mail:det},{$set:{mail:det2}})
            res.send("user updated")
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send("error in data updation")
    }
})

DB()
    .then(() => {
        console.log("connected succesfully");
        app.listen(7777, () => {
            console.log("app is listening on port:7777")
        })
    })
    .catch(() => {
        console.log("not connected ......")
    })

