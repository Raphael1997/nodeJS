const { ObjectId } = require("mongoose").Types;
const User = require("../models/user.models");
const Category = require("../models/category.model");
const Product = require("../models/product.models");

const allowsTables = ["user", "category", "product"];

const searchUser = async (word = "", res) => {

    const isMongoId = ObjectId.isValid(word);

    if (isMongoId) {
        const user = await User.findById(word);
        return res.json({
            results: (user) ? [user] : []
        })
    }

    const regex = new RegExp(word, "i");
    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });
    res.json({
        results: users
    })
}

const searchCategory = async (word, res) => {

    const isMongoId = ObjectId.isValid(word);
    if (isMongoId) {
        const category = await User.findById(word);
        return res.json({
            results: (category) ? [category] : []
        })
    }

    const regex = new RegExp(word, "i");
    const category = await Category.find({ name: regex, status: true });
    res.json({
        results: category
    });
}

const searchProduct = async (word, res) => {

    const isMongoId = ObjectId.isValid(word);
    if (isMongoId) {
        const product = await Product.findById(word).populate("category", "name");
        return res.json({
            results: (product) ? [product] : []
        })
    }

    const regex = new RegExp(word, "i");
    const product = await Product.find({ name: regex }).populate("category", "name");
    res.json({
        results: product
    });
}

const search = (req, res) => {

    const { table, word } = req.params;

    if (!allowsTables.includes(table)) {
        res.status(400).json({
            message: `Allow tables: ${allowsTables}`
        })
    }

    switch (table) {
        case "user":

            searchUser(word, res);
            break;
        case "category":

            searchCategory(word, res);
            break;
        case "product":

            searchProduct(word, res);
            break;

        default:
            res.status(500).json({
                message: "Error - talk with the ADM"
            });
    }

}

module.exports = {
    search
}