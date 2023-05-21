const mongoose = require("mongoose");
const connectdb =async ()=>{
    try {
        await mongoose.connect(
            "mongodb+srv://rbk:tunisia@cluster0.un3t4yt.mongodb.net/?retryWrites=true&w=majority"
        );
        console.log("database is connected")
    }
     catch (err) {
        console.log(err)
     }
};
module.exports=connectdb;