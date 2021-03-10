const { Router } = require("express");
const { check } = require("express-validator");
const { getProduct, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controllers");
const { findProductById, findCategoryById } = require("../helpers/db-validators");
const { validateJWT, validateField, adminRole } = require("../middlewares");
const router = Router();


router.get("/",
    [

    ],
    getProduct
);

router.get("/:id",
    [
        check("id", "The ID is not a mongo ID").isMongoId(),
        check("id").custom(findProductById),
        validateField
    ],
    getProductById
);

router.post("/",
    [
        validateJWT,
        check("name", "The name is requierd").notEmpty(),
        check("category", "The ID is not a mongo ID").isMongoId(),
        check("category").custom(findCategoryById),
        validateField

    ],
    createProduct
);

router.put("/:id",
    [
        validateJWT,
        check("id", "The ID is not a mongo ID").isMongoId(),
        check("name", "The name is required").notEmpty(),
        check("id").custom(findProductById),
        validateField
    ],
    updateProduct
);

router.delete("/:id",
    [
        validateJWT,
        adminRole,
        check("id", "The ID is not a mongo ID").isMongoId(),
        check("id").custom(findProductById),
        validateField
    ],
    deleteProduct
);



module.exports = router;