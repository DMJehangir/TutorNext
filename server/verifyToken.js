import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req,res,next)=> {
    const token = req.cookies.access_token
    //if no token means no user
    if(!token) return next(createError(401, "You are not Authenticated"))
    //there is token but not verified
    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return next(createError(403, "Invalid Token!"))
        req.user = user;
        next()
    })
}