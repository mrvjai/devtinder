const express = require('express');
const app = express();
const DB = require('./config/datanase');
const userModel = require('./models/users')
const { userValidation } = require('../utils/validator')
const bcrypt = require('bcrypt')
const cookies = require('cookie-parser')
const jwt = require('jsonwebtoken')
const authentication = require('..//utils/auth')
const authRouter = require('./routers/auth');
const profileRouter = require('./routers/profile');
const requestRouter = require('./routers/request');
const userRouter = require('./routers/user')

app.use(express.json())
app.use(cookies())

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)
///CONNECTIONREQUEST
app.post('/connectionrequest', authentication, async (req, res) => {
    let userr = req.data;
    console.log("connection request sent ");

    res.send(`connection reqsent by ${userr.firstName}`)

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

