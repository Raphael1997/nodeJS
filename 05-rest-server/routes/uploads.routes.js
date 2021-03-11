const { Router } = require("express");
const { check } = require("express-validator");
const { fileUploadC, updateFileByFolder } = require("../controllers/uploads");
const { validateJWT, validateField, validateFile } = require("../middlewares")
const { allowCollection } = require("../helpers");

const router = Router();


router.post("/",
    [
        validateJWT,
        validateFile
    ],
    fileUploadC
);

router.put("/:collection/:id",
    [
        validateJWT,
        validateFile,
        check("id", "The ID is not a mongo ID").isMongoId(),
        check("collection").custom(c => allowCollection(c, ["user", "product"])),
        validateField
    ],
    updateFileByFolder
);

module.exports = router;