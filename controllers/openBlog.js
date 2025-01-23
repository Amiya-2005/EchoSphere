const Blog = require("../models/Blog");
const User = require("../models/User");
const mongoose = require("mongoose");


module.exports = async (req,res) => {
    const blogId = req.params.blogId;
    const specificBlog = await Blog.findById(blogId);

    console.log("Cov" ,specificBlog.coverImageUrl);

    const authorId = specificBlog.createdBy;
    const author = await User.findById(authorId);
    specificBlog.authorName = author.fullName;


    console.log("Author : ",specificBlog.createdBy);


    const user = req.user;

    if(user) user._id = new mongoose.Types.ObjectId(user._id);     //converting string to objectId to compare using .equals() in frontend

    console.log("User : ",req.user);
    console.log("Specific Blog : ",specificBlog);

    console.log(specificBlog.title);



    //Don't print these (Only for debugging when loggedin)
    // console.log("Printing types: ");
    // console.log(typeof user._id, user._id.constructor.name); // Should show 'object' and 'ObjectId'
    // console.log(typeof specificBlog.createdBy, specificBlog.createdBy.constructor.name); // Should show 'object' and 'ObjectId'
    
    return res.render("openBlog", {
        user,
        specificBlog
    });

}