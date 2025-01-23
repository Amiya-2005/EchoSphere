const mongoose = require("mongoose");
require("dotenv").config();


exports.dbConnect = () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("DB connected successfully.✅");
        console.log("Hello from databse.");
    })
    .catch((err) => {
        console.log("DB connection issues.❌")
        console.error(err);
    });
}




