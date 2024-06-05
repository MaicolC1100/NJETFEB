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

CREATE TABLE `asignacion_vale` (
  `id_asigvale` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del vale asignado',
  `n_vale` bigint(20) NOT NULL COMMENT 'Número del vale',
  `id_usuario` int(11) NOT NULL COMMENT 'Identificador del usuario que asigna el vale',
  `id_empresa` int(11) NOT NULL COMMENT 'Identificador de la empresa asociada al vale',
  `id_empleado` int(11) NOT NULL COMMENT 'Identificador del empleado asignado al vale',
  `placa` varchar(50) NOT NULL COMMENT 'Placa del vehículo utilizado',
  `origen` varchar(255) NOT NULL COMMENT 'Lugar de origen del servicio',
  `destino` varchar(255) NOT NULL COMMENT 'Lugar de destino del servicio',
  `motivo` varchar(255) NOT NULL COMMENT 'Motivo del servicio',
  `valorvale` decimal(10,2) NOT NULL COMMENT 'Valor del vale',
  `fecha_creacion` date NOT NULL COMMENT 'Fecha de creación del vale',
  `fecha_aprobacion` date NOT NULL COMMENT 'Fecha de aprobación del vale',
  `fecha_servicio` date NOT NULL COMMENT 'Fecha en que se prestará el servicio',
  `identificacion_pasajero_1` int(11) DEFAULT NULL COMMENT 'Identificación del primer pasajero',
  `identificacion_pasajero_2` int(11) DEFAULT NULL COMMENT 'Identificación del segundo pasajero',
  `identificacion_pasajero_3` int(11) DEFAULT NULL COMMENT 'Identificación del tercer pasajero',
  `identificacion_pasajero_4` int(11) DEFAULT NULL COMMENT 'Identificación del cuarto pasajero',
  PRIMARY KEY (`id_asigvale`),
  KEY `fk_usuario` (`id_usuario`),
  KEY `fk_empresa` (`id_empresa`),
  KEY `fk_pasajero1` (`identificacion_pasajero_1`),
  KEY `fk_pasajero2` (`identificacion_pasajero_2`),
  KEY `fk_pasajero3` (`identificacion_pasajero_3`),
  KEY `fk_pasajero4` (`identificacion_pasajero_4`),
  KEY `fk_empleado_asig` (`id_empleado`),
  CONSTRAINT `fk_empleado_asig` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`),
  CONSTRAINT `fk_empresa_asig` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`),
  CONSTRAINT `fk_pasajero1_asig` FOREIGN KEY (`identificacion_pasajero_1`) REFERENCES `empleado_cliente` (`id_empleado_cliente`),
  CONSTRAINT `fk_pasajero2_asig` FOREIGN KEY (`identificacion_pasajero_2`) REFERENCES `empleado_cliente` (`id_empleado_cliente`),
  CONSTRAINT `fk_pasajero3_asig` FOREIGN KEY (`identificacion_pasajero_3`) REFERENCES `empleado_cliente` (`id_empleado_cliente`),
  CONSTRAINT `fk_pasajero4_asig` FOREIGN KEY (`identificacion_pasajero_4`) REFERENCES `empleado_cliente` (`id_empleado_cliente`),
  CONSTRAINT `fk_usuario_asig` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) COMMENT='Tabla que almacena los vales asignados para servicios de transporte';


-- Scripts para elimninar las tablas

-- DROP TABLE IF EXISTS usuario_rol;
-- DROP TABLE IF EXISTS usuario;
-- DROP TABLE IF EXISTS rol;
-- DROP TABLE IF EXISTS empleado;
-- DROP TABLE IF EXISTS empleado_cliente;
-- DROP TABLE IF EXISTS empresa;
-- DROP TABLE IF EXISTS solicitud_vale; 
-- DROP TABLE IF EXISTS asignacion_vale;
-- Si ya se creo la base de datos se deben ejecutar estos scripts

-- ALTER TABLE usuarios
-- ADD CONSTRAINT unique_email UNIQUE (email);

-- Generando Registros de prueba

INSERT INTO `empresa` (nombre, estado) VALUES
('Belleza Express', 1),
('Chorrico', 1),
('Tech Solutions', 1),
('Global Ventures', 0),
('Innovative Industries', 1);


INSERT INTO `usuario` (nombre, apellido, telefono, email, password, estado) VALUES
('Carlos', 'García', '123-456-7890', 'carlos.garcia@example.com', 'pass1234', 1),
('María', 'Fernández', '234-567-8901', 'maria.fernandez@example.com', 'securepass', 1),
('José', 'Martínez', '345-678-9012', 'jose.martinez@example.com', 'mypassword', 0),
('Ana', 'López', '456-789-0123', 'ana.lopez@example.com', 'password1', 1),
('Luis', 'González', '567-890-1234', 'luis.gonzalez@example.com', 'password2', 0),
('Laura', 'Rodríguez', '678-901-2345', 'laura.rodriguez@example.com', 'password3', 1),
('Juan', 'Pérez', '789-012-3456', 'juan.perez@example.com', 'password4', 1),
('Elena', 'Sánchez', '890-123-4567', 'elena.sanchez@example.com', 'password5', 0),
('Miguel', 'Torres', '901-234-5678', 'miguel.torres@example.com', 'password6', 1),
('Isabel', 'Ramírez', '012-345-6789', 'isabel.ramirez@example.com', 'password7', 1),
('Pedro', 'Flores', '123-456-7891', 'pedro.flores@example.com', 'password8', 0),
('Carmen', 'Vargas', '234-567-8902', 'carmen.vargas@example.com', 'password9', 1),
('Jorge', 'Jiménez', '345-678-9013', 'jorge.jimenez@example.com', 'password10', 1),
('Sofía', 'Morales', '456-789-0124', 'sofia.morales@example.com', 'password11', 0),
('Andrés', 'Ortiz', '567-890-1235', 'andres.ortiz@example.com', 'password12', 1),
('Teresa', 'Castro', '678-901-2346', 'teresa.castro@example.com', 'password13', 1),
('David', 'Romero', '789-012-3457', 'david.romero@example.com', 'password14', 0),
('Lucía', 'Navarro', '890-123-4568', 'lucia.navarro@example.com', 'password15', 1),
('Raúl', 'Molina', '901-234-5679', 'raul.molina@example.com', 'password16', 1),
('Admin', 'User', '012-345-6790', 'admin@example.com', '$2a$10$BT1ry/ZeURYjajNHC5IUH.eV.99vkK4NMDwIY67se4pEyVC4EUD4K', 1);



INSERT INTO `empleado_cliente` (id_empresa, nombre, apellido, ctro_costo, gerencia, cedula, estado) VALUES
(1, 'Juan', 'Pérez', 'Centro A', 'Gerencia de Ventas', '12345678', 1),
(2, 'María', 'López', 'Centro B', 'Gerencia de Marketing', '23456789', 1),
(1, 'José', 'González', 'Centro C', 'Gerencia de Operaciones', '34567890', 0),
(2, 'Ana', 'Martínez', 'Centro D', 'Gerencia de Recursos Humanos', '45678901', 1),
(1, 'Pedro', 'Sánchez', 'Centro E', 'Gerencia Financiera', '56789012', 1),
(2, 'Laura', 'Rodríguez', 'Centro F', 'Gerencia de Desarrollo', '67890123', 0),
(1, 'Sofía', 'García', 'Centro G', 'Gerencia de Tecnología', '78901234', 1),
(2, 'David', 'Fernández', 'Centro H', 'Gerencia de Producción', '89012345', 1),
(1, 'Luis', 'Ramírez', 'Centro I', 'Gerencia de Calidad', '90123456', 0),
(2, 'Elena', 'Pérez', 'Centro J', 'Gerencia de Logística', '01234567', 1),
(1, 'Carlos', 'Martínez', 'Centro K', 'Gerencia de Investigación', '12345678', 1),
(2, 'María', 'González', 'Centro L', 'Gerencia de Ventas', '23456789', 0),
(1, 'Jorge', 'Sánchez', 'Centro M', 'Gerencia de Marketing', '34567890', 1),
(2, 'Ana', 'Rodríguez', 'Centro N', 'Gerencia de Operaciones', '45678901', 1),
(1, 'Teresa', 'López', 'Centro O', 'Gerencia de Recursos Humanos', '56789012', 0),
(2, 'Daniel', 'Martínez', 'Centro P', 'Gerencia Financiera', '67890123', 1),
(1, 'Isabel', 'García', 'Centro Q', 'Gerencia de Desarrollo', '78901234', 1),
(2, 'Alejandro', 'Fernández', 'Centro R', 'Gerencia de Tecnología', '89012345', 0),
(1, 'Sara', 'Ramírez', 'Centro S', 'Gerencia de Producción', '90123456', 1),
(2, 'Luisa', 'Pérez', 'Centro T', 'Gerencia de Calidad', '01234567', 1);

 INSERT INTO `empleado` (cedula, nombre, apellido, cargo, celular, correo, placa, estado) VALUES
('12345678', 'Juan', 'Pérez', 'Gerente de Ventas', '123-456-7890', 'juan.perez@example.com', 'ABC123', 1),
('23456789', 'María', 'López', 'Especialista en Marketing', '234-567-8901', 'maria.lopez@example.com', 'DEF456', 1),
('34567890', 'José', 'González', 'Analista de Operaciones', '345-678-9012', 'jose.gonzalez@example.com', 'GHI789', 0),
('45678901', 'Ana', 'Martínez', 'Coordinadora de Recursos Humanos', '456-789-0123', 'ana.martinez@example.com', 'JKL012', 1),
('56789012', 'Pedro', 'Sánchez', 'Contador', '567-890-1234', 'pedro.sanchez@example.com', 'MNO345', 1),
('67890123', 'Laura', 'Rodríguez', 'Desarrolladora de Software', '678-901-2345', 'laura.rodriguez@example.com', 'PQR678', 0),
('78901234', 'Sofía', 'García', 'Ingeniera de Sistemas', '789-012-3456', 'sofia.garcia@example.com', 'STU901', 1),
('89012345', 'David', 'Fernández', 'Supervisor de Producción', '890-123-4567', 'david.fernandez@example.com', 'VWX234', 1),
('90123456', 'Luis', 'Ramírez', 'Especialista en Calidad', '901-234-5678', 'luis.ramirez@example.com', 'YZA567', 0),
('01234567', 'Elena', 'Pérez', 'Logística', '012-345-6789', 'elena.perez@example.com', 'BCD890', 1),
('12345679', 'Carlos', 'Martínez', 'Investigador', '123-456-7891', 'carlos.martinez@example.com', 'EFG123', 1),
('23456780', 'María', 'González', 'Vendedora', '234-567-8902', 'maria.gonzalez@example.com', 'HIJ456', 0),
('34567891', 'Jorge', 'Sánchez', 'Especialista en Marketing', '345-678-9013', 'jorge.sanchez@example.com', 'KLM789', 1),
('45678902', 'Ana', 'Rodríguez', 'Analista de Operaciones', '456-789-0124', 'ana.rodriguez@example.com', 'NOP012', 1),
('56789013', 'Teresa', 'López', 'Coordinadora de Recursos Humanos', '567-890-1235', 'teresa.lopez@example.com', 'QRS345', 0),
('67890124', 'Daniel', 'Martínez', 'Contador', '678-901-2346', 'daniel.martinez@example.com', 'TUV678', 1),
('78901235', 'Isabel', 'García', 'Desarrolladora de Software', '789-012-3457', 'isabel.garcia@example.com', 'WXY901', 1),
('89012346', 'Alejandro', 'Fernández', 'Ingeniero de Sistemas', '890-123-4568', 'alejandro.fernandez@example.com', 'ZAB234', 0),
('90123457', 'Sara', 'Ramírez', 'Supervisora de Producción', '901-234-5679', 'sara.ramirez@example.com', 'CDE567', 1),
('01234568', 'Luisa', 'Pérez', 'Especialista en Calidad', '012-345-6790', 'luisa.perez@example.com', 'FGH890', 1);
