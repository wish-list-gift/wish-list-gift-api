const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    productIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],
})



module.exports = mongoose.model('User', userSchema, 'users')