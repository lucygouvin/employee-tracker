const inquirer = require("inquirer");
const mysql = require('mysql2');

const questions = [
    {
        type:"input",
        message: "enter anything",
        name: "test"
    }
]

console.log(questions[0].name)