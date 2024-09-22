const validator = require('validator')
const userValidation = (req) =>{

    const {firstName,lastName,password,mail,skills,age} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
   
const passwordCheck = validator.isStrongPassword(password);

if(!passwordCheck){
    throw new Error("Password is not Strong");
}

const mailCheck = validator.isEmail(mail);
if(!mailCheck){
    throw new Error("Pleae give vaid mail id");
}

let det2 = skills.length
if (det2 > 10) {
    throw new Error("the skills are not more than 10")

}
if(age < 18){
    throw new Error("minimum 18 age is required")
}

}


module.exports = {
    userValidation
}