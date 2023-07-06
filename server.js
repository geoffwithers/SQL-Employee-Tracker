const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection(
    {
        host: "localhost",
        port: 3001,
        user: "root",
        password: "",
        database: "employee_db",
    }
);

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    start();
});



function start() {
    inquirer
        .prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Exit",
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View all departments":
                    viewDepartments();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Exit":
                    connection.end();
                    console.log("Connection ended!");
                    break;
            }
        });
};


// View Departments

function viewDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

// View Roles

function viewRoles() {
    const query = "SELECT role.title, role.id, department.department_name, role.salary from role join department on role.department_id = department.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

// View Employees

function viewEmployees() {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

// Add Department

function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            name: "name",
            message: "Please enter a name for the new department:",
        })
        .then((answer) => {
            console.log(answer.name);
            const query = `INSERT INTO department (department_name) VALUES ("${answer.name}")`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log(`${answer.name} has been added.`);
                start();
            });
        });
};

// Add Role

function addRole() {
    const query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Please enter a title for the new role:",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Please enter a salary for the new role:",
                },
                {
                    type: "list",
                    name: "department",
                    message: "Please choose the department for the new role:",
                    choices: res.map(
                        (department) => department.department_name
                    ),
                },
            ])
            .then((answers) => {
                const department = res.find(
                    (department) => department.name === answers.department
                );
                const query = "INSERT INTO roles SET ?";
                connection.query(
                    query,
                    {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: department,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(
                            `The role of ${answers.title} with salary of ${answers.salary} in the ${answers.department} department has been added.`
                        );
                        start();
                    }
                );
            });
    });
};

// Add Employee

function addEmployee() {
    connection.query("SELECT id, title FROM roles", (error, results) => {
        if (error) {
            console.error(error);
            return;
        }

        const roles = results.map(({ id, title }) => ({
            name: title,
            value: id,
        }));
                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "firstName",
                            message: "Please enter the employee's first name:",
                        },
                        {
                            type: "input",
                            name: "lastName",
                            message: "Please enter the employee's last name:",
                        },
                        {
                            type: "list",
                            name: "roleId",
                            message: "Please select the employee role:",
                            choices: roles,
                        },    
                    ])
                    .then((answers) => {
                        const sql =
                            "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)";
                        const values = [
                            answers.firstName,
                            answers.lastName,
                            answers.roleId,
                        ];
                        connection.query(sql, values, (error) => {
                            if (error) {
                                console.error(error);
                                return;
                            }
                            console.log("Employee added!");
                            start();
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        );
    };

// need to add function here to update employee information


// Exit   
process.on("exit", () => {
    connection.end();
});