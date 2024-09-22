const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type : String,
        required:true,
        minLength:4,
        maxLength:15,
        trim:true,

    },
    lastName:{
        type : String,
        required:true,
        minLength:4,
        maxLength:15,
        trim:true,
    },
    age:{
        type : Number,
        required:true,
        min:18
    },
    mail:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
        minLength:5,
        maxLength:100,

    },
    password:{
        type: String,
        required:true,
        minLength:5,
        maxLength:50,
    },
    gender:{
        type:String,
        required:true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("invalid gender details")
            }
        }
    },
    skills:{
        type:[String]
    }

},{
    timestamps:true
})


const userModel = mongoose.model("user",userSchema);

module.exports = userModel;