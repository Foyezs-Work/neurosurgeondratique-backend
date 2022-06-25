const express = require("express");
const { photoGalleryCreate, getPhotosList } = require("../controllers/photoGalleryController");
const photoRouter = express.Router();

photoRouter.route('/').post(photoGalleryCreate)
photoRouter.route('/photos-list').get(getPhotosList)

module.exports = photoRouter;