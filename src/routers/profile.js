const bcrypt = require('bcrypt')
const cookies = require('cookie-parser')
const jwt = require('jsonwebtoken')
const authentication = require('../../utils/auth')

const express = require('express');

const profileRouter = express.Router();
profileRouter.get('/profile', authentication,async (req, res) => {
    try {
   
        let data = req.data;
        // Send success response
        res.send(data);
    }
    catch (err) {
        res.status(400).send("invalid details" + err);
    }
})


module.exports = profileRouter;