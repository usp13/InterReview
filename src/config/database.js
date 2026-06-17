const mongoose = require("mongoose");

async function connecttoDB() {

    console.log(process.env.MONGO_URI);


    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to Database!");
    }
    catch (err) {
        console.error("Database Connection Error:", err);
        
    }
}

module.exports = connecttoDB;