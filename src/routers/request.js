const authentication = require('../../utils/auth')
const express = require('express');
const connection = require('../models/connectionRequest')
const requestRouter = express.Router();
const user = require('..//models/users')
requestRouter.post(`/connectionrequest/:status/:id`, authentication, async (req, res) => {
    try {
        let userr = req.data;
        const fromUserId = userr._id
        console.log(fromUserId, "frommmm")
        const toUserId = req.params.id
        const status = req.params.status;
        const statusCheck = ["interested", "ignored"]
        if (!statusCheck.includes(status)) {
            res.status(400).json({ message: "status is not valid" + status })
        }
        //checking 

        const userData = await user.find({ _id: toUserId });
        if (!userData) {
            res.status(404).send("usr not found")
        }
        const validd = await connection.findOne({ $or: [{ fromUserId, toUserId }, { fromUserId: toUserId, toUserId: fromUserId },], });
        if (validd) {
            res.status(400).send("connection already present")
        }
        if (fromUserId.equals(toUserId)) {
            throw new Error("cannot send connecton req to urself")
        }
        const connectionInfo = new connection({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionInfo.save();
        const reqReceived = await user.findById({ _id: toUserId })
        res.json({
            message: `connection req sent to ${reqReceived.firstName}`,
            data
        })
    }
    catch (err) {
        res.status(400).send("req sending has issue" + err)
    }
})


//connection received

requestRouter.post('/request/view/:action/:userid', authentication, async (req, res) => {
    try {
        const loginedUser = req.data;
        console.log("logined user", loginedUser)
        const action = ["accepted", "rejected"];
        const action_did = req.params.action;
        const actionRecivedByuser = req.params.userid;
        if (!action.includes(action_did)) {
            res.status(400).send("action can't be performed");
        }
        const user_action = await connection.findOne({ fromUserId: actionRecivedByuser, toUserId: loginedUser._id, status: "Interested" });
        const requestedUserInfo = await user.findOne({ _id: actionRecivedByuser })
        if (!user_action) {
            res.status(400).send("action not able to do it")
        }
        user_action.status = action_did;
        await user_action.save()
        console.log(":checkk======", user_action)
        res.json({ message: `accepted ${requestedUserInfo.firstName}`, user_action })
    }
    catch (err) {
        res.status(400).send("error in sending acton" + err)
    }

})



module.exports = requestRouter