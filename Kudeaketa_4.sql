CREATE DATABASE  IF NOT EXISTS `kudeaketa_3` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `kudeaketa_3`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: kudeaketa_3
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `inbentario`
--

DROP TABLE IF EXISTS `inbentario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inbentario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `izena` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nombre del objeto o equipo',
  `kopurua` int NOT NULL DEFAULT '1' COMMENT 'Cantidad',
  `egoera` enum('ONDO','ERABILI_EZINIK','MANTENIMENDUAN','GALDUTAKO') COLLATE utf8mb4_unicode_ci DEFAULT 'ONDO' COMMENT 'Estado del equipo',
  `azken_berrikuspena` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Última revisión',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inbentario`
--

LOCK TABLES `inbentario` WRITE;
/*!40000 ALTER TABLE `inbentario` DISABLE KEYS */;
/*!40000 ALTER TABLE `inbentario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parking`
--

DROP TABLE IF EXISTS `parking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plaza_numero` int NOT NULL COMMENT 'Número de plaza',
  `mota` enum('IKASLE','IRAKASLE','BISITARI') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Tipo de plaza',
  `egoera` enum('LIBRE','OKUPATUA','ERRESERBATUA','INHABILITATUA') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'LIBRE' COMMENT 'Estado',
  `erabiltzaile_id` int DEFAULT NULL COMMENT 'FK a Usuarios (NULL si es visitante)',
  `bisitari_izena` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Nombre visitante (NULL si no es visitante)',
  `matrikula` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Matrícula (Obligatoria)',
  `emaila` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Obligatorio para ikasle/irakasle, opcional para visitantes',
  `erreserba_data` datetime DEFAULT NULL COMMENT 'Fecha reserva (Opcional)',
  `sarrera_data` datetime NOT NULL COMMENT 'Fecha entrada (Obligatoria)',
  `irteera_data` datetime NOT NULL COMMENT 'Fecha salida (Obligatoria)',
  PRIMARY KEY (`id`),
  KEY `fk_parking_usuario` (`erabiltzaile_id`),
  CONSTRAINT `fk_parking_usuario` FOREIGN KEY (`erabiltzaile_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parking`
--

LOCK TABLES `parking` WRITE;
/*!40000 ALTER TABLE `parking` DISABLE KEYS */;
INSERT INTO `parking` VALUES (1,101,'IKASLE','ERRESERBATUA',2,NULL,'1234ABC','miren.ikasle@tartanga.eu','2026-10-02 08:00:00','2026-10-02 08:05:00','2026-10-02 14:00:00'),(2,102,'IKASLE','LIBRE',3,NULL,'5555BBB','unai.ikasle@tartanga.eu',NULL,'2026-10-02 08:10:00','2026-10-02 13:30:00'),(3,201,'IRAKASLE','OKUPATUA',4,NULL,'9999XYZ','jon.irakasle@tartanga.eu','2026-10-02 07:30:00','2026-10-02 07:45:00','2026-10-02 15:00:00'),(4,202,'IRAKASLE','OKUPATUA',5,NULL,'8888LMN','ane.irakasle@tartanga.eu','2026-10-02 07:30:00','2026-10-02 07:50:00','2026-10-02 14:30:00'),(5,301,'BISITARI','OKUPATUA',NULL,'Marta Lopetegi','1111BBB','marta.visitante@gmail.com',NULL,'2026-10-02 09:00:00','2026-10-02 11:30:00'),(6,101,'IKASLE','OKUPATUA',8,NULL,'5678DEF','iker.ikasle@elorrieta.eu',NULL,'2026-10-02 08:15:00','2026-10-02 13:45:00'),(7,201,'IRAKASLE','ERRESERBATUA',7,NULL,'3333GHI','amaia.irakasle@elorrieta.eu','2026-10-02 08:30:00','2026-10-02 08:35:00','2026-10-02 18:00:00'),(8,302,'BISITARI','LIBRE',NULL,'Carlos Ruiz','2222CCC',NULL,'2026-10-02 09:30:00','2026-10-02 10:00:00','2026-10-02 12:00:00'),(9,201,'IRAKASLE','OKUPATUA',10,NULL,'4444JKL','gorka.irakasle@txurdinaga.eu','2026-10-02 07:45:00','2026-10-02 08:00:00','2026-10-02 15:30:00'),(10,303,'BISITARI','INHABILITATUA',NULL,'Lucia Sanz','7777KKK','lucia.sanz@proveedor.es',NULL,'2026-10-02 08:00:00','2026-10-02 09:00:00');
/*!40000 ALTER TABLE `parking` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_balidatu_parking_emaila` BEFORE INSERT ON `parking` FOR EACH ROW BEGIN
    IF (NEW.mota IN ('IKASLE', 'IRAKASLE')) AND (NEW.emaila IS NULL OR NEW.emaila = '') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Errorea: IKASLE eta IRAKASLE motako erabiltzaileek emaila edukitzea derrigorrezkoa da.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_balidatu_data_koherentzia` BEFORE INSERT ON `parking` FOR EACH ROW BEGIN
    IF NEW.sarrera_data >= NEW.irteera_data THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Errorea: Sarrera data irteera data baino lehenagokoa izan behar da.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_auditoria_parking_insert` AFTER INSERT ON `parking` FOR EACH ROW BEGIN
    INSERT INTO parking_auditoria (parking_id, ekintza, erabiltzailea, deskribapena)
    VALUES (NEW.id, 'INSERT', USER(), CONCAT('Plaza berria sortua: ', NEW.plaza_numero, ' Mota: ', NEW.mota));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `parking_auditoria`
--

DROP TABLE IF EXISTS `parking_auditoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parking_auditoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parking_id` int NOT NULL,
  `ekintza` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `erabiltzailea` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` datetime DEFAULT CURRENT_TIMESTAMP,
  `deskribapena` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parking_auditoria`
--

LOCK TABLES `parking_auditoria` WRITE;
/*!40000 ALTER TABLE `parking_auditoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `parking_auditoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `izena` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ADMIN, IKASLE, IRAKASLE, INBENTARIO',
  `deskribapena` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Descripción del rol',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_rol_izena` (`izena`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'ADMIN','Administrador del sistema con acceso total'),(2,'IKASLE','Alumnado con permisos de lectura y consulta de parking'),(3,'IRAKASLE','Profesorado con permisos sobre su parking e información'),(4,'INBENTARIO','Gestor de inventario con permisos CRUD en equipos');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `izena` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nombre',
  `abizena` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Apellido',
  `emaila` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Correo único',
  `pasahitza` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Contraseña provisional',
  `rol_id` int DEFAULT NULL COMMENT 'FK a Rol',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_usuario_email` (`emaila`),
  KEY `fk_usuario_rol` (`rol_id`),
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Aitor','Iturbe','aitor.admin@tartanga.eu','1234',1),(2,'Miren','Goikoetxea','miren.ikasle@tartanga.eu','1234',2),(3,'Unai','Etxebarria','unai.ikasle@tartanga.eu','1234',2),(4,'Jon','Urrutia','jon.irakasle@tartanga.eu','1234',3),(5,'Ane','Zubizarreta','ane.irakasle@tartanga.eu','1234',3),(6,'Koldo','Garcia','koldo.inbentario@elorrieta.eu','1234',4),(7,'Amaia','Larrañaga','amaia.irakasle@elorrieta.eu','1234',3),(8,'Iker','Bilbao','iker.ikasle@elorrieta.eu','1234',2),(9,'Nerea','Agirre','nerea.admin@txurdinaga.eu','1234',1),(10,'Gorka','Mendoza','gorka.irakasle@txurdinaga.eu','1234',3);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `v_admin_parking_eta_inbentario`
--

DROP TABLE IF EXISTS `v_admin_parking_eta_inbentario`;
/*!50001 DROP VIEW IF EXISTS `v_admin_parking_eta_inbentario`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_admin_parking_eta_inbentario` AS SELECT 
 1 AS `jatorria`,
 1 AS `id_elementoa`,
 1 AS `izena_edo_deskribapena`,
 1 AS `egoera`,
 1 AS `azken_eguneratzea`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_bisitari_parking`
--

DROP TABLE IF EXISTS `v_bisitari_parking`;
/*!50001 DROP VIEW IF EXISTS `v_bisitari_parking`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_bisitari_parking` AS SELECT 
 1 AS `id`,
 1 AS `plaza_numero`,
 1 AS `bisitari_izena`,
 1 AS `matrikula`,
 1 AS `emaila`,
 1 AS `sarrera_data`,
 1 AS `irteera_data`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_ikasle_bere_parking`
--

DROP TABLE IF EXISTS `v_ikasle_bere_parking`;
/*!50001 DROP VIEW IF EXISTS `v_ikasle_bere_parking`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_ikasle_bere_parking` AS SELECT 
 1 AS `id`,
 1 AS `plaza_numero`,
 1 AS `egoera`,
 1 AS `matrikula`,
 1 AS `sarrera_data`,
 1 AS `irteera_data`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_inbentario_kudeaketa`
--

DROP TABLE IF EXISTS `v_inbentario_kudeaketa`;
/*!50001 DROP VIEW IF EXISTS `v_inbentario_kudeaketa`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_inbentario_kudeaketa` AS SELECT 
 1 AS `id`,
 1 AS `artikulua`,
 1 AS `kopurua`,
 1 AS `egoera`,
 1 AS `azken_berrikuspena`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_irakasle_bere_parking`
--

DROP TABLE IF EXISTS `v_irakasle_bere_parking`;
/*!50001 DROP VIEW IF EXISTS `v_irakasle_bere_parking`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_irakasle_bere_parking` AS SELECT 
 1 AS `id`,
 1 AS `plaza_numero`,
 1 AS `egoera`,
 1 AS `matrikula`,
 1 AS `sarrera_data`,
 1 AS `irteera_data`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'kudeaketa_3'
--

--
-- Dumping routines for database 'kudeaketa_3'
--
/*!50003 DROP FUNCTION IF EXISTS `fn_minutu_osotara_parking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_minutu_osotara_parking`(p_erabiltzaile_id INT) RETURNS int
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE v_minutuak INT DEFAULT 0;
    SELECT IFNULL(SUM(TIMESTAMPDIFF(MINUTE, sarrera_data, irteera_data)), 0) INTO v_minutuak
    FROM parking
    WHERE erabiltzaile_id = p_erabiltzaile_id;
    RETURN v_minutuak;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `fn_plaza_libreak` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_plaza_libreak`(p_mota VARCHAR(20)) RETURNS int
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE v_libreak INT DEFAULT 0;
    SELECT COUNT(*) INTO v_libreak
    FROM parking
    WHERE mota = p_mota AND egoera = 'LIBRE';
    RETURN v_libreak;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `fn_porzentajea_hondatuta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_porzentajea_hondatuta`() RETURNS decimal(5,2)
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE v_guztira INT DEFAULT 0;
    DECLARE v_hondatuta INT DEFAULT 0;
    
    SELECT IFNULL(SUM(kopurua), 0) INTO v_guztira FROM inbentario;
    IF v_guztira = 0 THEN 
        RETURN 0.00;
    END IF;
    
    SELECT IFNULL(SUM(kopurua), 0) INTO v_hondatuta 
    FROM inbentario 
    WHERE egoera IN ('ERABILI_EZINIK', 'GALDUTAKO');
    
    RETURN (v_hondatuta / v_guztira) * 100;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_erreserba_egin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_erreserba_egin`(
    IN p_erabiltzaile_id INT,
    IN p_plaza_num INT,
    IN p_matrikula VARCHAR(15),
    IN p_sarrera DATETIME,
    IN p_irteera DATETIME
)
BEGIN
    DECLARE v_mota ENUM('IKASLE','IRAKASLE','BISITARI');
    DECLARE v_rol_id INT;
    DECLARE v_emaila VARCHAR(100);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Erabiltzailea lortu
        SELECT rol_id, emaila INTO v_rol_id, v_emaila FROM usuarios WHERE id = p_erabiltzaile_id;
        
        IF v_rol_id = 2 THEN SET v_mota = 'IKASLE';
        ELSEIF v_rol_id = 3 THEN SET v_mota = 'IRAKASLE';
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: Rol no válido para plaza asignada';
        END IF;

        INSERT INTO parking (plaza_numero, mota, egoera, erabiltzaile_id, matrikula, emaila, erreserba_data, sarrera_data, irteera_data)
        VALUES (p_plaza_num, v_mota, 'ERRESERBATUA', p_erabiltzaile_id, p_matrikula, v_emaila, NOW(), p_sarrera, p_irteera);
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_garbitu_erreserba_okupatuak` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_garbitu_erreserba_okupatuak`()
BEGIN
    DECLARE v_done INT DEFAULT FALSE;
    DECLARE v_id INT;
    
    DECLARE cur_erreserbak CURSOR FOR 
        SELECT id FROM parking 
        WHERE egoera = 'ERRESERBATUA' AND irteera_data < NOW();
        
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

    OPEN cur_erreserbak;
    read_loop: LOOP
        FETCH cur_erreserbak INTO v_id;
        IF v_done THEN
            LEAVE read_loop;
        END IF;
        
        UPDATE parking SET egoera = 'LIBRE', erabiltzaile_id = NULL WHERE id = v_id;
    END LOOP;
    CLOSE cur_erreserbak;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_inbentario_txostena_eguneratu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_inbentario_txostena_eguneratu`(OUT p_aldatutak INT)
BEGIN
    DECLARE v_done INT DEFAULT FALSE;
    DECLARE v_inbentario_id INT;
    DECLARE v_kopurua INT;
    
    DECLARE cur_inbentario CURSOR FOR 
        SELECT id, kopurua FROM inbentario WHERE kopurua = 0;
        
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;
    
    SET p_aldatutak = 0;
    OPEN cur_inbentario;
    process_loop: LOOP
        FETCH cur_inbentario INTO v_inbentario_id, v_kopurua;
        IF v_done THEN
            LEAVE process_loop;
        END IF;
        
        UPDATE inbentario SET egoera = 'GALDUTAKO' WHERE id = v_inbentario_id;
        SET p_aldatutak = p_aldatutak + 1;
    END LOOP;
    CLOSE cur_inbentario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `v_admin_parking_eta_inbentario`
--

/*!50001 DROP VIEW IF EXISTS `v_admin_parking_eta_inbentario`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_admin_parking_eta_inbentario` AS select 'PARKING' AS `jatorria`,`parking`.`id` AS `id_elementoa`,concat('Plaza: ',`parking`.`plaza_numero`,' (',`parking`.`mota`,')') AS `izena_edo_deskribapena`,`parking`.`egoera` AS `egoera`,`parking`.`sarrera_data` AS `azken_eguneratzea` from `parking` union all select 'INBENTARIO' AS `jatorria`,`inbentario`.`id` AS `id_elementoa`,concat('Materiala: ',`inbentario`.`izena`,' (Kopurua: ',`inbentario`.`kopurua`,')') AS `izena_edo_deskribapena`,`inbentario`.`egoera` AS `egoera`,`inbentario`.`azken_berrikuspena` AS `azken_eguneratzea` from `inbentario` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_bisitari_parking`
--

/*!50001 DROP VIEW IF EXISTS `v_bisitari_parking`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_bisitari_parking` AS select `parking`.`id` AS `id`,`parking`.`plaza_numero` AS `plaza_numero`,`parking`.`bisitari_izena` AS `bisitari_izena`,`parking`.`matrikula` AS `matrikula`,`parking`.`emaila` AS `emaila`,`parking`.`sarrera_data` AS `sarrera_data`,`parking`.`irteera_data` AS `irteera_data` from `parking` where (`parking`.`mota` = 'BISITARI') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_ikasle_bere_parking`
--

/*!50001 DROP VIEW IF EXISTS `v_ikasle_bere_parking`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_ikasle_bere_parking` AS select `parking`.`id` AS `id`,`parking`.`plaza_numero` AS `plaza_numero`,`parking`.`egoera` AS `egoera`,`parking`.`matrikula` AS `matrikula`,`parking`.`sarrera_data` AS `sarrera_data`,`parking`.`irteera_data` AS `irteera_data` from `parking` where ((`parking`.`mota` = 'IKASLE') and (`parking`.`emaila` = substring_index(current_user(),'@',1))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_inbentario_kudeaketa`
--

/*!50001 DROP VIEW IF EXISTS `v_inbentario_kudeaketa`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_inbentario_kudeaketa` AS select `inbentario`.`id` AS `id`,`inbentario`.`izena` AS `artikulua`,`inbentario`.`kopurua` AS `kopurua`,`inbentario`.`egoera` AS `egoera`,`inbentario`.`azken_berrikuspena` AS `azken_berrikuspena` from `inbentario` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_irakasle_bere_parking`
--

/*!50001 DROP VIEW IF EXISTS `v_irakasle_bere_parking`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_irakasle_bere_parking` AS select `parking`.`id` AS `id`,`parking`.`plaza_numero` AS `plaza_numero`,`parking`.`egoera` AS `egoera`,`parking`.`matrikula` AS `matrikula`,`parking`.`sarrera_data` AS `sarrera_data`,`parking`.`irteera_data` AS `irteera_data` from `parking` where ((`parking`.`mota` = 'IRAKASLE') and (`parking`.`emaila` = substring_index(current_user(),'@',1))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-08 13:26:27
