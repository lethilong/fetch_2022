const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

//Hash password pre save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
})

//Check password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

//Generate Access Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        {
            id: this._id,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    )
}

module.exports = mongoose.model('User', userSchema);