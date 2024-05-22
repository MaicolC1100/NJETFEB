CREATE TABLE usuario (
  id_usuario int AUTO_INCREMENT PRIMARY KEY,
  nombre varchar(100) NOT NULL,
  apellido varchar(100) DEFAULT NULL,
  telefono varchar(20) DEFAULT NULL,
  email varchar(50) NOT NULL,
  password varchar(100) NOT NULL,
  estado TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE rol (
  id_rol int AUTO_INCREMENT PRIMARY KEY,
  nombre varchar(100) NOT NULL,
  estado TINYINT(1) NOT NULL DEFAULT 1
);


CREATE TABLE usuario_rol (
  id_usuario_rol int AUTO_INCREMENT PRIMARY KEY,
  id_usuario int NOT NULL,
  id_rol int NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

CREATE TABLE empleado (
  id_empleado int AUTO_INCREMENT PRIMARY KEY,
  cedula varchar(50) NOT NULL,
  nombre varchar(50) NOT NULL,
  cargo varchar(50) NOT NULL,
  celular varchar(50) NOT NULL,
  correo varchar(50) NOT NULL,
  placa varchar(50) NOT NULL,
  estado TINYINT(1) NOT NULL DEFAULT 1,
  UNIQUE (cedula)
);

CREATE TABLE empresa (
  id_empresa int AUTO_INCREMENT PRIMARY KEY,
  nombre varchar(100) NOT NULL,
  estado TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE empleado_cliente (
  id_empleado_cliente int AUTO_INCREMENT PRIMARY KEY,
  id_empresa int NOT NULL,
  nombre varchar(100) NOT NULL,
  ctro_costo varchar(50) NOT NULL,
  gerencia varchar(50) NOT NULL,
  cedula varchar(50) NOT NULL,
  estado TINYINT(1) NOT NULL DEFAULT 1,
  FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);

-- DROP TABLE IF EXISTS usuario_rol;
-- DROP TABLE IF EXISTS usuario;
-- DROP TABLE IF EXISTS rol;
-- DROP TABLE IF EXISTS empleado;
-- DROP TABLE IF EXISTS empleado_cliente;
-- DROP TABLE IF EXISTS empresa;