SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `parking`;
DROP TABLE IF EXISTS `inbentario`;
DROP TABLE IF EXISTS `usuarios`;
DROP TABLE IF EXISTS `rol`;
DROP TABLE IF EXISTS `zentroa`;
SET FOREIGN_KEY_CHECKS = 1;

-- ========================================================
-- 1. ESTRUCTURA DE LAS TABLAS (5 ENTIDADES)
-- ========================================================

-- 1.1 Tabla: ZENTROA
CREATE TABLE `zentroa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `izena` varchar(100) NOT NULL COMMENT 'Nombre del centro',
  `kokapena` varchar(150) NOT NULL COMMENT 'Ubicación',
  `sortze_data` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1.2 Tabla: ROL
CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `izena` varchar(50) NOT NULL COMMENT 'ADMIN, IKASLE, IRAKASLE, INBENTARIO',
  `deskribapena` varchar(255) DEFAULT NULL COMMENT 'Descripción del rol',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_rol_izena` (`izena`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1.3 Tabla: USUARIOS
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `izena` varchar(50) NOT NULL COMMENT 'Nombre',
  `abizena` varchar(50) NOT NULL COMMENT 'Apellido',
  `emaila` varchar(100) NOT NULL COMMENT 'Correo único',
  `pasahitza` varchar(255) NOT NULL COMMENT 'Contraseña provisional',
  `rol_id` int(11) DEFAULT NULL COMMENT 'FK a Rol',
  `zentroa_id` int(11) DEFAULT NULL COMMENT 'FK a Zentroa',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_usuario_email` (`emaila`),
  KEY `fk_usuario_rol` (`rol_id`),
  KEY `fk_usuario_zentroa` (`zentroa_id`),
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario_zentroa` FOREIGN KEY (`zentroa_id`) REFERENCES `zentroa` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1.4 Tabla: INBENTARIO
CREATE TABLE `inbentario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `izena` varchar(100) NOT NULL COMMENT 'Nombre del objeto o equipo',
  `kopurua` int(11) NOT NULL DEFAULT 1 COMMENT 'Cantidad',
  `egoera` enum('ONDO','ERABILI_EZINIK','MANTENIMENDUAN','GALDUTAKO') DEFAULT 'ONDO' COMMENT 'Estado del equipo',
  `zentroa_id` int(11) NOT NULL COMMENT 'FK a Zentroa',
  `azken_berrikuspena` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Última revisión',
  PRIMARY KEY (`id`),
  KEY `fk_inbentario_zentroa` (`zentroa_id`),
  CONSTRAINT `fk_inbentario_zentroa` FOREIGN KEY (`zentroa_id`) REFERENCES `zentroa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1.5 Tabla: PARKING
CREATE TABLE `parking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zentroa_id` int(11) DEFAULT NULL COMMENT 'FK a Zentroa (NULL solo si es visitante)',
  `plaza_numero` int(11) NOT NULL COMMENT 'Número de plaza',
  `mota` enum('IKASLE','IRAKASLE','BISITARI') NOT NULL COMMENT 'Tipo de plaza',
  `egoera` enum('LIBRE','OKUPATUA','ERRESERBATUA','INHABILITATUA') NOT NULL DEFAULT 'LIBRE' COMMENT 'Estado',
  `erabiltzaile_id` int(11) DEFAULT NULL COMMENT 'FK a Usuarios (NULL si es visitante)',
  `bisitari_izena` varchar(100) DEFAULT NULL COMMENT 'Nombre visitante (NULL si no es visitante)',
  `matrikula` varchar(15) NOT NULL COMMENT 'Matrícula (Obligatoria)',
  `emaila` varchar(100) DEFAULT NULL COMMENT 'Obligatorio para ikasle/irakasle, opcional para visitantes',
  `erreserba_data` datetime DEFAULT NULL COMMENT 'Fecha reserva (Opcional)',
  `sarrera_data` datetime NOT NULL COMMENT 'Fecha entrada (Obligatoria)',
  `irteera_data` datetime NOT NULL COMMENT 'Fecha salida (Obligatoria)',
  PRIMARY KEY (`id`),
  KEY `fk_parking_zentroa` (`zentroa_id`),
  KEY `fk_parking_usuario` (`erabiltzaile_id`),
  CONSTRAINT `fk_parking_zentroa` FOREIGN KEY (`zentroa_id`) REFERENCES `zentroa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_parking_usuario` FOREIGN KEY (`erabiltzaile_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;