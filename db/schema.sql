DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;
USE employeeDB

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) UNIQUE NOT NULL
);

CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40),
    salary DECIMAL(10,2) NOT NULL,
    departmentID INT NOT NULL
);

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(40) UNIQUE NOT NULL,
    lastName VARCHAR(40) UNIQUE NOT NULL,
    roleID INT NOT NULL,
    managerID INT
);