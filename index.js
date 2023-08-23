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
        addDepartment()
        break;
      case "Add a role":
        addRole()
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
  // db.query(`SELECT id, dept_name FROM departments`, function(err, res){
  //   if (err) throw err;
  //   console.table(res)
  //   startProgram()
  // })
  db.promise().query(`SELECT id, name AS department FROM departments`)
  .then((data) => {
    console.table(data[0])
    startProgram()}
  )
  .catch((error) => console.log(error))
}

function viewRoles(){
  db.promise().query(`SELECT roles.title, roles.id, departments.name AS department, roles.salary*1000 AS salary
  FROM roles
  JOIN departments ON roles.department_id = departments.id`)
  .then((data) => {
    console.table(data[0])
    startProgram()
  })
  .catch((error) => console.log(error))

}

function viewEmployees(){
  // TODO return the manager name not just the id
  db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.name AS department, roles.salary*1000 AS salary, employee.manager_id
  FROM employee
  INNER JOIN roles ON roles.id = employee.role_id
  INNER JOIN departments ON roles.department_id = departments.id`)
  .then((data) => {
    console.table(data[0])
    startProgram()
  })
  .catch((error) => console.log(error))
}

function addDepartment(){
  inquirer.prompt(
    [
      {
        type: "input",
        message: "Enter the name of the department.",
        name: "addDeptName",
      }
    ]
  ).then((answers)=>{
    db.promise().query(`INSERT INTO departments (name) VALUES("${answers.addDeptName}")`)
    console.log(`Added ${answers.addDeptName} to the database`)
    updateTables()
    startProgram()
  })
  .catch((error) => console.log(error))
}

function addRole(){
  db.promise().query("SELECT * FROM departments")
  .then((data)=>{
    const depts = data[0].map((dept)=> dept.name)
    inquirer.prompt([
      {
        type: "input",
        message: "Enter the role title.",
        name: "addRoleTitle",
      },
      {
        type: "input",
        message: "Enter the salary for this role.",
        name: "addRoleSalary",
      },
      {
        type: "list",
        message: "Select a department.",
        choices: depts,
        name: "addRoleDept",
      },
    ]).then((answers)=>{
      db.query(`SELECT id FROM departments WHERE departments.name = "${answers.addRoleDept}"`, function (err, res){
        if (err) console.log(err)
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES("${answers.addRoleTitle}", ${answers.addRoleSalary}, ${res[0].id})`)
        console.log(`Added ${answers.addRoleTitle} to ${answers.addRoleDept}.`)
        startProgram()
      })
    }).catch((error) => console.log(error))
  })

}


startProgram()