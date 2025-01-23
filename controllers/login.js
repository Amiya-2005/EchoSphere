const {createToken} = require("../utils/auth");
const User = require("../models/User");
const bcrypt = require("bcrypt");


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});

        if(!user){
            console.log("Please sign up first.");

            return res.render("signup",{
                user : req.user,
                message : "Please signup first."
            });
        }

        const hashedPassword = user.password;
        if( ! await bcrypt.compare(password, hashedPassword)){

            console.log("Incorrect password.");

            return res.render("login",{
                user : req.user,
                message : "Incorrect password.",
            });
        }  

        user.password = undefined;
        const token = createToken(user);

        console.log("User loggedIn successfully:", {
            user,
            message : "<strong>Success!</strong> Login successful."
        });
        console.log("JWT token :", token);
        res.cookie("token", token);

        res.render("login",{
            user : req.user,
            message : "<strong>Success!</strong> Login successful.",
            success : true, 
        });

    } 
    catch (err) {
        console.log("User could not be loggedIn. Please try again later.");
        console.error(err);

        return res.render("login", {
            message : "login failed. Please try again later.",
            user : req.user
        });
    }
}

module.exports = login;