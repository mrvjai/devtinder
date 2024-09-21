const mongoDB = require('mongoose');

const DB = async () =>{

    await mongoDB.connect("mongodb+srv://mrvjai:Vijaymongo@namastenode.sh0qd.mongodb.net/devTinder")

}



module.exports = DB