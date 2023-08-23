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

const questions =[
  {
    type: "list",
    message: "What would you like to do?",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"],
    name: "startPrompt",
  }
]

function startProgram(){
  inquirer.prompt(questions)
  .then((answers)=>{
    switch(answers.startPrompt){
      case "View all departments":
        viewDepartments()
        break;
      case "View all roles":
       viewRoles()
        break;
      case "View all employees":
        viewEmployees()
        break;
      case "Add a department":
        // do function for adding department
        break;
      case "Add a role":
        // do function for adding role
        break;
      case "Add an employee":
        // do function for adding an employee
        break;
      case "Update an employee role":
        // do function for updating employee
        break;
      case "Quit":
        // do nothing, allow inquirer to end
        break;
    }

  })
}

function viewDepartments(){  
  db.query(`SELECT id, dept_name FROM departments`, function(err, res){
    if (err) throw err;
    console.table(res)
    startProgram()
  })
  // db.promise().query(`SELECT id, dept_name FROM departments`)
  // .then((data) => console.table(data[0]))
  // .catch((error) => console.log(error))
}

function viewRoles(){
  db.query(`SELECT roles.title, roles.id, departments.dept_name AS department, roles.salary*1000 AS salary
  FROM roles
  JOIN departments ON roles.department_id = departments.id`, function(err, res){
    if (err) throw err;
    console.table(res)
    startProgram()
  })
}

function viewEmployees(){
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.dept_name AS department, roles.salary*1000 AS salary, employee.manager_id
  FROM employee
  INNER JOIN roles ON roles.id = employee.role_id
  INNER JOIN departments ON roles.department_id = departments.id`, function(err, res){
    if (err) throw err;
    console.table(res)
    startProgram()
  })
}

startProgram()