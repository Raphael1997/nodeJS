const Role = require("../models/role");
const User = require("../models/user.models")
const { Error } = require("mongoose");

const rolValidate = async (rol = "") => {

    const existRole = await Role.findOne({ role: rol });

    if (!existRole) {
        throw new Error("The role is invalid");
    }
}

const existEmail = async (email) => {

    const emailDB = await User.findOne({ email });

    if (emailDB) {
        throw new Error("Sorry, other user took this email.")
    }
}

const findUserById = async (id) => {

    const userDB = await User.findById(id);

    if (!userDB) {
        throw new Error("User not found")
    }
}

module.exports = {
    rolValidate,
    existEmail,
    findUserById
}