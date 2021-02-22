const argv = require("yargs")
    .option("b", {
        alias: "base",
        type: "number",
        demandOption: true,
        description: "Write the base"
    })
    .option("l", {
        alias: "list",
        type: "boolean",
        default: false,
        description: "List the table"

    })
    .option("u", {
        alias: "until",
        type: "number",
        default: 10,
        description: "how far to multiply"

    })
    .check((argv, options) => {
        if (isNaN(argv.base)) {
            throw new Error("The base have to be a number");
        }
        return true;
    })
    .argv;

module.exports = argv;