const { uploadFile } = require("../helpers");
const User = require("../models/user.models");
const Product = require("../models/product.models");

const fileUploadC = async (req, res) => {

    try {
        const name = await uploadFile(req.files, ["txt", "md", "pdf"], "text");

        res.json({
            name
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}

const updateFileByFolder = async (req, res) => {

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case "user":

            model = await User.findById(id);

            if (!model) {
                return res.status(400).json({
                    message: "User not found"
                })
            }
            break;

        case "product":
            model = await Product.findById(id);

            if (!model) {
                return res.status(400).json({
                    message: "Product not found"
                })
            }
            break;

        default:
            return res.status(500).json({
                error: "Not validate yet - talk with the ADM"
            });
            break;
    }

    const name = await uploadFile(req.files, undefined, collection);
    model.img = name;
    await model.save();

    res.json({
        model
    })
}

module.exports = {
    fileUploadC,
    updateFileByFolder
}