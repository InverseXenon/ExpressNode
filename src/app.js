const express = require('express');

const app = express();

app.use("/test",(req,res)=>{
    res.send("Hello I am Piyush Patil")
})
app.use("/hello",(req,res)=>{
    res.send("Hello Hello Hello Hello")
})

app.listen(3000,()=>{
    console.log("Server is running on Port 3000.")
})