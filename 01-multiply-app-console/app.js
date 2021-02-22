const { fileTable } = require("./helpers/multiply");
const argv = require("./config/yargs");




fileTable(argv.base, argv.list, argv.until)
    .then(fileName => console.log(fileName))
    .catch(err => console.log(err))


