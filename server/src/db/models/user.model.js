import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    subscription: {
        type: String,
        default: "free"
    },
    product: {
        type: Number,
        default: 0
    },
    regenerations: {
        type: Number,
        default: 0
    },
    language: {
        type: String,
        default: 'english'
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
