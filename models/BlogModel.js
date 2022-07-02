const mongoose = require("mongoose");

const BlogModel = mongoose.Schema(
    {
        blogTitle: { type: String, required: true },
        blogBanner: { type: String, required: false },
        blogDetails: { type: String, required: true },
    },
    {
        timestaps: true,
    }
)

const blog = mongoose.model("blog", BlogModel);

module.exports = blog