const express = require('express')
const controller = require('../controller/index')

const router = express.Router();

router.post( "/upload",controller.upload,controller.NFTgen)
router.post("/signup",controller.signup)
router.post("/login",controller.login)


module.exports = {router}