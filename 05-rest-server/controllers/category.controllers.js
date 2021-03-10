const Category = require("../models/category.model");

const getCategories = async (req, res) => {

    try {
        let page = req.query.page - 1 || 0;
        page = (page > 0) ? Number(page) : 0;

        let limit = req.query.limit || 5;
        limit = (limit > 0) ? Number(limit) : 5;

        let desde = page * limit;
        const [categoryDB, total] = await Promise.all([
            Category.find({ status: true }).limit(Number(limit)).skip(Number(desde)),
            Category.countDocuments({ status: true })
        ]);

        res.json({
            data: {
                total,
                limit,
                lastPage: Math.ceil((total < 1) ? 1 : total / limit),
                page: (page + 1),
                data: categoryDB
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error - talk with the ADM"
        })
    }
}

const getCategoriesById = async (req, res) => {

    const { id } = req.params;

    const categoryDB = await Category.findById(id)
        .populate("user", "name email");

    res.json({
        category: categoryDB
    })
}

const createCategories = async (req, res) => {

    const nameCategory = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name: nameCategory });

    if (categoryDB) {
        return res.status(400).json({
            message: `The Category ${categoryDB.name} already exists`
        });
    }

    const data = {
        name: nameCategory,
        user: req.user._id
    }

    const category = new Category(data);

    await category.save();

    res.status(201).json({
        category
    })
}

const updateCategories = async (req, res) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const categoryDB = await Category.findByIdAndUpdate(id, data, { new: true });

    res.json({
        category: categoryDB
    });
}

const deleteCategories = async (req, res) => {

    const id = req.params.id;

    const categoryDB = await Category.findByIdAndUpdate(id, { status: false });
    let authenticatedUser = req.user;
    await categoryDB.save();
    res.json({
        authenticatedUser,
        deactivatedCategory: categoryDB,
        message: "category deactivated",
    });
}

module.exports = {
    getCategories,
    createCategories,
    updateCategories,
    deleteCategories,
    getCategoriesById
}