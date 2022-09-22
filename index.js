const express = require("express");
const connection = require("./connection/connection")
const path =require("path")
const bodyParser = require("body-parser");
const controller = require('./controller/index');
const app = express();
const {router} = require('./routers/router')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1',router)
app.use('/images',express.static(path.join(__dirname,"build/images")))

connection.connect.on('open',(err)=>{
  console.log('database connected successfully');
 })
app.listen(3000, (err) => {
  if (err) throw err;
  else console.log(`App Running on port 3000`);
});


