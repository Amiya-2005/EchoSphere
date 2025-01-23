const Blog = require("../models/Blog");
const cloudinary = require("cloudinary").v2;

async function uploadFileToCloudinary(file, folder, quality){
    const options = {
        folder,
        resource_type: "auto",
    };
    if(quality) options.quality = quality;

    console.log("Options : ");
    console.log(options);

    try{
        const up = await cloudinary.uploader.upload(file.tempFilePath, options);
        return up;
    } 
    catch(error){
        console.log("Could not connect to cloudinary.");
        console.error(error);
    }
}

module.exports = async (req,res) => {

    const {title, body} = req.body;
    console.log(req.user);

    console.log("Files : ", req.files);

    let coverImage;

    if(req.files) coverImage = req.files.coverImage;

    const blog = new Blog({
        title,
        body,
        createdBy : req.user._id,
    });

    console.log("Email of author : ", req.user.email);
    if(coverImage) {
        
        try{

            const up = await uploadFileToCloudinary(coverImage, "Abc_Cloud");

            console.log("Upload details : ", up);


            blog.coverImageUrl = up.secure_url;
            blog.coverImagePublicId = up.public_id;

            console.log("Image uploaded link", blog.coverImageUrl);

        }
        catch(error){
            console.log("Img Could not be uploaded to cloudinary.");

            console.log(error);
            
        }
    }

    await blog.save();
    console.log("Blog : ", blog);

    console.log("blog created", blog);



    return res.render("addblog", {
        success : true,
        message : "<strong>Success!</strong> Blog created successfully.",
        user : req.user,
    });


}