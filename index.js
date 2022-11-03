//Main
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Addicted93!",
    database: "employee_db1"
}) 

function askAction () {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role",
                "exit"
            ],
            name: "Action"
        }
    ])
        .then((answer) => {
    
            if (answer.Action == "view all departments") {
                // console.log("view all departments")
                viewAllDepartments()
            }
            else if (answer.Action == "view all roles") {
                // console.log("view all roles")
                viewAllRoles()
            }
            else if (answer.Action == "view all employees") {
                // console.log("view all employees")
                viewAllEmployees()
            }
            else if (answer.Action == "add a department") {
                // console.log("add  department")
                addDepartment()
            }
            else if (answer.Action == "add a role") {
                // console.log("add a role")
                addRole()
            }
            else if (answer.Action == "add an employee") {
                // console.log("add an employee")
                addEmployee()

            }
            else if (answer.Action == "update an employee role") {
                // console.log("update an employee role")
                updateEmployeeRole()


            } else {
                process.exit(1);
            }
    
        })
}


function viewAllDepartments() {
    // console.log("Get all departments from database and show it as a table!");
    db.query("SELECT * FROM departments;", (err, data) => {

        if (err) {
            console.log(err)
        }

        console.table(data);
        askAction();
    })
}

// function for viewAllRoles
function viewAllRoles() {
    db.query("SELECT * FROM roles;", (err, data) => {
        if (err) {
            console.log(err)
        }

        console.table(data);
        askAction();
    }) 
}


// function for viewAllEmployees
function viewAllEmployees() {
    db.query("SELECT * FROM employees;", (err, data) => {
        if (err) {
            console.log(err)
        }

        console.table();
    })
}



// functions for adding
function addDepartment () {
    inquirer.prompt([
        // {
        //     type: "input",
        //     message: "What is the id of this new department?",
        //     name: "dept_id"
        // },
        {
            type: "input",
            message: "What is the name of this new department?",
            name: "dept_name"
        }
    ])
    .then((answer) => {
        console.log(answer);

        db.query("INSERT INTO departments (name) VALUES (?)", [answer.dept_name], (err, data) => {
            if(err) {
                console.log(err)
            } else {
                console.log("Successfully added new department!");
                askAction()
            }
        })

    })
}

// function for addRole
function addRole () {
    inquirer.prompt([
    //   {  
    //     type: "input",
    //     message: "What is the id of this role?",
    //     name: "role_id"
    //   },
      
      {
        type: "input",
        message: "What is the title of this role?",
        name: "role_title"
      },

      {
        type: "input",
        message: "What is the salary of this role?",
        name: "role_salary"
      },

      {
        type: "input",
        message: "Which department does the role belong to?",
        name: "role_id"
      }

     
    ])
    .then((answer) => {
        console.log(answer);

        db.query("INSERT INTO roles (title, salary, id) VALUES (?, ?, ?)", [answer.role_title, answer.role_salary, answer.role_Id], (err, data) => {
            if(err) {
                console.log(err)
            } else {
                console.log("Successfully added new role!");
                askAction()
            }
        })

    })
}





//function for addEmployee
function addEmployee () {
    inquirer.prompt([
        // {
        //     type: "input",
        //     message: "What is the id of this employee?",
        //     name: "employee_id"
        // },

        {
            type: "input",
            message: "What is the employee's first name?",
            name: "employee_name"
        },

        {
            type: "input",
            message: "What is the employee's last name?",
            name: "employee_lastname"
        },

        {
            type: "input",
            message: "What is the employee's role?",
            name: "employee_role"
        },
        
        {
            type: "input",
            message: "What is the employee's manager?",
            name: "employee_manager"
        }
    ])
    .then((answer) => {
        console.log(answer);

        db.query("INSERT INTO employees (first name, last name, role id, manager id) VALUES (?, ?, ?, ?)", [answer.employee_name, answer.employee_lastname, answer.employee_role, answer.employess_manager], (err, data) => {
            if(err) {
                console.log(err)
            } else {
                console.log("Successfully added new employee!");
                askAction()
            }
        })

    })
}


//function update employee role
function updateEmployeeRole () {
    db.roleQuery().then(([rows]) => {
        const roles = rows.map(({ id, title }) => ({ name: title, value: id }))

        db.fullNameQuery().then(([rows]) => {
            const empNameList = rows.map(({ id, firstName, lastName }) => ({ name: firstName + " " + lastName, value: id }));
    
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to update?",
            name: "EmpNameRoleUpdate",
            choices: empNameList 
        },

        {
            type: "list",
            message: "Choose the role ID to assign to employer",
            name: "roleUpdate",
            choice: roles
        }

       
    ])
    .then((res) => {
        db.updateEmployeeRole(res)
            .then(() => {
                console.log("New role successfully added!")

            })

            
                
            
//     .then((answer) => {
//         console.log(answer);

//         db.query("INSERT INTO employees (name, roles) VALUES (?, ?,)", [answer.name_list, answer.roles ], (err, data) => {
//             if(err) {
//                 console.log(err)
//             } else {
//                 console.log("New role successfully added!");
//                 askAction()
//             }
//         })

//     })
// } 

            
askAction()