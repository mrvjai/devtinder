const bcrypt = require('bcrypt')
const cookies = require('cookie-parser')
const jwt = require('jsonwebtoken')
const authentication = require('../../utils/auth')
const { validateEditReqData, validateUpdatedData } = require('../../utils/validator')
const authentication_use = require('../../utils/auth')
const express = require('express');

const profileRouter = express.Router();
profileRouter.get('/profile/view', authentication, async (req, res) => {
    try {

        let data = req.data;
        // Send success response
        res.send(data);
    }
    catch (err) {
        res.status(400).send("invalid details" + err);
    }
})

profileRouter.patch('/profile/edit', authentication, async (req, res) => {
    try {
        if (!validateEditReqData(req)) {
            throw new Error("these details cant be updated")
        }
        validateUpdatedData(req)
        const loginedUser = req.data;
        console.log(loginedUser)
        Object.keys(req.body).forEach((key) => loginedUser[key] = req.body[key]);
        console.log(loginedUser)
        await loginedUser.save()
        res.status(200).send(`${loginedUser.firstName} data update successfully`);
    }
    catch (err) {
        res.status(400).send("invalid details" + err);
    }
})

//change pasword

profileRouter.patch('/changepassword', authentication_use, async (req, res) => {
    try {
        console.log("started")
        const { oldPassword, newPassword } = req.body;
        const newPassCheck = validator.isStrongPassword(newPassword);
        if (!newPassCheck) {
            throw new Error("password is not strong")
        }
        let userInfo = req.data;
        let checkOld = await userInfo.passwordcheck(oldPassword)
        if (!checkOld) {
            throw new Error("Password enterd is not matched try again")
        }
        const newPass = await bcrypt.hash(newPassword, 10);
        userInfo.password = newPass;
        await userInfo.save();
        res.status(200).send(`${userInfo.firstName}, your password updated successfully`);
    }
    catch (err) {
        res.status(400).send("main Password enterd is not matched try again " + err)
    }

})


module.exports = profileRouter;