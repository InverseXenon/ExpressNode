const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter = express.Router();

// Get all the pending connection users of the loggedIn user
userRouter.get("/user/requests/received",userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested",
        }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about","skills"]);
        res.json({message: "Data fetched successfully!",
            data: connectionRequests,
        })

    } catch (error) {
        res.status(400).send("Error : " + error);
    }
})

userRouter.get("/user/connections",userAuth, async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {
                    toUserId: loggedInUser,
                    status: "accepted",
                },
                {
                    fromUserId : loggedInUser,
                    status: "accepted"
                }
            ]
            
        }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about","skills"]).
        populate(
            "toUserId",["firstName","lastName","photoUrl","age","gender","about","skills"]
        );

        const data = connectionRequests.map((row)=>
            {
                if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
                } else{
                   return row.fromUserId;
                }
            });

        res.json({message: "Data Fetched succesfully!",
            data 
        })
        
    } catch (error) {
        res.status(400).send("ERROR : " + error);
    }
})

module.exports = userRouter;