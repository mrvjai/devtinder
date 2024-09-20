const express = require('express');
const app = express();

app.get('/user',
    [
    (req, res, next) => {
        console.log("one")
        res.send("hello")
        next();
    },
    (req, res, next) => {
        console.log("two")
       next();
    },
    (req, res, next) => {
        console.log("three")
        next();
    },
    (req, res, next) => {
        console.log("four")
        next();
    },
    (req, res, next) => {
        console.log("five")
        res.send(`Hello world `)
    }]
)




app.listen(7777, () => {
    console.log("app is listening on port:7777")
})