const path = require("path");
const { v4: uuidv4 } = require('uuid');


const uploadFile = async (files, validateExtension = ["jpg", "png", "gif"], folder = "") => {


    return new Promise((resolve, reject) => {
        const { file } = files;

        const nameFileNoExt = file.name.split(".");
        const extension = nameFileNoExt.splice(-1).toString();
        const nameTemp = uuidv4() + "." + extension;

        if (!validateExtension.includes(extension)) {
            return reject({
                message: `.${extension} is not a valid extension`,
                allowExtension: validateExtension
            });
        }

        const uploadPath = path.join(__dirname, `../uploads/${folder}`, nameTemp);

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(nameTemp);
            
        });
    })

}

module.exports = {
    uploadFile
}