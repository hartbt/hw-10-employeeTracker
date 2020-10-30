// establishing Figlet
const mysql = require("mysql")
const inquirer = require("inquirer")

const figlet = require("figlet")
const { allowedNodeEnvironmentFlags } = require("process")
const connection = require("./connection")
figlet("EMPLOYEE MANAGER", function(err, data){
    if(err) {
        console.log("Something went wrong")
        console.dir(err);
        return
    }
    console.log("\n============================")
    console.log(data)
    console.log("\n============================\n\n\n\n\n\n")
})

function init(){
    inquirer.prompt(
        {
            type: "list",
            message: "Which action would you like to do?",
            name: "search",
            choices: ["View Employees", "View Roles", "View Departments", "Add Employee", "Add Role", "Update an Employee's Role", "Exit"]
        }
    ).then(function(res){
        switch (res.search){
            case "View Employees":
                employee();
                break
            case "View Roles":
                role();
                break
            case "View Departments":
                department();
                break
            case "Add Employee":
                addEmployee();
                break
            case "Add Role": 
                addRole()
                break
            case "Update an Employee's Role":
                updateRole()
                break
            default:
                process.exit()

        }
    })
}

// to view employees

function employee(){
    connection.query("SELECT * FROM employee", function(err, result){
        if(err) throw err
        console.table(result)
    })
}

// to view roles

function role(){
    connection.query("SELECT * FROM role", function(err, result){
        if(err) throw err
        console.table(result)
    })
}

// to view departments

function department(){
    connection.query("SELECT * FROM employee", function(err, result){
        if(err) throw err
        console.table(result)
    })
}

// to add role

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter a role.",
            name: "empRole"
        },{
            type: "input",
            message: "Enter a salary.",
            name: "empSalary"
        },{
            type: "input",
            message: "Enter a department ID.",
            name: "deptID"
        }
    ]).then(answers => {
        connection.query("INSERT INTO role SET ?",
        {
            title:answers.empRole,
            salary:answers.empSalary,
            departmentID:answers.deptID
        }, function(err){
            if(err) throw err;
            console.log("Created role.");
            init()
        })
    })
}

// to add employee

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the new employee's first name.",
            name: "empFirst"
        },{
            type: "input",
            message: "Enter the employee's last name.",
            name: "empLast"
        },{
            type: "input",
            message: "Enter the new employee's role ID.",
            name: "newRoleID"
        },{
            type: "input",
            message: "Emter the new employee's manager ID.",
            name: "newRoleManID"
        }
    ]).then(answers => {
        connection.query("INSERT INTO role SET ?",
        {
            firstName:answers.empFirst,
            lastName:answers.empLast,
            roleID:answers.newRoleID,
            managerID:answers.newRoleManID
        }, function(err){
            if(err) throw err;
            console.log("Created employee.");
            init()
        })
    })
}

// to update role

function updateRole(){
    connection.query("SELECT * FROM role", function(err, results){
        if (err) throw err;

        inquirer.prompt([
            {
                type: "list",
                mesage: "Select a role to update.",
                name: "choice",
                choices: function(){
                    var choiceArr = []
                    for (var i = 0; i < results.length; i++){
                        choiceArr.push(results[i].title)
                    } return choiceArr
                }
            },{
                type: "input",
                message: "Enter the ID of the employee that you would like to update.",
                name: "empID"
            }
        ]).then(function(answer){
            var chosenItem;
            for ( var i = 0; i < results.length; i++){
                if (results[i].title === answer.choice){
                    chosenItem = results[i]
                }
            }

            connection.query("UPDATE employee SET ? WHERE ?",
            [
                {
                    roleID:chosenItem.id
                },{
                    id:answer.empID
                }
            ], function(error){
                if(error) throw err;
                console.log("Role updated.")
                init();
            })
        })
    })
}



module.exports = index