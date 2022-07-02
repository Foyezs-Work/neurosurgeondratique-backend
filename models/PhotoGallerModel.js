const mongoose = require("mongoose");

const photoGallerModel = mongoose.Schema(
    {
        title: { type: String, required: true },
        photo: { type: String, required: true },
        status: { type: Boolean, default: false },
    },
    {
        timestaps: true,
    }
)

const photoGallery = mongoose.model("photoGallery", photoGallerModel);

module.exports = photoGallery