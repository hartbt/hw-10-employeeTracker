const mysql = require ("myswql")
const index = require ("index.js")

const connection = mysql.createConnection({
    host: "localhost",
    port: "3305",
    user: "root",
    password: "HaHaidkman!",
    database: "employeeDB"
});

connection.connect(function(err){
    if(err) throw err
    init();
});

module.exports = connection