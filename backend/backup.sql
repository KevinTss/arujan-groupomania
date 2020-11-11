CREATE SCHEMA `groupomania` ;

-- On error: Client does not support authentication protocol requested by server; consider upgrading MySQL client
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootpass'
flush privileges;
-- https://medium.com/codespace69/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server-consider-8afadc2385e2


-- Create user table
CREATE TABLE `groupomania`.`users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `id_user_UNIQUE` (`id_user` ASC) VISIBLE);


ALTER TABLE `groupomania`.`users` 
DROP COLUMN `last_name`,
CHANGE COLUMN `name` `username` VARCHAR(45) NULL DEFAULT NULL ;

ALTER TABLE `groupomania`.`users` 
CHANGE COLUMN `password` `password` VARCHAR(120) NULL DEFAULT NULL ;
