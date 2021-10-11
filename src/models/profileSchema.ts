import mongoose from "mongoose"; 

const profileSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true},
    serverID: { type: String, required: true, unique: true},
    warnings: { type: Number, required: false, unique: true},
    bank: { type: String, required: true, unique: true}
})

module.exports = mongoose.model("ProfileModels", profileSchema)

