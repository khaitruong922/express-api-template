const express = require("express");
const User = require('../models/user');

const app = express();

app.post("/login", async (req,res)=>{
    const {username, password} = req.body;
    const err = {};
    //TODO Check user in the database
    const user = await User.findOne({username});
    if (!user){
        throw new Error("Tài khoản chưa được đăng ký.");
    } else {
        
    }
})