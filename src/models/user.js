const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate : (value)=>{
            if(!["male","female","others"].includes(value)){
                throw new Error("ENTER VALID GENDER.")
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about for Any user."
    },
    skills: {
        type: [String],
        validate: (value)=>{
            return value.length<50;
        }
    },
    photoUrl: {
        type: String,
        default: "https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
    }
},{
    timestamps: true
})

const User = mongoose.model("User", userSchema);

module.exports = User;