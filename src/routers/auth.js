const userModel = require('../models/users')
const { userValidation } = require('../../utils/validator')
const bcrypt = require('bcrypt')
const cookies = require('cookie-parser')
const jwt = require('jsonwebtoken')
const authentication_use  = require('../../utils/auth')
const validator = require('validator')
const express = require('express');
const authRouter = express.Router();

//SIGNUP
authRouter.post('/signup', async (req, res) => {

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
authRouter.post('/login', async (req, res) => {

    const { mail, password } = req.body;
    try {
        const user = await userModel.findOne({ mail: mail });
        if (!user) {
            throw new Error("invalid credentials")
        }
        const isPassword = await user.passwordcheck(password)

        if (isPassword) {
            let token1 = await user.JWTcheck(user._id)
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


//logout
authRouter.post('/logout', async (req, res) => {

    try{
        res.cookie("token",null,{expires : new Date(Date.now())},)
        res.send("logged out succesfully")
    }
    catch (err) {
        res.status(400).send("invalid details" + err);
    }

})


//change pasword

authRouter.patch('/changepassword',authentication_use,async(req,res)=>{
try{
console.log("started")
const {oldPassword,newPassword}= req.body;
const newPassCheck = validator.isStrongPassword(newPassword);
if(!newPassCheck){
    throw new Error("password is not strong")
}
let userInfo = req.data;
let checkOld = await userInfo.passwordcheck(oldPassword)
if(!checkOld){
    throw new Error("Password enterd is not matched try again")
}
const newPass = await bcrypt.hash(newPassword,10);
userInfo.password=newPass;
await userInfo.save();
res.status(200).send(`${userInfo.firstName}, your password updated successfully`);
}
catch(err){
    res.status(400).send("main Password enterd is not matched try again "+err)
}

})

module.exports = authRouter;