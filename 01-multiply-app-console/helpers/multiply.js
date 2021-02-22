const fs = require("fs");
const colors = require('colors');

const fileTable = async (base = 5, lisTable, untilMultiply) => {

    return new Promise((resolve, reject) => {

        if (isNaN(base)) return reject("No es un número");

        let output = "";
        let consoleScreen = "";

        for (let i = 1; i <= untilMultiply; i++) {
            output += `${base} * ${i} = ${base * i}\n`;
            consoleScreen += `${base} ${"*".green} ${i} ${"=".green} ${base * i}\n`;
        }

        if (lisTable) {
            console.log("====================".green);
            console.log(`\tTable ${base}`.green);
            console.log("====================".green);
            console.log(consoleScreen);
        }

        fs.writeFileSync(`./tables/table-${base}.txt`, output);

        resolve(`table-${base}.txt created`.rainbow)
    });
}

module.exports = {
    fileTable
}