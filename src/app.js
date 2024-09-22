const express = require('express');
const app = express();
const DB = require('./config/datanase');
const userModel = require('./models/users')
const { userValidation } = require('../utils/validator')
const bcrypt = require('bcrypt')
app.use(express.json())


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

        if (isPassword === false) {
            throw new Error("password is in correct")
        }
        else {
            res.send("Login success!!!")
        }
    }

    catch (err) {
        res.status(400).send("invalid details" + err);
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
app.get('/fetch/all', async (req, res) => {
    try {
        const userEmail = req.body.age;
        const resp = await userModel.find({ age: userEmail }, { firstName: 1, lastName: 1 })
        res.send(resp)
    }
    catch (err) {
        res.send("err")
    }

})



app.delete('/deleteuser', async (req, res) => {
    const userEmail = req.body.mail;
    try {
        const resp2 = await userModel.find({ mail: userEmail });
        console.log(resp2)
        if (resp2.length === 0) {
            res.send("user not found");
        }
        else {
            await userModel.deleteOne({ mail: userEmail })
            res.send("ddleted user")
        }
    }
    catch (err) {
        res.status(500).send("porblem deleting user")
    }
})



app.patch('/userupdate/:userId', async (req, res) => {
    const userid = req.params?.userId;
    const det2 = req.body;
    try {
        const updateDetails = ["firstName", "lastName", "age", "password", "skills", "gender"];
        const info = Object.keys(det2).every(k => updateDetails.includes(k))
        console.log(info)
        if (!info) {
            throw new Error("the mail can't able to change")
        }
        if (det2.skills.length > 10) {
            throw new Error("the skills not more than 10")

        }
        const resp = await userModel.find({ _id: userid })
        console.log(resp)
        if (resp.length === 0) {
            res.send("user not found")
        }
        else {
            await userModel.findByIdAndUpdate({ _id: userid }, det2)
            res.send("user updated")
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send("error in data updation" + err)
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

