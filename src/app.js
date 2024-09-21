const express = require('express');
const app = express();
const DB = require('./config/datanase');
const userModel = require('./models/users')

app.use(express.json())


app.post('/signup', async (req, res) => {
    console.log(req.body)
    const userData = new userModel(req.body)

    await userData.save();

    res.send("data saved succesfully")

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

