const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    profilePic : {
        type : String,
        default : "../public/images/default.jpeg"
    },
    role : {
        type : String,
        enum : ["USER", "ADMIN"],
    }
});

userSchema.pre("save", async function(next) {
    const user = this;
    if(!user.isModified("password")) return;
    let hashedPassword = bcrypt.hash(user.password, 10);

    this.password = hashedPassword;

    next();
})

module.exports = mongoose.model("User", userSchema);