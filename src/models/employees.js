const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 3
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error("email not valid");
            }
        },
        required: true
    },
    phone: {
        type: Number,
        required: true,
        min: 10,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }


})

employeeSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        console.log(`the current password before hashing is ${this.password}`);       //before hashing
        this.password = await bcrypt.hash(this.password, 10);          //hashing the password and also storing
        console.log(`the current password after hashing is ${this.password}`);       //after hashing

        //undefined using for -it will not be shown
        this.confirmpassword = undefined;

    }
    next();    // next method will be called
})



module.exports = new mongoose.model("Register", employeeSchema);