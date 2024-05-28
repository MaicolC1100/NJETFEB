CREATE TABLE usuario (
  id_usuario int AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único del usuario',
  nombre varchar(100) NOT NULL COMMENT 'Nombre del usuario',
  apellido varchar(100) DEFAULT NULL COMMENT 'Apellido del usuario',
  telefono varchar(20) DEFAULT NULL COMMENT 'Teléfono del usuario',
  email varchar(50) NOT NULL COMMENT 'Correo electrónico del usuario',
  password varchar(100) NOT NULL COMMENT 'Contraseña del usuario',
  estado TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Estado del usuario (1 = activo, 0 = inactivo)'
  UNIQUE (email)
) COMMENT 'Tabla que almacena información de los usuarios';

CREATE TABLE rol (
  id_rol int AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único del rol',
  nombre varchar(100) NOT NULL COMMENT 'Nombre del rol',
  estado TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Estado del rol (1 = activo, 0 = inactivo)'
) COMMENT 'Tabla que almacena los diferentes roles que pueden tener los usuarios';

CREATE TABLE usuario_rol (
  id_usuario_rol int AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único de la relación usuario-rol',
  id_usuario int NOT NULL COMMENT 'Identificador del usuario',
  id_rol int NOT NULL COMMENT 'Identificador del rol',
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
) COMMENT 'Tabla intermedia para asignar roles a los usuarios';

CREATE TABLE empleado (
  id_empleado int AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único del empleado',
  cedula varchar(50) NOT NULL COMMENT 'Cédula del empleado',
  nombre varchar(50) NOT NULL COMMENT 'Nombre del empleado',
  apellido varchar(100) NOT NULL COMMENT 'Apellido del empleado',
  cargo varchar(50) NOT NULL COMMENT 'Cargo del empleado',
  celular varchar(50) NOT NULL COMMENT 'Celular del empleado',
  correo varchar(50) NOT NULL COMMENT 'Correo electrónico del empleado',
  placa varchar(50) NOT NULL COMMENT 'Placa del empleado',
  estado TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Estado del empleado (1 = activo, 0 = inactivo)',
  UNIQUE (cedula)
) COMMENT 'Tabla que almacena la información de los empleados';

CREATE TABLE empresa (
  id_empresa int AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único de la empresa',
  nombre varchar(100) NOT NULL COMMENT 'Nombre de la empresa',
  estado TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Estado de la empresa (1 = activa, 0 = inactiva)'
) COMMENT 'Tabla que almacena la información de las empresas';

CREATE TABLE empleado_cliente (
  id_empleado_cliente int AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único de la relación empleado-cliente',
  id_empresa int NOT NULL COMMENT 'Identificador de la empresa',
  nombre varchar(100) NOT NULL COMMENT 'Nombre del empleado cliente',
  apellido varchar(100) NOT NULL COMMENT 'Apellido del empleado cliente',
  ctro_costo varchar(50) NOT NULL COMMENT 'Centro de costo',
  gerencia varchar(50) NOT NULL COMMENT 'Gerencia del empleado cliente',
  cedula varchar(50) NOT NULL COMMENT 'Cédula del empleado cliente',
  estado TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Estado de la relación (1 = activo, 0 = inactivo)',
  FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
) COMMENT 'Tabla que almacena la relación entre empleados y clientes';

CREATE TABLE solicitud_vale (
    id_solicitud_vale INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único de la solicitud de vale',
    n_vale BIGINT(11) COMMENT 'Número de vale asociado a la solicitud',
    id_usuario INT NOT NULL COMMENT 'Identificador del usuario que realiza la solicitud, referencia a la tabla usuario',
    id_empresa INT NOT NULL COMMENT 'Identificador de la empresa asociada, referencia a la tabla empresa',
    origen VARCHAR(255) NOT NULL COMMENT 'Lugar de origen del viaje o servicio',
    destino VARCHAR(255) NOT NULL COMMENT 'Lugar de destino del viaje o servicio',
    motivo VARCHAR(255) NOT NULL COMMENT 'Motivo de la solicitud del vale',
    fecha_creacion DATE NOT NULL DEFAULT NOW() COMMENT 'Fecha en que se creó la solicitud',
    fecha_aprobacion DATE NOT NULL COMMENT 'Fecha en que se aprobó la solicitud',
    fecha_servicio DATE NOT NULL COMMENT 'Fecha en que se realizará el servicio',
    identificacion_pasajero_1 INT COMMENT 'Identificación del primer pasajero, referencia a la tabla empleado_cliente',
    identificacion_pasajero_2 INT COMMENT 'Identificación del segundo pasajero, referencia a la tabla empleado_cliente',
    identificacion_pasajero_3 INT COMMENT 'Identificación del tercer pasajero, referencia a la tabla empleado_cliente',
    identificacion_pasajero_4 INT COMMENT 'Identificación del cuarto pasajero, referencia a la tabla empleado_cliente',
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (identificacion_pasajero_1) REFERENCES empleado_cliente(id_empleado_cliente),
    FOREIGN KEY (identificacion_pasajero_2) REFERENCES empleado_cliente(id_empleado_cliente),
    FOREIGN KEY (identificacion_pasajero_3) REFERENCES empleado_cliente(id_empleado_cliente),
    FOREIGN KEY (identificacion_pasajero_4) REFERENCES empleado_cliente(id_empleado_cliente)
) COMMENT 'Tabla que almacena las solicitudes de vales de viaje o servicio';

-- Scripts para elimninar las tablas

-- DROP TABLE IF EXISTS usuario_rol;
-- DROP TABLE IF EXISTS usuario;
-- DROP TABLE IF EXISTS rol;
-- DROP TABLE IF EXISTS empleado;
-- DROP TABLE IF EXISTS empleado_cliente;
-- DROP TABLE IF EXISTS empresa;
-- DROP TABLE IF EXISTS solicitud_vale; 

-- Si ya se creo la base de datos se deben ejecutar estos scripts

-- ALTER TABLE usuarios
-- ADD CONSTRAINT unique_email UNIQUE (email);
 