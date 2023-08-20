const inquirer = require("inquirer");
const mysql = require('mysql2');

const questions = [
    {
        type: "list",
    message: "Select a shape: ",
    choices: ["Square", "Triangle", "Circle"],
        name: "test",
    }
]

function getAnswers() {
    return inquirer.prompt(questions).then((answers) => {
      if (answers.is_finished) {
        return answers;
      } else {
        return getAnswers();
      }
    });
  }
  
  getAnswers()
    .then(console.log)
    .catch((error) => {console.log(error)});

