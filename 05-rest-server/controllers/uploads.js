const { uploadFile } = require("../helpers");

const fileUploadC = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            message: "No files were uploaded"
        });
    }

    try {
        const name = await uploadFile(req.files, ["txt", "md", "pdf"], "text");

        res.json({
            name
        })
    } catch (error) {
        res.status(400).json({error});
    }


}

module.exports = {
    fileUploadC
}