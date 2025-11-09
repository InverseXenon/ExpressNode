const express = require('express');

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth")

app.use("/admin",adminAuth)
app.use("/user",userAuth);

app.post("user/login",(req,res)=>{
    res.send("USER LOGGED IN SUCCESFULLY!")
})

app.get("/user",(req,res)=>{
    res.send("User Data SENT!")
})

app.get("/admin/getAllData",(req,res)=>{
    console.log("Sending All data.");
    res.send("ALL DATA SENT.")
})

app.get("/admin/deleteAllData",(req,res)=>{
    console.log("Deleting All data.");
    res.send("ALL DATA DELETED.")
})

app.listen(3000,()=>{
    console.log("Server is running on Port 3000.")
})