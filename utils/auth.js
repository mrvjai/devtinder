const auth=(req,res,next)=>{
    const token = 179979706;   //req.body.token
    const Authorised = token === 1779706
    if(!Authorised){
        res.send("user is not authorsed")
    }
    else{
        next();
    }
}

const validation=(req,res,next)=>{
    const passwd = "Adsdsd";   //req.body.token
    const validated = passwd === "Adsdsd"
    if(!validated){
        res.send("user is not validated")
    }
    else{
        next();
    }
}

module.exports = {auth, validation}