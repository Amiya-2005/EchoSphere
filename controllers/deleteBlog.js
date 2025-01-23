const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const cloudinary = require("cloudinary");


module.exports = async (req,res) => {
    console.log("Delete getter called.");

    console.log("Blog Id is : ", req.params.blogId);

    const user = req.user;
    user._id = new mongoose.Types.ObjectId(user._id);     //converting string to objectId to compare using .equals() in frontend
    

    const thisBlog = await Blog.findById(req.params.blogId);
    const authorId = thisBlog.createdBy;


    if( ! authorId.equals(user._id)){

        console.log("Current user : ", user._id);
        console.log("Author user : ", authorId);

        const allBlogs = await Blog.find({}); 

        return res.render("home",{
            user : req.user,
            message : "<strong>Warning!</strong> You can't delete someone else's blog.",
            success : false, 
            allBlogs,
        });
    }

    await Blog.findByIdAndDelete(req.params.blogId);

    const coverImagePublicId = thisBlog.coverImagePublicId;

    if(coverImagePublicId){
        try{
            await cloudinary.uploader.destroy(coverImagePublicId);
            console.log("Image removed from cloudinary successfully.")
        } 
        catch(error){
            console.log("Image could not be removed from cloudinary.");
            console.error(error);
        }
    }
    

    const allBlogs = await Blog.find({}); 

    return res.render("home", {
        success : true,
        message : "<strong>Success!</strong> Blog deleted successfully.",
        user : req.user,
        allBlogs
    });
}