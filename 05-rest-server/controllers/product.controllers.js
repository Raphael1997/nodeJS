const Product = require("../models/product.models");

const getProduct = async (req, res) => {

    try {
        let page = req.query.page - 1 || 0;
        page = (page > 0) ? Number(page) : 0;

        let limit = req.query.limit || 5;
        limit = (limit > 0) ? Number(limit) : 5;

        let desde = page * limit;
        const [productDB, total] = await Promise.all([
            Product.find({ status: true }).limit(Number(limit)).skip(Number(desde)),
            Product.countDocuments({ status: true })
        ]);

        res.json({
            data: {
                total,
                limit,
                lastPage: Math.ceil((total < 1) ? 1 : total / limit),
                page: (page + 1),
                data: productDB
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error - talk with the ADM"
        })
    }
}

const getProductById = async (req, res) => {

    const { id } = req.params;

    const productDB = await Product.findById(id)
        .populate("user", "name email")
        .populate("category", "name")

    res.json({
        product: productDB
    })
}

const createProduct = async (req, res) => {

    const { status, user, ...dataBody } = req.body;

    const productDB = await Product.findOne({ name: dataBody.name.toUpperCase() });

    if (productDB) {
        return res.status(400).json({
            message: `The product ${productDB.name} already exists`
        });
    }

    const data = {
        ...dataBody,
        name: req.body.name.toUpperCase(),
        user: req.user._id
    }

    const product = new Product(data);

    await product.save();

    res.status(201).json(product);


}

const updateProduct = async (req, res) => {

    const { id } = req.params;
    const { status, user, category, ...data } = req.body;

    if (data.name) {

        data.name = data.name.toUpperCase();
    }
    data.user = req.user._id;

    const productDB = await Product.findByIdAndUpdate(id, data, { new: true });

    res.json({
        product: productDB
    });
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;

    const productDB = await Product.findByIdAndUpdate(id, { status: false });
    let authenticatedUser = req.user;
    await productDB.save();
    res.json({
        authenticatedUser,
        deactivatedProduct: productDB,
        message: "product deactivated",
    });
}

module.exports = {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}