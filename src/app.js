const express = require('express');
const connectDB = require("./config/db")
const User = require("./models/user")

const app = express();

app.post("/signup", async (req,res)=>{
    try {
        const user = new User ({
        firstName: "Sachin",
        lastName: "Tendulkar",
        emailId: "st@gmail.com",
        password: "sachin@123",
        age: 52,
        gender: "Male"
    })

    await user.save();
    res.send("User Added Succesfully!")
    } catch (error) {
        res.send("User is not added.")
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

