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


function startProgram(){
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"],
      name: "startPrompt",
    }
  ])
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
        addEmployee()
        break;
      case "Update an employee role":
        updateEmployee()
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

function addEmployee() {
  db.promise()
    .query("SELECT first_name, last_name, id FROM employee")
    .then((data) => {
      db.query(`SELECT title FROM roles`, function (err, res) {
        if (err) console.log(err);
        const roles = res.map((role) => role.title);
        const employees = data[0].map((emp) => ({
          name: `${emp.first_name} ${emp.last_name}`,
          id: emp.id,
        }));

        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the employee's first name",
              name: "addFirstName",
            },
            {
              type: "input",
              message: "Enter the employee's last name.",
              name: "addLastName",
            },
            {
              type: "list",
              message: "Select the employee's role.",
              choices: roles,
              name: "addEmpRole",
            },
            {
              type: "list",
              message: "Select the employee's manager.",
              choices: employees,
              name: "addEmpMgr",
            },
          ])
          .then((answers) => {
            db.query(`SELECT id FROM roles WHERE roles.title = "${answers.addEmpRole}"`, function (err, res){
              if (err) console.log(err)
              const text = answers.addEmpMgr.split(" ")
              db.query(`SELECT id FROM employee WHERE employee.first_name = "${(text[0])}"`, function (err, result){
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${answers.addFirstName}", "${answers.addLastName}", ${res[0].id}, ${result[0].id})`)
              console.log(`Added ${answers.addFirstName} ${answers.addLastName} to the database.`)
              startProgram()
              }) 
            })
          });
      })
    });
}

function updateEmployee(){
  db.promise()
    .query("SELECT first_name, last_name, id FROM employee")
    .then((data) => {
      db.query(`SELECT title FROM roles`, function (err, res) {
        if (err) console.log(err);
        const roles = res.map((role) => role.title);
        const employees = data[0].map((emp) => ({
          name: `${emp.first_name} ${emp.last_name}`,
          id: emp.id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              message: "Which employee's role do you want to update?",
              choices: employees,
              name: "selectEmp",
            },
            {
              type: "list",
              message: "Which role do you want to assign to the selected employee?",
              choices: roles,
              name: "selectRole",
            },
          ])
          .then((answers) => {
            db.query(`SELECT id FROM roles WHERE roles.title = "${answers.selectRole}"`, function (err, res){
              if (err) console.log(err)
              const text = answers.selectEmp.split(" ")
              db.query(`SELECT id FROM employee WHERE employee.first_name = "${(text[0])}"`, function (err, result){
                db.query(`UPDATE employee SET role_id = ${res[0].id} WHERE employee.id = ${result[0].id}`)
              console.log(`Updated ${answers.selectEmp}'s role to ${answers.selectRole}`)
              startProgram()
              }) 
            })
          });
      })
    });
}

startProgram()