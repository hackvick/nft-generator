const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const schema=mongoose.Schema
const userschema = new schema({
email:{
    type : String,
    
},
password : {
    type : String,
    require : true

},
contract_address : {
    type : String,
}



},{timestamps: true})

userschema.pre('save',async function(next){
    try{
        const salt= await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(this.password,salt)
        this.password= hashedPassword
        console.log(this,"this");
        next()      
    }catch(error)
    {
        next(error)
    }
})

const myUserdata = new mongoose.model("users",userschema)
module.exports = {myUserdata}