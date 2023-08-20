const inquirer = require("inquirer");
const mysql = require('mysql2');



// Connect to database
const db = mysql.createConnection(
    {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'rootr00t!',
    database: 'employees_db'
    },
    console.log(`Connected to the classlist_db database.`)
    );

db.promise().query("SELECT dept_name FROM departments")
.then((response)=>{
    let deptArray = []
    response[0].forEach(element => {
        deptArray.push(element.dept_name)
        
    });
    console.log(deptArray)
})
.catch((error) => console.log(error))
    

const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"],
    name: "startPrompt",
  },
  {
    type: "input",
    message: "Enter the name of the department.",
    name: "addDeptName",
    when: (answers) => (answers.startPrompt === "Add a department")
  },
  {
    type: "input",
    message: "Enter the name of the role",
    name: "addRoleName",
    when: (answers) => (answers.startPrompt === "Add a role")
  },
  {
    type: "input",
    message: "Enter the salary of the role.",
    name: "addRoleSalary",
    when: (answers) => (answers.startPrompt === "Add a role")
  },
  {
    // TODO: Change to list select
    type: "input",
    message: "Select the role's department.",
    name: "addRoleDept",
    when: (answers) => (answers.startPrompt === "Add a role")
  },
  {
    type: "input",
    message: "Enter the employee's first name.",
    name: "addEmpFirstName",
    when: (answers) => (answers.startPrompt === "Add an employee")
  },
  {
    type: "input",
    message: "Enter the employee's last name.",
    name: "addEmpLastName",
    when: (answers) => (answers.startPrompt === "Add an employee")
  },
  {
    type: "input",
    message: "Enter the employee's role.",
    name: "addEmpRole",
    when: (answers) => (answers.startPrompt === "Add an employee")
  },
  {
    // TODO: Change to list select
    type: "input",
    message: "Select the employee's manager.",
    name: "addEmpManager",
    when: (answers) => (answers.startPrompt === "Add an employee")
  },
  {
    // TODO: Change to list select
    type: "input",
    message: "Select an employee.",
    name: "updateEmpSelect",
    when: (answers) => (answers.startPrompt === "Update an employee role")
  },
  {
    // TODO: Change to list select
    type: "input",
    message: "Select the employee's new role.",
    name: "updateEmpRole",
    when: (answers) => (answers.startPrompt === "Update an employee role")
  }
];

function askQuestions() {
    return inquirer.prompt(questions).then((answers) => {
      if (answers.startPrompt === "Quit") {
        return answers;
      } else {
        console.log("loop finished")
        console.log(answers)
        return askQuestions();
      }
    });
  }
  
//   askQuestions()


