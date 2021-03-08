const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, createUser, updateUser, patchUsers, deleteUsers,
} = require("../controllers/user.controllers");
const { rolValidate, existEmail, findUserById } = require("../helpers/db-validators");

/* const { validateField } = require("../middlewares/validate-field");
const { validateJWT } = require("../middlewares/validate-jwt");
const { adminRole, haveRole } = require("../middlewares/validate-role"); */

const { validateField, validateJWT, adminRole } = require("../middlewares")

const router = Router();

router.get("/", getUsers);

router.post("/",
    [
        check("name", "The name is required").notEmpty(),
        check("password", "The password is required").notEmpty(),
        check("email").custom(existEmail),
        check("role").custom(rolValidate),
        validateField
    ],
    createUser
);

router.put("/:id",
    [
        check("id", "It isn't a valid ID").isMongoId(),
        check("id").custom(findUserById),
        check("role").custom(rolValidate),
        validateField
    ],
    updateUser
);

router.patch("/", patchUsers);

router.delete("/:id",
    [
        validateJWT,
        adminRole,
        check("id", "It isn't a valid ID").isMongoId(),
        check("id").custom(findUserById),
        validateField
    ],
    deleteUsers
);

module.exports = router;