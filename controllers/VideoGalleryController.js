const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const videoGallery = require("../models/VideoGalleryModel");

/**
 * Photos Gallery Add
 */
const createVideoItem = asyncHandler(async (req, res) => {
    const { videoTitle, videoThumbnail, videoLink } = req.body;

    if (!videoTitle || !videoThumbnail || !videoLink) {
        res.status(400);
        throw new Error("Video title, thumbnail & video link are required!");
    }

    const createdVideo = await videoGallery.create({
        videoTitle,
        videoThumbnail,
        videoLink
    });

    if (createdVideo) {
        res.status(201).json({
            _id: createdVideo._id,
            videoTitle: createdVideo.videoTitle,
            videoThumbnail: createdVideo.videoThumbnail,
            videoLink: createdVideo.videoLink,
            videoStatus: createdVideo.videoStatus,
            message: "You have successfully added a new video"
        });
    } else {
        res.status(400);
        throw new Error("Failed to add new video in video gallery");
    }
});

/**
 * Photos Gallery List
 */
const getVideoList = asyncHandler(async (req, res) => {
    const getVideoList = await videoGallery.find({});

    if (getVideoList) {
        res.status(201).json({
            getVideoList,
            message: "Video gallery loaded successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to load video gallery");
    }
});

/**
 * Get Single Photos
 */
const getSingleVideo = asyncHandler(async (req, res) => {


    const singleVideo = await videoGallery.findById(req.params.id);

    if (singleVideo) {
        res.status(201).json({
            singleVideo,
            message: "Video loaded successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to load video");
    }
});

/**
 * update Single Photos
 */
const updateSingleVideo = asyncHandler(async (req, res) => {

    const { _id,  videoTitle, videoThumbnail, videoLink, videoStatus } = req.body;

    const updateOne = await videoGallery.updateOne({ _id }, {
        $set: {
            videoTitle: videoTitle,
            videoThumbnail: videoThumbnail,
            videoLink: videoLink,
            videoStatus: videoStatus
        }
    });

    if (updateOne) {
        res.status(201).json({
            message: "Update done successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to update");
    }
});


/**
 * Delete Single Photos
 */
const deleteVideo = asyncHandler(async (req, res) => {

    const deletedVideo = await videoGallery.findByIdAndDelete(req.params.id)

    if (deletedVideo) {
        res.status(201).json({
            message: "Video deleted successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to delete video");
    }
});

module.exports = { createVideoItem, getVideoList, getSingleVideo, updateSingleVideo, deleteVideo }