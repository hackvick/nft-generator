const mongoose =require("mongoose")

const url  = "mongodb+srv://vickyhasija1:mongo123@cluster0.xwsm3.mongodb.net/nft-gen?retryWrites=true&w=majority"

mongoose.connect(url,{
    useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true,
})

const connect = mongoose.connection;
module.exports = {connect}