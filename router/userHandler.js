const express = require ("express");
const router = express.Router();

const login = require("../controllers/login");
const signup = require("../controllers/signup");


router.get("/login", (req,res) => {
    return res.render("login",{
        user : req.user
    });
})
router.get("/logout", (req,res) => {
    res.clearCookie("token");
    return res.redirect("/home");
})

router.get("/signup", (req,res) => {
    return res.render("signup",{
        user : req.user
    });
})




router.post("/signup", signup);
router.post("/login", login);



module.exports = router;