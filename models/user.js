import { required } from 'joi';
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
        required: true,
        match: [
            new RegExp(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/), 
            'Please provide a valid password'
        ]
    },
    role: {
        type: String,
        required: true
    },
    refreashToken: {
        type: String,
        default: ''
    }
});

export const User = mongoose.model('User', userSchema);