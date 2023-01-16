import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt  from "jsonwebtoken";

export const signup = async(req, res, next)=> {
    try {
        // encrypt password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password: hash})
        await newUser.save();
        res.status(200).send('User has been Created')
    } catch (err) {
        next(err)
    }
}

export const signin = async(req, res, next)=> {
    try {
        const user = await User.findOne({name:req.body.name})
        if(!user) return next(createError(404, "User not Found"))
        // check password
        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isCorrect) return next(createError(404, "Incorrect Password"))
        // giving token to user to varify user when he does something on site and to keep him loggedin
        // token is a key element in user
        // JWT is a secret token hash for our users only
        const token = jwt.sign({id:user._id}, process.env.JWT)
        // stop password from going to server
        const {password, ...others} = user._doc;
        // giving token thru cookie it will make our site secure from 3rd parties
        res.cookie("access_token", token,{
            httpOnly: true
        }).status(200).json(others)
    } catch (err) {
        next(err)
    }
}

export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(user){
            const token = jwt.sign({ id: user._id}, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200).json(user._doc);
        }else{
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id}, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200).json(savedUser._doc);
        }
    } catch (err) {
        next(err)
    }
}