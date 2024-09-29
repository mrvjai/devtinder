const mongoose = require('mongoose');


const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    status: {
        type: "string",
        required: true,
        enum: {
            values: ["ignored", "interested", "rejected", "accepted"],
            message: `{value} is not correct`
        }
    }
},
    { timeStamps: true })




const ConnectiontModel = new mongoose.model("connectionsStatus", connectionRequestSchema);

module.exports = ConnectiontModel;