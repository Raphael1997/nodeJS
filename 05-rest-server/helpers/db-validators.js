const Role = require("../models/role");
const User = require("../models/user.models");
const Category = require("../models/category.model");
const Product = require("../models/product.models");
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

const findCategoryById = async (id) => {

    const categoryDB = await Category.findById(id);

    if (!categoryDB) {
        throw new Error("Category not found")
    }
}

const findProductById = async (id) => {

    const productDB = await Product.findById(id);

    if (!productDB) {
        throw new Error("Product not found")
    }
}

const allowCollection = async (collection = "", collections = []) => {

    const include = collections.includes(collection);

    if (!include) {
        const data = {
            error: `The collection ${collection} is not allowed`,
            allowCollection: collections
        }
        throw new Error(data.error + ". Allow collection => " + data.allowCollection);
    }

    return true;
}
module.exports = {
    rolValidate,
    existEmail,
    findUserById,
    findCategoryById,
    findProductById,
    allowCollection
}