import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        
      
        email:{
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
            },
            {
                timestamps: true,
            }
)


//static sign up 
userSchema.statics.signup = async function ( email, password){
    const exists = await this.findOne({ email })
    if(exists) {
        throw new Error("User already exists")
    }

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash})

    return user

}

export const User = mongoose.model("User", userSchema);