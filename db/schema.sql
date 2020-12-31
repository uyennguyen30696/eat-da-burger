-- Remember to change this with our specific credentials
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Uyen3061';

DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  burger_name VARCHAR(30) NOT NULL,
  devoured BOOLEAN DEFAULT false
);
