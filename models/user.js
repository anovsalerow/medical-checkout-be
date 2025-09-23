import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        max: 254,
        unique: true,
        match: [
            new RegExp(/^(([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,}))/, "iu"), 
            'Please provide a valid email address'
        ]
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        default: ''
    }
});

export const User = mongoose.model('User', userSchema);