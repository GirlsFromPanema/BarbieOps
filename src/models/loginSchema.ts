import mongoose from "mongoose"; 

const loginSchema = new mongoose.Schema({
    userID: String, 
    password: String
})

module.exports = mongoose.model("Login", loginSchema)

