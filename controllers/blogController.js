const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const blog = require("../models/BlogModel");

/**
 * Photos Gallery Add
 */
const createBlog = asyncHandler(async (req, res) => {
    const { blogTitle, blogBanner, blogDetails } = req.body;

    if (!blogTitle || !blogDetails) {
        res.status(400);
        throw new Error("Blog title & details are required!");
    }

    const createBlog = await blog.create({
        blogTitle,
        blogBanner,
        blogDetails
    });

    if (createBlog) {
        res.status(201).json({
            _id: createBlog._id,
            blogTitle: createBlog.blogTitle,
            blogBanner: createBlog.blogBanner,
            blogDetails: createBlog.blogDetails,
            message: "You have successfully added a new blog!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to add new blog.");
    }
});

/**
 * Photos Gallery List
 */
const getBlogList = asyncHandler(async (req, res) => {
    const getBlogList = await blog.find({});

    if (getBlogList) {
        res.status(201).json({
            getBlogList,
            message: "Blog list loaded successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to load blog list");
    }
});

/**
 * Get Single Photos
 */
const getSingleBlog = asyncHandler(async (req, res) => {


    const singleBlog = await blog.findById(req.params.id);

    if (singleBlog) {
        res.status(201).json({
            singleBlog,
            message: "Blog loaded successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to load blog");
    }
});

/**
 * update Single Photos
 */
const updateSingleBlog = asyncHandler(async (req, res) => {

    const { _id, blogTitle, blogBanner, blogDetails } = req.body;

    const updateOne = await blog.updateOne({ _id }, {
        $set: {
            blogTitle: blogTitle,
            blogBanner: blogBanner,
            blogDetails: blogDetails,
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
const deleteBlog = asyncHandler(async (req, res) => {

    const deletedBlog = await blog.findByIdAndDelete(req.params.id)

    if (deletedBlog) {
        res.status(201).json({
            message: "Blog deleted successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to delete blog");
    }
});

module.exports = { createBlog, getBlogList, getSingleBlog, updateSingleBlog, deleteBlog }