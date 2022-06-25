const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const photoGallery = require("../models/PhotoGallerModel");

/**
 * Photos Gallery Add
 */
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

/**
 * Photos Gallery List
 */
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

/**
 * Get Single Photos
 */
const getSinglePhotos = asyncHandler(async (req, res) => {


    const singlePhotos = await photoGallery.findById(req.params.id);

    if (singlePhotos) {
        res.status(201).json({
            singlePhotos,
            message: "Photos fatched successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to fatch photos");
    }
});

/**
 * update Single Photos
 */
const updateSinglePhotos = asyncHandler(async (req, res) => {

    const { _id, title, photo } = req.body;

    const updateOne = await photoGallery.updateOne({ _id }, {
        $set: {
            title: title,
            photo: photo
        }
    });

    if (updateOne) {
        res.status(201).json({
            message: "Photos updated successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to update photos");
    }
});


/**
 * Delete Single Photos
 */
 const deletePhoto = asyncHandler(async (req, res) => {

   const deletedPhoto = await photoGallery.findByIdAndDelete(req.params.id)

    if (deletedPhoto) {
        res.status(201).json({
            message: "Photos deleted successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to delete photos");
    }
});

module.exports = { photoGalleryCreate, getPhotosList, getSinglePhotos, updateSinglePhotos, deletePhoto }