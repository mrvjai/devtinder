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


const validateEditReqData=(req)=>{
try{
const editAllowed = ["firstName","lastName","age","skills","gender"]
let isvalid = Object.keys(req.body).every(x => editAllowed.includes(x));
return isvalid;
}
catch(err){
throw new Error("error ::"+err)
}

}



const validateUpdatedData = (req)=>{

const {firstName,lastName,age,skills,gender} = req.body;

if((firstName && firstName.length >10)|| (lastName && lastName.length>10)){
    throw new Error("first name or last name length not more than 10")
}
if(skills && skills.length >=5){
    throw new Error("skills not more than 5")

}



}

module.exports = {
    userValidation,validateEditReqData,validateUpdatedData
}