const inquirer = require('inquirer');
require("colors");

const menuOptions = [
    {
        type: "list",
        name: "option",
        message: "What will you do?",
        choices: [
            {
                value: "1",
                name: `${"1.".green} Create a task`
            },
            {
                value: "2",
                name: `${"2.".green} List tasks`
            },
            {
                value: "3",
                name: `${"3.".green} List completed tasks`
            },
            {
                value: "4",
                name: `${"4.".green} To do list`
            },
            {
                value: "5",
                name: `${"5.".green} Complete tasks`
            },
            {
                value: "6",
                name: `${"6.".green} Delete tasks`
            },
            {
                value: "0",
                name: `${"0.".green} Exit`
            },
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
                    return "Write a number please"
                }

                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
}

const listTaskDelete = async (tasks) => {

    const choices = tasks.map((task, i) => {

        const indice = `${i + 1}`.green;
        return {
            value: task.id,
            name: `${indice} ${task.desc}`
        }
    })

    choices.unshift({
        value: "0",
        name: "0.".green + " Cancel"

    })

    const question = [
        {
            type: "list",
            name: "id",
            choices
        }
    ]

    const id = await inquirer.prompt(question);

    return id;
}

const confirmQuestion = async (message) => {

    const question = [
        {
            type: "confirm",
            name: "ok",
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;
}

const showListCheckList = async (tasks) => {

    const choices = tasks.map((task, i) => {

        const index = `${i + 1}`.green;
        return {
            value: task.id,
            name: `${index} ${task.desc}`,
            checked: (task.completed) ? true : false
        }
    })

    const question = [
        {
            type: "checkbox",
            name: "ids",
            message: "Selected",
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question);

    return ids;
}
module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTaskDelete,
    confirmQuestion,
    showListCheckList
}
