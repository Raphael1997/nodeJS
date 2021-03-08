const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.URI_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log("DB online");
    } catch (error) {
        console.log(error);
        console.log("Error al inicializar la base de datos");
    }
    
}

module.exports = {
    dbConnection
}


