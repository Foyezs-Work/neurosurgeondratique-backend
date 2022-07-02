const express = require("express");
const { createBlog, getBlogList, getSingleBlog, updateSingleBlog, deleteBlog, } = require("../controllers/blogController");
const blogRouter = express.Router();

blogRouter.route('/add-blog').post(createBlog)
blogRouter.route('/blog-list').get(getBlogList)
blogRouter.route('/single-blog/:id').get(getSingleBlog)
blogRouter.route('/update-blog').put(updateSingleBlog)
blogRouter.route('/delete-blog/:id').delete(deleteBlog)

module.exports = blogRouter;