
const { Schema, model } = require("mongoose")

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, "The name is required"]
    },
    email: {
        type: String,
        required: [true, "The email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "The password is required"]
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        default: "USER_ROLE",
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function () {

    const { __v, password, _id, ...object } = this.toObject();
    object.uuid = _id;
    return object;
}

module.exports = model("User", UserSchema);