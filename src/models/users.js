const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type : String
    },
    lastName:{
        type : String
    },
    age:{
        type : Number
    },
    mail:{
        type:String
    },
    password:{
        type: String
    }

})


const userModel = mongoose.model("user",userSchema);

module.exports = userModel;