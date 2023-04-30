import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: String,
    email: String,
    googleId: {
        type: String,
        require: true
    },
    suggestions: [mongoose.Types.ObjectId]
}, {timestamps: true})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel;