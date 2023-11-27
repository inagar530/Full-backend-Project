import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unqiue: true,
        lowercase: true,
        trim: true,
        index: true  // database seaching feild for use index is true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unqiue: true,
        lowercase: true,

    },
    fullName: {
        type: String,
        required: [true, "Full Name is required"],
        index: true,
        trim: true
    },
    avatar: {
        type: String,   // Cloudinary url
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Vedio'
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String,
    }

} , {
        timestamps: true
    }
);

userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(    // sign is used for ganerate the tokens
        {
            _id: this.id,
            email: this.email,
            fullName: this.fullName,
            usernames: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema);