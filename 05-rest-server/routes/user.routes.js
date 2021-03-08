const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, createUser, updateUser, patchUsers, deleteUsers,
} = require("../controllers/user.controllers");
const { rolValidate, existEmail, findUserById } = require("../helpers/db-validators");

const { validateField } = require("../middlewares/validate-field");


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
        check("id", "It isn't a valid ID").isMongoId(),
        check("id").custom(findUserById),
        validateField
    ],
    deleteUsers
);

module.exports = router;