const path = require("path");
const fs = require("fs");
const User = require("../models/user.models");
const Product = require("../models/product.models");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { uploadFile } = require("../helpers");

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

/**
 * This method don t use a service to save the files
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
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

    // delete old images
    if (model.img) {
        const pathImg = path.join(__dirname, `../uploads/${collection}/${model.img}`);
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }

    const name = await uploadFile(req.files, undefined, collection);
    model.img = name;
    await model.save();

    res.json({
        model
    })
}

const updateFileByFolderCloudinary = async (req, res) => {

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

    // delete old images
    if (model.img) {

        const idImage = model.img.split("/");
        const name = idImage.splice(-1).toString();
        const [public_id] = name.split(".");

        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;
    await model.save();

    res.json(model);
}

const showImage = async (req, res) => {

    const { collection, id } = req.params;

    let model;

    let noImage = path.join(__dirname, `../assets/img/404.png`);
    switch (collection) {
        case "user":

            model = await User.findById(id);

            if (!model) {
                return res.status(400).sendFile(noImage);
            }
            break;

        case "product":
            model = await Product.findById(id);

            if (!model) {
                return res.status(400).sendFile(noImage);
            }
            break;

        default:
            return res.status(500).json({
                error: "Not validate yet - talk with the ADM"
            });
            break;
    }

    // delete old images
    if (model.img) {
        const pathImg = path.join(__dirname, `../uploads/${collection}/${model.img}`);
        if (fs.existsSync(pathImg)) {

            return res.sendFile(pathImg);
        }
    }
}

module.exports = {
    fileUploadC,
    updateFileByFolder,
    showImage,
    updateFileByFolderCloudinary
}