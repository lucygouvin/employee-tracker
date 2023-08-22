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


function getDepts(){
  db.promise().query("SELECT dept_name FROM departments")
  .then((response) => {
  console.log(response);
  return response;
  })
}
  

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
    type: "list",
    message: "Select the role's department.",
    choices: getDepts(),
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
      } else if (answers.startPrompt === "View all departments"){
        db.promise().query(`SELECT id, dept_name FROM departments`).then((response)=>{
          console.log(response[0])
          askQuestions()
        })     
      } else if (answers.startPrompt === "View all roles"){
        db.promise().query(`SELECT id, title, department_id, salary FROM roles`).then((response)=>{
          console.log(response[0])
          askQuestions()
        })     
      }else if (answers.startPrompt === "View all employees"){
        // TODO
        // db.promise().query(`SELECT id, title, department_id, salary FROM roles`).then((response)=>{
        //   console.log(response[0])
        //   askQuestions()
        // })
      } else if (answers.startPrompt === "Add a department"){
        db.promise().query(`INSERT INTO departments (dept_name) VALUES("${answers.addDeptName}")`).then(()=>{
          console.log(`Added ${answers.addDeptName} to the database`)
          askQuestions()
        })
      }else if (answers.startPrompt === "Add a role"){
        // name, salary, and department
        // Needs a Join?
        db.promise().query(`INSERT INTO roles (title, salary, department)`)
      }

    })
  }

  askQuestions()
  // const test = getDepts()
  // console.log("🚀 ~ file: index.js:137 ~ test:", test)










// db.promise().query(`SELECT id FROM departments WHERE dept_name = "Marketing"`).then((response)=> console.log(response))
// TODO
// Handle viewing employees -- needs join
// Format results
// db.promise().query("SELECT dept_name FROM departments")
// .then((response)=>{
//     let deptArray = []
//     response[0].forEach(element => {
//         deptArray.push(element.dept_name)
        
//     });
//     console.log(deptArray)
// })
// .catch((error) => console.log(error))

// db.promise().query("SELECT id, dept_name FROM departments")
// .then((response) => console.log(response[0]))