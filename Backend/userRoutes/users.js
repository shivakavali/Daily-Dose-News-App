//packages

const express = require('express');
const userRoute = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//files
const User = require('../Models/userModel');
// const UserPosts = require('../Models/savedPostModel');


userRoute.post('/Signup', async (req, res)=>{

    const newUser = req.body;
    const rawPass = newUser.password;
    const hashedPass = await bcrypt.hash(rawPass, 10);
    newUser.password = hashedPass;
    
    console.log(rawPass);
    console.log(newUser);
    
    try{
        const existingUser = await User.find({email:newUser.email});
        
        if(existingUser.length > 0) res.status(200).json({success:false, msg:"User already exist, please login"});
        
        else{
            const user = new User(newUser);
            await user.save();
            res.status(200).json({success:true, msg:"User registered, please login!"});
        }
    }
    catch(e){
        res.status(500).json({success:false, msg:e});
    }

})


const generateAccessToken = (user)=>{
    return jwt.sign(user, 'cf39c3d099681ccf22bd6025656fb4a8', {expiresIn:'1d'})
}

userRoute.post('/Signin', async (req, res)=>{
    const data = req.body;
    console.log(data.email, " ", data.password);

    try{
        
        let user = await User.findOne({email:data.email});
        console.log(user);
        if(user){
            const iscorrectPass = await bcrypt.compare(data.password, user.password);
            if(iscorrectPass) {

                const accessToken = generateAccessToken(user.toJSON());
                console.log(accessToken); 
                res.status(200).json({success:true, msg:"Login Successful", token:accessToken});

            }
            else res.status(400).json({success:false, msg:"Incorrect password"});
        }
        
        else res.status(400).json({success:false, msg: "User doesn't exist, please register!"});
    
    }catch(e){
        res.status(500).json({success:false, msg:e});
    }
})


userRoute.post('/saveposts', async (req, res)=>{
    const data = req.body;
    

    res.status(200).json({status:true, msg:"Item saved"});
})





// userRoute.post('/Signout', async (req, res)=>{
    
//     const data = req.body;
//     console.log(data.email, " ", data.password);
    
//     try{
        
//         let user = await User.findOne({email:data.email});
//         console.log(user);
//         if(user){
//             if(user.password === data.password) res.status(200).json({success:false, msg:"Login Successful"});
//             else res.status(400).json({success:false, msg:"Incorrect password"});
//         }
//         else res.status(400).json({success:false, msg: "User doesn't exist, please register!"});

//     }catch(e){
//         res.status(500).json({success:false, msg:e});
//     }  
// })

module.exports = userRoute;