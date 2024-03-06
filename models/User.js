const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
    userName: {
        type: String,
        lowercase: true,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
    tokenConfirm: {
        type: String,
        default: null,
    },
    cuentaConfirmada: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre("save", async function (next) {
    let user = this;
    if (!user.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        console.log(error);
        next();
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
