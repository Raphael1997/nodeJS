const { Router } = require("express");
const { check } = require("express-validator");
const { getCategories, getCategoriesById, createCategories, updateCategories, deleteCategories } = require("../controllers/category.controllers");
const { validateJWT, validateField, adminRole } = require("../middlewares");
const { findCategoryById } = require("../helpers/db-validators");
const router = Router();


router.get("/",
    [

    ],
    getCategories
);

router.get("/:id",
    [
        check("id", "The ID is not a mongo ID").isMongoId(),
        check("id").custom(findCategoryById),
        validateField
    ],
    getCategoriesById
);

router.post("/",
    [
        validateJWT,
        check("name", "The name is requierd").notEmpty(),
        validateField
    ],
    createCategories
);

router.put("/:id",
    [
        validateJWT,
        check("id", "The ID is not a mongo ID").isMongoId(),
        check("name", "The name is required").notEmpty(),
        check("id").custom(findCategoryById),
        validateField
    ],
    updateCategories
);

router.delete("/:id",
    [
        validateJWT,
        adminRole,
        check("id", "The ID is not a mongo ID").isMongoId(),
        check("id").custom(findCategoryById),
        validateField
    ],
    deleteCategories
);



module.exports = router;