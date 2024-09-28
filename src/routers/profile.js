const bcrypt = require('bcrypt')
const cookies = require('cookie-parser')
const jwt = require('jsonwebtoken')
const authentication = require('../../utils/auth')
const { validateEditReqData, validateUpdatedData } = require('../../utils/validator')

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


module.exports = profileRouter;