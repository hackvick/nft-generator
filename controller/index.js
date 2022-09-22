const fs = require("fs");
const { config } = require("process");
const upload = require("../services/fileUploadService");
const {layers} = require('../src/config')
const {buildSetup,createFiles,createMetaData,Canvas} = require('../src/main');
const myUserdata = require('../models/signup')
const bcrypt = require('bcrypt')
const basepath = process.cwd()
const buildDir = `${basepath}/build/images`
module.exports.upload = function(req,res,next){
    let filedir = "./layers";
    fs.readdirSync(filedir).forEach((folder) => {
      fs.readdirSync(filedir + "/" + folder).forEach((file) => {
        fs.unlinkSync(filedir + "/" + folder + "/" + file);
      });
      fs.rmdirSync(filedir + "/" + folder);
    });
    req.layers = [];
    upload.NFtimg.any()(req, res, next);
}


module.exports.NFTgen = async function(req,res){
    if(req.fileValidationError){
        res.send(req.fileValidationError);
    }else{
        let width = parseInt(req.body.width);
        let height = parseInt(req.body.height);
        Canvas(width,height);
        let filedir = "./layers";
        let layersOrder = [];
        for(let i =0;i<req.layers.length;i++){
          let files = fs.readdirSync(filedir + "/" + req.layers[i]);
            layersOrder.push({name:req.layers[i],number:files.length})
        };
        console.log(layersOrder);
        let _edition = req.body.edition
        buildSetup();
        await createFiles(layersOrder,_edition);
        createMetaData();
        let nfts = fs.readdirSync(buildDir).map((name)=>
          `/images/${name}`
        )
       res.send({nfts})
    }
    
}


module.exports.signup = async function(req,res){
  let data = req.body ;
  console.log(data,"ad")
  let alreadyExists = await myUserdata.myUserdata.findOne({email:req.body.email})
    if (alreadyExists){
      res.send("User already exists")
    }else{
      await myUserdata.myUserdata(data).save()
      res.send("Thanks for registration")
    }
}

module.exports.login = async function(req,res){
  console.log(req.body,"body");
  let {email,password} = req.body
  console.log({email,password},"credantials");
  let userExists = await myUserdata.myUserdata.findOne({email:email})
  if (!userExists){
    res.send("User doesn't exist")
}else{
  if (await bcrypt.compare(password, userExists.password)){
    res.send("User Matched")
  }else{
    res.send("wrong password")
  }
}}