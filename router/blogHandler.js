const express = require ("express");
const router = express.Router();

const addBlog = require("../controllers/addBlog");
const openBlog = require("../controllers/openBlog");
const editBlog = require("../controllers/editBlog");
const deleteBlog = require("../controllers/deleteBlog");


router.get("/addBlog", (req,res) => {
    res.render("addBlog", {
        user : req.user,
        //to display name in nav bar
    })
});
router.get("/editBlog/:blogId", editBlog.getReq);


router.get("/deleteBlog/:blogId", deleteBlog);

router.post("/addBlog", addBlog);

router.get("/openBlog/:blogId", openBlog);
router.post("/editBlog/:blogId", editBlog.postReq);


module.exports = router;