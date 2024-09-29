const { validateEditReqData, validateUpdatedData } = require('../../utils/validator')
const authentication_use = require('../../utils/auth')
const express = require('express');
const userRouter = express.Router();
const connection = require('../models/connectionRequest')
//connection requests checking
userRouter.get("/user/requests", authentication_use, async (req, res) => {
    try {
        const data = req.data;
        const check_connectiondb = await connection.find({ toUserId: data._id }).populate("fromUserId", "firstName lastName");
        if (!check_connectiondb) {
            res.status(400).send("no requests")
        }
        res.json({
            message: "requested users list",
            check_connectiondb
        })
    }
    catch (err) {
        res.status(400).send("error on checking reqs")
    }

})

//connections...

userRouter.get("/user/connections", authentication_use, async (req, res) => {
    try {
        const logineduser = req.data;

        const checking = await connection.find({
            $or: [{ fromUserId: logineduser._id, status: "accepted" }, { toUserId: logineduser._id }]
        })

        if (!checking) {
            res.status(400).send("No connections")
        }

        const dd = await checking.populate("fromUserId", "firstName lastName").populate("toUserId", "firstName last Name")

        const infoo = dd.map(x => {
            if (x.fromUserId === logineduser._id) {
                return toUserId
            }
        });

        res.json({
            message: "connection req found",

        })
    }
    catch (err) {
        res.status(400).send("error in checking connections")
    }


})



module.exports = userRouter;



