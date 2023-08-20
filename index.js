const inquirer = require("inquirer");
const mysql = require('mysql2');

const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"],
    name: "startPrompt",
  },
];

function askQuestions() {
    return inquirer.prompt(questions).then((answers) => {
      if (answers.startPrompt === "Quit") {
        return answers;
      } else {
        return askQuestions();
      }
    });
  }
  
  askQuestions()
    .then(console.log)
    .catch((error) => {console.log(error)});

