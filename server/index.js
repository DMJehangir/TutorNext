import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import commentRoutes from './routes/comments.js'
import videoRoutes from './routes/videos.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser())
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.db_url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('DB Connected')
    }).catch(err=>{
        throw err
    })
}

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/comments', commentRoutes)

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong"
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

const PORT = 8800;
app.listen(PORT, ()=>{
    connect()
    console.log('Server Listening on Port ' + PORT)})