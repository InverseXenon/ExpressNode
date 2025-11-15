const mongoose = require('mongoose');
const validator = require('validator');

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
        trim: true,
        validate: (value)=>{
            if(!validator.isEmail(value)){
                throw new Error ("INVALID EMAIL ADDRESS!" + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate: (value)=>{
            if(!validator.isStrongPassword(value)){
                throw new Error ("Weak Password! \n { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }" + value);
            }
        }
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
        default: "https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg",
    }
},{
    timestamps: true
})

const User = mongoose.model("User", userSchema);

module.exports = User;