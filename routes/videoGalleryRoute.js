const express = require("express");
const { createVideoItem, getVideoList, getSingleVideo, updateSingleVideo, deleteVideo } = require("../controllers/VideoGalleryController");
const videoRouter = express.Router();

videoRouter.route('/add-video').post(createVideoItem)
videoRouter.route('/video-list').get(getVideoList)
videoRouter.route('/single-video/:id').get(getSingleVideo)
videoRouter.route('/update-video').put(updateSingleVideo)
videoRouter.route('/delete-video/:id').delete(deleteVideo)

module.exports = videoRouter;