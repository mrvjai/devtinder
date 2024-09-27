const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 15,
        trim: true,

    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 15,
        trim: true,
    },
    age: {
        type: Number,
        min: 18
    },
    mail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        minLength: 5,
        maxLength: 100,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("send me valid mail id")
            }
        }

    },
    password: {
        type: String,
        required: true,
        minLength: 15,
        maxLength: 100,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("set strong passwrd ")
            }
        }
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("invalid gender details")
            }
        }
    },
    skills: {
        type: [String]
    }

}, {
    timestamps: true
}
)

//dont use arrow functions
userSchema.methods.passwordcheck= async function(passwordByUser){
const user = this;
const check = await bcrypt.compare(passwordByUser,user.password)

return check;

}


userSchema.methods.JWTcheck=async function(userid){
    const token = await jwt.sign({_id:userid},"DEV@1234")
    return token;
}


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;