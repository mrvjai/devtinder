const express = require('express');
const app = express();
const DB = require('./config/datanase');
const userModel = require('./models/users')
const { userValidation } = require('../utils/validator')
const bcrypt = require('bcrypt')
const cookies = require('cookie-parser')
const jwt = require('jsonwebtoken')
const authentication = require('..//utils/auth')
app.use(express.json())
app.use(cookies())

app.post('/signup', async (req, res) => {

    const { firstName, lastName, password, mail, age, skills, gender } = req.body;
    try {
        //user validation 
        userValidation(req);
        const hashPassword = await bcrypt.hash(password, 10)
        const userData = new userModel({
            firstName,
            lastName,
            mail,
            age,
            skills,
            gender,
            password: hashPassword
        })
        await userData.save();
        return res.send("data saved succesfully")

    }
    catch (err) {
        res.status(500).send("error in saving  data  " + err)
    }

})


//LOGIN
app.post('/login', async (req, res) => {

    const { mail, password } = req.body;
    try {
        const user = await userModel.findOne({ mail: mail });
        if (!user) {
            throw new Error("invalid credentials")
        }
        const isPassword = await bcrypt.compare(password, user.password)

        if (isPassword) {
            let token1 = await jwt.sign({ _id: user._id }, "Vijaytcs@3",{expiresIn: "180000s"})
            console.log(token1)
            res.cookie("token", token1,{expires:new Date(Date.now()+5*60000)})
            res.send("Login success!!!")
        }
        else {
            throw new Error("password is in correct")
        }
    }
    catch (err) {
        res.status(400).send("invalid details" + err);
    }

})


app.get('/profile', authentication,async (req, res) => {
    try {
   
        let data = req.data;
        // Send success response
        res.send(data);
    }
    catch (err) {
        res.status(400).send("invalid details" + err);
    }
})


app.post('/connectionrequest',authentication,async(req,res)=>{
let userr = req.data;
console.log("connection request sent ");

res.send(`connection reqsent by ${userr.firstName}` )

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

