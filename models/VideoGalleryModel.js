const mongoose = require("mongoose");

const VideoGalleryModel = mongoose.Schema(
    {
        videoTitle: { type: String, required: true },
        videoThumbnail: { type: String, required: true },
        videoLink: { type: String, required: true },
        videoStatus: { type: Boolean, default: false },
    },
    {
        timestaps: true,
    }
)

const videoGallery = mongoose.model("videoGallery", VideoGalleryModel);

module.exports = videoGallery