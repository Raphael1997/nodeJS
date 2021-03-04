const inquirer = require('inquirer');
require("colors");

const menuOptions = [
    {
        type: "list",
        name: "option",
        message: "What will you do?",
        choices: [
            {
                value: 1,
                name: `${"1.".green} Search City`
            },
            {
                value: 2,
                name: `${"2.".green} History`
            },
            {
                value: 0,
                name: `${"3.".green} Exit`
            }
        ]
    }
]
const inquirerMenu = async () => {
    console.clear();
    console.log("===============".green);
    console.log("Choose an option");
    console.log("=============== \n".green);

    const { option } = await inquirer.prompt(menuOptions);

    return option
}

const pause = async () => {

    const question = [
        {
            type: "input",
            name: "enter",
            message: `Press ${"ENTER".green} to continue`
        }
    ];
    await inquirer.prompt(question);

}

const readInput = async (msg) => {

    const question = [
        {
            type: "input",
            name: "desc",
            message: msg,

            validate(value) {
                if (value.length === 0) {
                    return "Write a city please"
                }

                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
}

const listPlaces = async (places) => {

    const choices = places.map((place, i) => {

        const index = `${i + 1}`.green;
        return {
            value: place.id,
            name: `${index} ${place.name}`
        }
    })

    choices.unshift({
        value: 0,
        name: "0.".green + " Cancel"

    })

    const question = [
        {
            type: "list",
            name: "id",
            message: "Select a place",
            choices
        }
    ]

    const { id } = await inquirer.prompt(question);

    return id;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listPlaces,
}
