const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const photoGallery = require("../models/PhotoGallerModel");

const photoGalleryCreate = asyncHandler(async (req, res) => {
    const { title, photo } = req.body;

    if (!title || !photo) {
        res.status(400);
        throw new Error("Title & Photo are required!");
    }

    const createdPhoto = await photoGallery.create({
        title,
        photo
    });

    if (createdPhoto) {
        res.status(201).json({
            _id: createdPhoto._id,
            title: createdPhoto.title,
            photo: createdPhoto.photo,
            message: "You have been successfully added new photo"
        });
    } else {
        res.status(400);
        throw new Error("Failed to add new photo in photo gallery");
    }
});


const getPhotosList = asyncHandler(async (req, res) => {


    const getPhotosList = await photoGallery.find({});

    if (getPhotosList) {
        res.status(201).json({
            getPhotosList,
            message: "Photos gallery fatched successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to fatch photos gallery");
    }
});
module.exports = { photoGalleryCreate, getPhotosList }