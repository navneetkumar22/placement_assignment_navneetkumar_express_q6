import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxlength: [30, "Maximum length allowed is 30 characters"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            maxlength: [50, "Maximum length allowed is 50 characters"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Minimum password length is 6 characters"]
        },
        token: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', userSchema);