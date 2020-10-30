INSERT INTO department (name)
VALUES ("HR"), ("Accounting"), ("Legal"), ("Marketing"), ("Sales");

INSERT INTO role (position, salary, departmentID)
VALUE ("HR Representitive", 250000, 1), ("Head Accountant", 150000, 2), ("Attorney", 300000, 3), ("Marketing Director", 295000, 4), ("President of Sales", 500000, 5);

INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES ("Jennifer", "Anniston", 1, null), ("Courteney", "Cox", 2, 1), ("Matthew", "Perry", 3, 2), ("Matt", "LeBlanc", 4, 5), ("David", "Schwimmer", 5, null)