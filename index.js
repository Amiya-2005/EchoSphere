const express = require("express");
const app = express();

require("dotenv").config();
require("./config/database").dbConnect();
require("./config/cloudinary").cloudinaryConnect();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : "./tmp/",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
}));
//this comes before body parser else that takes the whole ip as body and it gets null

const userHandler = require("./router/userHandler");
const blogHandler = require("./router/blogHandler");

const cookieParser = require("cookie-parser");
const checkForAuthenticationCookie = require("./middlewares/Authentication");

const Blog = require("./models/Blog");

const PORT = process.env.PORT || 4000;


app.use(express.static(path.resolve("public")));



app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
//cookieParser is a factory function which gives middleware functions as op so to use middle wares we need to write cookieParser()  i.e called the factory function
app.use(checkForAuthenticationCookie("token"));


app.use("/blog", blogHandler);
app.use("/user", userHandler);
//wrote it at last so that token will have been generated before routing 

app.get("/" , (req,res) =>{
    res.redirect("/home");
});
app.get("/home", async (req,res) => {
    const allBlogs = await Blog.find({}); 

    res.render("home", {
        user : req.user,
        allBlogs
    });
});

//for redirect
//if you get any better approach update here
app.post("/home", async (req,res) => {
    const allBlogs = await Blog.find({}); 

    res.render("home", {
        user : req.user,
        allBlogs
    });
})





app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})