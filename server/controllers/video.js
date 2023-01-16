import { createError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

// Upload
export const addVideo = async (req, res, next) => {
    const newVideo = new Video({userId: req.user.id, ...req.body});
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo)
    } catch (err) {
        next(err)
    }
}

// Update
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "Video not Found"))
        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
                $set: req.body
            },
                {new: true}
            )
            res.status(200).json(updatedVideo)
        }else {
            return next(createError(403, "You can update only your video"))
        }
    } catch (err) {
        next(err)
    }
}

// Delete
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "Video not Found"))
        if(req.user.id === video.userId){
            await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("The video has been Deleted")
        }else {
            return next(createError(403, "You can delete only your video"))
        }
    } catch (err) {
        next(err)
    }
}

// Get
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (err) {
        next(err)
    }
}

// adding view to the page after a video is clicked
export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id,{
            $inc: {views:1}
        })
        res.status(200).json("A view is added")
    } catch (err) {
        next(err)
    }
}

// displaying random videos
export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{$sample: {size: 40}}])// if we use find() then its gonna sort the videos before return
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

// displaying trending videos
export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({views:-1})
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

// displaying subscribed channel's videos
export const sub = async (req, res, next) => {
    try {
        // we need to find our user first so we can know his subscribed channels,
            // using user bcz it is going to pass thru verifyToken first
        const user = await User.findById(req.user.id)
        // then we need to get the channels
        const subChannels = user.subscribedUsers;
        // creating a list and promise loop bcz we need to get all the subscribedUsers
        const list = await Promise.all(
            subChannels.map(channelId => {
                return Video.find({userId: channelId})
            })
            );// list was nested, so to avoid that we need to use flat()
            res.status(200).json(list.flat().sort((a,b)=> b.createdAt - a.createdAt))
    } catch (err) {
        next(err)
    }
}

// displaying videos searched by tags
export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",")
    try {
        const videos = await Video.find({tags: {$in: tags}}).limit(20)
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

// displaying videos searched by titles
export const search = async (req, res, next) => {
    const query = req.query.q
    try { // have to study $regex and other methods of mongoDB
        const videos = await Video.find({title: {$regex: query, $options: "i"},
    }).limit(20)
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}