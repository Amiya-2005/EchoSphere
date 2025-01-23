const User = require("../models/User");
const bcrypt = require("bcrypt");

const signup =async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const userExists = await User.findOne({email});

        if(userExists){
            console.log("User has already registered before.");
            return res.render("login", {
                message : "User has already registered before."
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        console.log("User signed up successfully.", user);
        return res.render("login",{
            success : true,
            message:"<strong>Success!</strong> User registered successfully."
        });
    } 
    catch (err) {
        console.error("User could not be created.", err);
    }
}

module.exports = signup;