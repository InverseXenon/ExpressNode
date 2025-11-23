const express = require('express');

const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");


requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user = req.user;
    console.log("Sending a Connection Req.");
    res.send(user.firstName+" sent a Connection Request Sent!");
})


module.exports = requestRouter;