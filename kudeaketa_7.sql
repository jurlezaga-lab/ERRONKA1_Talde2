-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: kudeaketa_7
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
  `izena` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kopurua` int NOT NULL DEFAULT '1',
  `egoera` enum('ONDO','ERABILI_EZINIK','MANTENIMENDUAN','GALDUTAKO') COLLATE utf8mb4_unicode_ci DEFAULT 'ONDO',
  `azken_berrikuspena` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `arduraduna_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_inbentario_usuario` (`arduraduna_id`),
  CONSTRAINT `fk_inbentario_usuario` FOREIGN KEY (`arduraduna_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inbentario`
--

LOCK TABLES `inbentario` WRITE;
/*!40000 ALTER TABLE `inbentario` DISABLE KEYS */;
INSERT INTO `inbentario` VALUES (1,'Plaka Nagusia (Xafla) - Intel - Desktop Board 01',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(2,'Txartel Grafikoa (Grafika) - NVIDIA - GeForce GT 218',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(3,'Disko Gogorra 1 - Western Digital - WD Blue SATA (WD5000AAKX)',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(4,'Disko Gogorra 2 - Seagate - Barracuda 7200.12 (ST3500418AS)',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(5,'RAM Memoria - Generikoa / Hainbat - DDR3 SDRAM',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(6,'Energi-iturria - PC CASE - PC CASE 600 (PC ATX 2.2 P4)',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(7,'Kaxa / Txasisa - Antec - NSK4482B',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(8,'Unitate Optikoa / DVD Irakurgailua - LG - DVD 24x (Irakurgailu eta grabagailua)',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(9,'Prozesadorea - Intel - Intel Core I3 540',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(10,'Disipadorea CPU - Intel - E97379-001 (Stock Cooler)',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(11,'Prozesadorea - Intel - Core i7-3770 3.4 GHz',1,'ONDO','2026-10-23 09:27:24',6),(12,'Disipadorea CPU - CYRMZAY - Stock LGA1155',1,'ONDO','2026-10-23 09:27:24',6),(13,'Plaka Nagusia (Xafla) - ASUS - P8H61-MX USB3',1,'ONDO','2026-10-23 09:27:24',6),(14,'Txartel Grafikoa (Grafika) - AMD - Radeon HD 3650 - 512 MB DDR2',1,'ONDO','2026-10-23 09:27:24',6),(15,'Disko Gogorra 1 - Western Digital - WD Blue 500GB SATA',1,'ONDO','2026-10-23 09:27:24',6),(16,'RAM Memoria 1 - Kingston - KVR16N11/8 - 8 GB DDR3 - 1600',1,'ONDO','2026-10-23 09:27:24',6),(17,'RAM Memoria 2 - Kingston - KVR1333D3N9/4 - 4 GB DDR3 - 1333',1,'ONDO','2026-10-23 09:27:24',6),(18,'Energi-iturria - FSP Group - FSP300-60EP(2) - 300W',1,'ONDO','2026-10-23 09:27:24',6),(19,'Kaxa / Txasisa - APITECG - ATX',1,'ONDO','2026-10-23 09:27:24',6),(20,'Unitate Optikoa / DVD Irakurgailua - LG - GH24NSB0 (DVD + RW, Super multi)',1,'ONDO','2026-10-23 09:27:24',6),(21,'RAM memoria - Kingston - DDR3',1,'ONDO','2026-10-23 09:27:24',6),(22,'Txartel grafikoa - XpertVision - DDR2 (HD2400PRO)',1,'ONDO','2026-10-23 09:27:24',6),(23,'prozesadorea - Intel - Intel core  i5- 2400',1,'ONDO','2026-10-23 09:27:24',6),(24,'Plaka nagusia - Intel - btbl134009cc',1,'ONDO','2026-10-23 09:27:24',6),(25,'disko gogorra - Seagate - Barracuda 7200.12',1,'ONDO','2026-10-23 09:27:24',6),(26,'alimentazio iturria - Hiditec - PSX 500W',1,'ONDO','2026-10-23 09:27:24',6),(27,'kutxa - LG - X-Lan',1,'ONDO','2026-10-23 09:27:24',6),(28,'disipadorea - Intel - E30307-001',1,'ONDO','2026-10-23 09:27:24',6),(29,'DVD irakurgailua - LG - GH22NS70',1,'ONDO','2026-10-23 09:27:24',6),(30,'Plaka - Asus - B85M-G',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(31,'Kutxa - NOX - /',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(32,'Txartel grafikoa - Asus - C872MP1',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(33,'Disipadorea - Intel - E97378-001',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(34,'RAM - Kingstom - KVR13N9S8/2',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(35,'RAM - Kingstom - KVR16N11S8/4',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(36,'Alimentazio iturria - Huntkey - HK350-12PP',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(37,'Disko gogorra - WD - WD5000AAKX',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(38,'Irakurgailua - Super WriteMaster - M-DISC',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(39,'Energia-Iturria - Anima - APSI500',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(40,'Energia-Iturria - ASUS - A-30F',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(41,'Energia-Iturria - Hiditec - Seo 500W',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(42,'Prozesadorea (CPU) - Intel - Core i7-3770',5,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(43,'Plaka Nagusia - Gigabyte - GA-945P-S3',2,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(44,'Disko Gogorra (IDE/ATA) - Seagate - Barracuda ATA IV (ST340016A)',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(45,'Disko Gogorra (SATA) - Hitachi - Deskstar (HDS725050KLA360)',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(46,'Txartel grafikoa - Acer - AT Radeon HD 3650',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(47,'Txartel Grafikoa (GPU) - ASUS - GeForce EN210 Silent (EN210 SILENT/DI/1GD3/V2(LP))',2,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(48,'Txartel Grafikoa - ASUS - EN210 SILENT/DI/1GD3/V2(LP)',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(49,'Txartel Grafikoa - Palit - GeForce GT 210',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(50,'Disipadorea - AVC - Standard Fan',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(51,'Disipadorea - AVC / Lenovo - (FRU) 03T9513.',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(52,'Haizagailua - Generikoa / OEM - Barneko PC Hizlaria',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(53,'Grabagailu/Irakurgailu Optikoa - Lite-On - DH-16AFSH',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(54,'RAM 1 - Corsair - V8512MB400C·',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(55,'RAM 2 - Elixir - M2U51264DS8HAOG',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(56,'RAM 3 - Trascend - 113416-1988',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(57,'RAM 4 - Infineon - HYS64D32300GU-5-C',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(58,'RAM 5 - Samsung - M368L6423DTL',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(59,'RAM 6 - E-Bridge - 256DDR PC266',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6),(60,'RAM 8 - Corsair - ValueSelect (VS512MB400C3)',1,'ERABILI_EZINIK','2026-10-23 09:27:24',6);
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
  `plaza_numero` int NOT NULL,
  `rol_mota_id` int DEFAULT NULL COMMENT 'Plaza mota (IKASLE=2, IRAKASLE=3, BISITARI=NULL)',
  `egoera` enum('LIBRE','OKUPATUA','ERRESERBATUA','INHABILITATUA') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'LIBRE',
  `erabiltzaile_id` int DEFAULT NULL,
  `bisitari_izena` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bisitari_emaila` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `matrikula` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `erreserba_data` datetime DEFAULT NULL,
  `sarrera_data` datetime NOT NULL,
  `irteera_data` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_parking_usuario` (`erabiltzaile_id`),
  KEY `fk_parking_rol` (`rol_mota_id`),
  CONSTRAINT `fk_parking_rol` FOREIGN KEY (`rol_mota_id`) REFERENCES `rol` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_parking_usuario` FOREIGN KEY (`erabiltzaile_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parking`
--

LOCK TABLES `parking` WRITE;
/*!40000 ALTER TABLE `parking` DISABLE KEYS */;
INSERT INTO `parking` VALUES (1,101,2,'ERRESERBATUA',2,NULL,NULL,'1234ABC','2026-10-02 08:00:00','2026-10-02 08:05:00','2026-10-02 14:00:00'),(2,102,2,'LIBRE',3,NULL,NULL,'5555BBB',NULL,'2026-10-02 08:10:00','2026-10-02 13:30:00'),(3,201,3,'OKUPATUA',4,NULL,NULL,'9999XYZ','2026-10-02 07:30:00','2026-10-02 07:45:00','2026-10-02 15:00:00'),(4,202,3,'OKUPATUA',5,NULL,NULL,'8888LMN','2026-10-02 07:30:00','2026-10-02 07:50:00','2026-10-02 14:30:00'),(5,301,NULL,'OKUPATUA',NULL,'Marta Lopetegi','marta.visitante@gmail.com','1111BBB',NULL,'2026-10-02 09:00:00','2026-10-02 11:30:00'),(6,103,2,'OKUPATUA',8,NULL,NULL,'5678DEF',NULL,'2026-10-02 08:15:00','2026-10-02 13:45:00'),(7,203,3,'ERRESERBATUA',7,NULL,NULL,'3333GHI','2026-10-02 08:30:00','2026-10-02 08:35:00','2026-10-02 18:00:00'),(8,302,NULL,'LIBRE',NULL,'Carlos Ruiz',NULL,'2222CCC','2026-10-02 09:30:00','2026-10-02 10:00:00','2026-10-02 12:00:00'),(9,204,3,'OKUPATUA',10,NULL,NULL,'4444JKL','2026-10-02 07:45:00','2026-10-02 08:00:00','2026-10-02 15:30:00'),(10,303,NULL,'INHABILITATUA',NULL,'Lucia Sanz','lucia.sanz@proveedor.es','7777KKK',NULL,'2026-10-02 08:00:00','2026-10-02 09:00:00');
/*!40000 ALTER TABLE `parking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `izena` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ADMIN, IKASLE, IRAKASLE, INBENTARIO, CHATBOT',
  `deskribapena` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `izena` (`izena`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'ADMIN','Administrador del sistema con acceso total'),(2,'IKASLE','Alumnado con permisos de lectura y consulta de parking'),(3,'IRAKASLE','Profesorado con permisos sobre su parking e información'),(4,'INBENTARIO','Gestor de inventario con permisos CRUD en equipos'),(5,'CHATBOT','Asistente virtual web con permisos exclusivos de consulta y lectura');
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
  `izena` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abizena` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emaila` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pasahitza` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rol_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emaila` (`emaila`),
  KEY `fk_usuario_rol` (`rol_id`),
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Aitor','Iturbe','aitor.admin@tartanga.eu','1234',1),(2,'Miren','Goikoetxea','miren.ikasle@tartanga.eu','1234',2),(3,'Unai','Etxebarria','unai.ikasle@tartanga.eu','1234',2),(4,'Jon','Urrutia','jon.irakasle@tartanga.eu','1234',3),(5,'Ane','Zubizarreta','ane.irakasle@tartanga.eu','1234',3),(6,'Koldo','Garcia','koldo.inbentario@elorrieta.eu','1234',4),(7,'Amaia','Larrañaga','amaia.irakasle@elorrieta.eu','1234',3),(8,'Iker','Bilbao','iker.ikasle@elorrieta.eu','1234',2),(9,'Nerea','Agirre','nerea.admin@txurdinaga.eu','1234',1),(10,'Gorka','Mendoza','gorka.irakasle@txurdinaga.eu','1234',3),(11,'Bot','Assistant','chatbot.service@web.eu','1234',5);
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
 1 AS `bisitari_emaila`,
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
 1 AS `azken_berrikuspena`,
 1 AS `arduraduna`*/;
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
-- Dumping routines for database 'kudeaketa_7'
--

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
/*!50001 VIEW `v_admin_parking_eta_inbentario` AS select 'PARKING' AS `jatorria`,`p`.`id` AS `id_elementoa`,concat('Plaza: ',`p`.`plaza_numero`,' (Mota: ',ifnull(`r`.`izena`,'BISITARI'),')') AS `izena_edo_deskribapena`,`p`.`egoera` AS `egoera`,`p`.`sarrera_data` AS `azken_eguneratzea` from (`parking` `p` left join `rol` `r` on((`p`.`rol_mota_id` = `r`.`id`))) union all select 'INBENTARIO' AS `jatorria`,`inbentario`.`id` AS `id_elementoa`,concat('Materiala: ',`inbentario`.`izena`,' (Kopurua: ',`inbentario`.`kopurua`,')') AS `izena_edo_deskribapena`,`inbentario`.`egoera` AS `egoera`,`inbentario`.`azken_berrikuspena` AS `azken_eguneratzea` from `inbentario` */;
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
/*!50001 VIEW `v_bisitari_parking` AS select `parking`.`id` AS `id`,`parking`.`plaza_numero` AS `plaza_numero`,`parking`.`bisitari_izena` AS `bisitari_izena`,`parking`.`matrikula` AS `matrikula`,`parking`.`bisitari_emaila` AS `bisitari_emaila`,`parking`.`sarrera_data` AS `sarrera_data`,`parking`.`irteera_data` AS `irteera_data` from `parking` where (`parking`.`rol_mota_id` is null) */;
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
/*!50001 VIEW `v_ikasle_bere_parking` AS select `p`.`id` AS `id`,`p`.`plaza_numero` AS `plaza_numero`,`p`.`egoera` AS `egoera`,`p`.`matrikula` AS `matrikula`,`p`.`sarrera_data` AS `sarrera_data`,`p`.`irteera_data` AS `irteera_data` from (`parking` `p` join `usuarios` `u` on((`p`.`erabiltzaile_id` = `u`.`id`))) where ((`p`.`rol_mota_id` = 2) and (`u`.`emaila` = substring_index(current_user(),'@',1))) */;
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
/*!50001 VIEW `v_inbentario_kudeaketa` AS select `i`.`id` AS `id`,`i`.`izena` AS `artikulua`,`i`.`kopurua` AS `kopurua`,`i`.`egoera` AS `egoera`,`i`.`azken_berrikuspena` AS `azken_berrikuspena`,`u`.`izena` AS `arduraduna` from (`inbentario` `i` left join `usuarios` `u` on((`i`.`arduraduna_id` = `u`.`id`))) */;
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
/*!50001 VIEW `v_irakasle_bere_parking` AS select `p`.`id` AS `id`,`p`.`plaza_numero` AS `plaza_numero`,`p`.`egoera` AS `egoera`,`p`.`matrikula` AS `matrikula`,`p`.`sarrera_data` AS `sarrera_data`,`p`.`irteera_data` AS `irteera_data` from (`parking` `p` join `usuarios` `u` on((`p`.`erabiltzaile_id` = `u`.`id`))) where ((`p`.`rol_mota_id` = 3) and (`u`.`emaila` = substring_index(current_user(),'@',1))) */;
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

-- Dump completed on 2026-10-23  9:47:36
