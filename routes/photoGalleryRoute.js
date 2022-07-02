const express = require("express");
const { photoGalleryCreate, getPhotosList, getSinglePhotos, updateSinglePhotos, deletePhoto } = require("../controllers/photoGalleryController");
const photoRouter = express.Router();

photoRouter.route('/add-photo').post(photoGalleryCreate)
photoRouter.route('/photos-list').get(getPhotosList)
photoRouter.route('/single-photo/:id').get(getSinglePhotos)
photoRouter.route('/update-photo').put(updateSinglePhotos)
photoRouter.route('/delete-photo/:id').delete(deletePhoto)

module.exports = photoRouter;