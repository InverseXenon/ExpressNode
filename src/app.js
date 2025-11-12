const express = require('express');
const connectDB = require("./config/db")
const User = require("./models/user")

const app = express();

app.use(express.json());

app.post("/signup", async (req,res)=>{
    console.log(req.body);

    try {
        const user = new User (req.body)

    await user.save();
    res.send("User Added Succesfully!")
    } catch (error) {
        res.send("User is not added.")
    }

    
})

// GET USER by email
app.get("/user", async (req,res)=>{
    const email = req.body.emailId;
    try{
        const user = await User.find({emailId: email});
        if(user.length ===0){
            res.status(400).send("USER NOT FOUND!")
        } else{
            res.send(user)
        }

        
    } catch(err){
        res.status(404).send("SOMETHING WENT WRONG!")
    }
    
})

// Feed API - GET /feed - get all the users form the database
app.get("/feed", async (req,res)=>{
    try{
        const users = await User.find({});
    }catch(err){
        res.status(404).send("SOMETHING WENT WRONG!")
    }
})

// DELETE API 
app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("USER DELETED SUCCESSFULLY!")
    } catch(err){
        res.status(404).send("SOMETHING WENT WRONG!")
    }
})

// UPDATE 
app.patch("/user", async (req,res)=>{
    const userId = req.body.userId; 
    const data = req.body;
    try{
        const user = await User.findByIdAndUpdate({_id : userId},data);
        res.send("USER UPDATED SUCCESSFULLY!")
    } catch(err){
        res.status(400).send("SOMETHING WENT WRONG!")
    }
})

connectDB().then(()=>{
    console.log("Database connection established....");
    app.listen(3000,()=>{
    console.log("Server is running on Port 3000.")
})
}).catch((err)=>{
    console.log("Database cannot be connected.")
})

