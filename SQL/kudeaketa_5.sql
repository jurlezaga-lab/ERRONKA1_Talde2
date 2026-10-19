SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS `kudeaketa_4`;
CREATE DATABASE `kudeaketa_4` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `kudeaketa_4`;

-- =============================================================================
-- 1. TAULAK ETA DATUAK
-- =============================================================================

CREATE TABLE `rol` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `izena` VARCHAR(50) NOT NULL UNIQUE COMMENT 'ADMIN, IKASLE, IRAKASLE, INBENTARIO, CHATBOT',
  `deskribapena` VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE `usuarios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `izena` VARCHAR(50) NOT NULL,
  `abizena` VARCHAR(50) NOT NULL,
  `emaila` VARCHAR(100) NOT NULL UNIQUE,
  `pasahitza` VARCHAR(255) NOT NULL,
  `rol_id` INT,
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `inbentario` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `izena` VARCHAR(100) NOT NULL,
  `kopurua` INT NOT NULL DEFAULT 1,
  `egoera` ENUM('ONDO','ERABILI_EZINIK','MANTENIMENDUAN','GALDUTAKO') DEFAULT 'ONDO',
  `azken_berrikuspena` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE `parking` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `plaza_numero` INT NOT NULL,
  `mota` ENUM('IKASLE','IRAKASLE','BISITARI') NOT NULL,
  `egoera` ENUM('LIBRE','OKUPATUA','ERRESERBATUA','INHABILITATUA') NOT NULL DEFAULT 'LIBRE',
  `erabiltzaile_id` INT DEFAULT NULL,
  `bisitari_izena` VARCHAR(100) DEFAULT NULL,
  `matrikula` VARCHAR(15) NOT NULL,
  `emaila` VARCHAR(100) DEFAULT NULL,
  `erreserba_data` DATETIME DEFAULT NULL,
  `sarrera_data` DATETIME NOT NULL,
  `irteera_data` DATETIME NOT NULL,
  CONSTRAINT `fk_parking_usuario` FOREIGN KEY (`erabiltzaile_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `parking_auditoria` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `parking_id` INT NOT NULL,
  `ekintza` VARCHAR(20) NOT NULL,
  `erabiltzailea` VARCHAR(100) NOT NULL,
  `data` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deskribapena` TEXT
) ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================================
-- 2. INSERT-AK
-- =============================================================================

INSERT INTO `rol` (`id`, `izena`, `deskribapena`) VALUES
(1, 'ADMIN', 'Administrador del sistema con acceso total'),
(2, 'IKASLE', 'Alumnado con permisos de lectura y consulta de parking'),
(3, 'IRAKASLE', 'Profesorado con permisos sobre su parking e información'),
(4, 'INBENTARIO', 'Gestor de inventario con permisos CRUD en equipos'),
(5, 'CHATBOT', 'Asistente virtual web con permisos exclusivos de consulta y lectura');

INSERT INTO `usuarios` (`id`, `izena`, `abizena`, `emaila`, `pasahitza`, `rol_id`) VALUES
(1, 'Aitor', 'Iturbe', 'aitor.admin@tartanga.eu', '1234', 1),
(2, 'Miren', 'Goikoetxea', 'miren.ikasle@tartanga.eu', '1234', 2),
(3, 'Unai', 'Etxebarria', 'unai.ikasle@tartanga.eu', '1234', 2),
(4, 'Jon', 'Urrutia', 'jon.irakasle@tartanga.eu', '1234', 3),
(5, 'Ane', 'Zubizarreta', 'ane.irakasle@tartanga.eu', '1234', 3),
(6, 'Koldo', 'Garcia', 'koldo.inbentario@elorrieta.eu', '1234', 4),
(7, 'Amaia', 'Larrañaga', 'amaia.irakasle@elorrieta.eu', '1234', 3),
(8, 'Iker', 'Bilbao', 'iker.ikasle@elorrieta.eu', '1234', 2),
(9, 'Nerea', 'Agirre', 'nerea.admin@txurdinaga.eu', '1234', 1),
(10, 'Gorka', 'Mendoza', 'gorka.irakasle@txurdinaga.eu', '1234', 3),
(11, 'Bot', 'Assistant', 'chatbot.service@web.eu', '1234', 5);

INSERT INTO `inbentario` (`id`, `izena`, `kopurua`, `egoera`) VALUES
(1, 'Proiektorea Epson EB-685Wi', 5, 'ONDO'),
(2, 'Ordenagailu eramangarria HP ProBook', 20, 'MANTENIMENDUAN'),
(3, 'Imprimagailu 3D Creality Ender 3', 3, 'ONDO'),
(4, 'Monitor Dell 24 P2419H', 12, 'ONDO'),
(5, 'Switch Cisco Catalyst 2960', 4, 'ONDO'),
(6, 'Proiektorea BenQ MH535', 2, 'ERABILI_EZINIK'),
(7, 'Kamera Web Logitech C920', 8, 'ONDO'),
(8, 'Osciloscopio Digital Hantek', 6, 'MANTENIMENDUAN'),
(9, 'Kit Arduino Uno Rev3', 15, 'GALDUTAKO'),
(10, 'Servidor Rack HP ProLiant', 1, 'ONDO');

INSERT INTO `parking` (`plaza_numero`, `mota`, `egoera`, `erabiltzaile_id`, `bisitari_izena`, `matrikula`, `emaila`, `erreserba_data`, `sarrera_data`, `irteera_data`) VALUES
(101, 'IKASLE', 'ERRESERBATUA', 2, NULL, '1234ABC', 'miren.ikasle@tartanga.eu', '2026-10-02 08:00:00', '2026-10-02 08:05:00', '2026-10-02 14:00:00'),
(102, 'IKASLE', 'LIBRE', 3, NULL, '5555BBB', 'unai.ikasle@tartanga.eu', NULL, '2026-10-02 08:10:00', '2026-10-02 13:30:00'),
(201, 'IRAKASLE', 'OKUPATUA', 4, NULL, '9999XYZ', 'jon.irakasle@tartanga.eu', '2026-10-02 07:30:00', '2026-10-02 07:45:00', '2026-10-02 15:00:00'),
(202, 'IRAKASLE', 'OKUPATUA', 5, NULL, '8888LMN', 'ane.irakasle@tartanga.eu', '2026-10-02 07:30:00', '2026-10-02 07:50:00', '2026-10-02 14:30:00'),
(301, 'BISITARI', 'OKUPATUA', NULL, 'Marta Lopetegi', '1111BBB', 'marta.visitante@gmail.com', NULL, '2026-10-02 09:00:00', '2026-10-02 11:30:00'),
(103, 'IKASLE', 'OKUPATUA', 8, NULL, '5678DEF', 'iker.ikasle@elorrieta.eu', NULL, '2026-10-02 08:15:00', '2026-10-02 13:45:00'),
(203, 'IRAKASLE', 'ERRESERBATUA', 7, NULL, '3333GHI', 'amaia.irakasle@elorrieta.eu', '2026-10-02 08:30:00', '2026-10-02 08:35:00', '2026-10-02 18:00:00'),
(302, 'BISITARI', 'LIBRE', NULL, 'Carlos Ruiz', '2222CCC', NULL, '2026-10-02 09:30:00', '2026-10-02 10:00:00', '2026-10-02 12:00:00'),
(204, 'IRAKASLE', 'OKUPATUA', 10, NULL, '4444JKL', 'gorka.irakasle@txurdinaga.eu', '2026-10-02 07:45:00', '2026-10-02 08:00:00', '2026-10-02 15:30:00'),
(303, 'BISITARI', 'INHABILITATUA', NULL, 'Lucia Sanz', '7777KKK', 'lucia.sanz@proveedor.es', NULL, '2026-10-02 08:00:00', '2026-10-02 09:00:00');


-- =============================================================================
-- 3. BISTAK (ALBERTOK ESAN ZUEN HAU EZ ZELA BEHARREZKOA)
-- =============================================================================

CREATE OR REPLACE VIEW `v_bisitari_parking` AS
SELECT id, plaza_numero, bisitari_izena, matrikula, emaila, sarrera_data, irteera_data 
FROM parking 
WHERE mota = 'BISITARI';

CREATE OR REPLACE VIEW `v_ikasle_bere_parking` AS
SELECT id, plaza_numero, egoera, matrikula, sarrera_data, irteera_data
FROM parking
WHERE mota = 'IKASLE' 
  AND emaila = SUBSTRING_INDEX(CURRENT_USER(), '@', 1);

CREATE OR REPLACE VIEW `v_irakasle_bere_parking` AS
SELECT id, plaza_numero, egoera, matrikula, sarrera_data, irteera_data
FROM parking
WHERE mota = 'IRAKASLE' 
  AND emaila = SUBSTRING_INDEX(CURRENT_USER(), '@', 1);

CREATE OR REPLACE VIEW `v_inbentario_kudeaketa` AS
SELECT id, izena AS artikulua, kopurua, egoera, azken_berrikuspena
FROM inbentario;

CREATE OR REPLACE VIEW `v_admin_parking_eta_inbentario` AS
SELECT 
  'PARKING' AS jatorria,
  id AS id_elementoa,
  CONCAT('Plaza: ', plaza_numero, ' (', mota, ')') AS izena_edo_deskribapena,
  egoera AS egoera,
  sarrera_data AS azken_eguneratzea
FROM parking

UNION ALL

SELECT 
  'INBENTARIO' AS jatorria,
  id AS id_elementoa,
  CONCAT('Materiala: ', izena, ' (Kopurua: ', kopurua, ')') AS izena_edo_deskribapena,
  egoera AS egoera,
  azken_berrikuspena AS azken_eguneratzea
FROM inbentario;


-- =============================================================================
-- 4. FUNTZIOAK
-- =============================================================================
DELIMITER //

CREATE FUNCTION `fn_plaza_libreak`(p_mota VARCHAR(20)) 
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE v_libreak INT DEFAULT 0;
    SELECT COUNT(*) INTO v_libreak
    FROM parking
    WHERE mota = p_mota AND egoera = 'LIBRE';
    RETURN v_libreak;
END //

CREATE FUNCTION `fn_minutu_osotara_parking`(p_erabiltzaile_id INT) 
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE v_minutuak INT DEFAULT 0;
    SELECT IFNULL(SUM(TIMESTAMPDIFF(MINUTE, sarrera_data, irteera_data)), 0) INTO v_minutuak
    FROM parking
    WHERE erabiltzaile_id = p_erabiltzaile_id;
    RETURN v_minutuak;
END //

CREATE FUNCTION `fn_porzentajea_hondatuta`() 
RETURNS DECIMAL(5,2)
DETERMINISTIC
READS SQL DATA
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
END //

DELIMITER ;


-- =============================================================================
-- 5. PROZEDURAK ETA KURTSOREAK
-- =============================================================================
DELIMITER //

CREATE PROCEDURE `sp_erreserba_egin`(
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
        SELECT rol_id, emaila INTO v_rol_id, v_emaila FROM usuarios WHERE id = p_erabiltzaile_id;
        
        IF v_rol_id = 2 THEN SET v_mota = 'IKASLE';
        ELSEIF v_rol_id = 3 THEN SET v_mota = 'IRAKASLE';
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: Rol no válido para plaza asignada';
        END IF;

        INSERT INTO parking (plaza_numero, mota, egoera, erabiltzaile_id, matrikula, emaila, erreserba_data, sarrera_data, irteera_data)
        VALUES (p_plaza_num, v_mota, 'ERRESERBATUA', p_erabiltzaile_id, p_matrikula, v_emaila, NOW(), p_sarrera, p_irteera);
    COMMIT;
END //

CREATE PROCEDURE `sp_garbitu_erreserba_okupatuak`()
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
END //

CREATE PROCEDURE `sp_inbentario_txostena_eguneratu`(OUT p_aldatutak INT)
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
END //

DELIMITER ;


-- =============================================================================
-- 6. TRIGGERRAK
-- =============================================================================
DELIMITER //

CREATE TRIGGER `trg_balidatu_parking_emaila`
BEFORE INSERT ON `parking`
FOR EACH ROW
BEGIN
    IF (NEW.mota IN ('IKASLE', 'IRAKASLE')) AND (NEW.emaila IS NULL OR NEW.emaila = '') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Errorea: IKASLE eta IRAKASLE motako erabiltzaileek emaila edukitzea derrigorrezkoa da.';
    END IF;
END //

CREATE TRIGGER `trg_balidatu_data_koherentzia`
BEFORE INSERT ON `parking`
FOR EACH ROW
BEGIN
    IF NEW.sarrera_data >= NEW.irteera_data THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Errorea: Sarrera data irteera data baino lehenagokoa izan behar da.';
    END IF;
END //

CREATE TRIGGER `trg_auditoria_parking_insert`
AFTER INSERT ON `parking`
FOR EACH ROW
BEGIN
    INSERT INTO parking_auditoria (parking_id, ekintza, erabiltzailea, deskribapena)
    VALUES (NEW.id, 'INSERT', USER(), CONCAT('Plaza berria sortua: ', NEW.plaza_numero, ' Mota: ', NEW.mota));
END //

DELIMITER ;


-- =============================================================================
-- 7. ERABILTZAILEAK, ROLAK ETA PRIBILEGIOAK
-- =============================================================================

DROP ROLE IF EXISTS 'rol_admin', 'rol_irakasle', 'rol_ikasle', 'rol_bisitari', 'rol_inbentario', 'rol_chatbot';
CREATE ROLE 'rol_admin', 'rol_irakasle', 'rol_ikasle', 'rol_bisitari', 'rol_inbentario', 'rol_chatbot';

GRANT ALL PRIVILEGES ON kudeaketa_4.* TO 'rol_admin';

GRANT SELECT ON kudeaketa_4.v_irakasle_bere_parking TO 'rol_irakasle';
GRANT SELECT ON kudeaketa_4.v_inbentario_kudeaketa TO 'rol_irakasle';
GRANT EXECUTE ON PROCEDURE kudeaketa_4.sp_erreserba_egin TO 'rol_irakasle';

GRANT SELECT ON kudeaketa_4.v_ikasle_bere_parking TO 'rol_ikasle';
GRANT EXECUTE ON PROCEDURE kudeaketa_4.sp_erreserba_egin TO 'rol_ikasle';

GRANT SELECT, INSERT, UPDATE ON kudeaketa_4.inbentario TO 'rol_inbentario';
GRANT SELECT ON kudeaketa_4.v_inbentario_kudeaketa TO 'rol_inbentario';

GRANT SELECT ON kudeaketa_4.v_bisitari_parking TO 'rol_bisitari';

GRANT SELECT ON kudeaketa_4.parking TO 'rol_chatbot';
GRANT SELECT ON kudeaketa_4.inbentario TO 'rol_chatbot';
GRANT SELECT ON kudeaketa_4.usuarios TO 'rol_chatbot';
GRANT SELECT ON kudeaketa_4.rol TO 'rol_chatbot';
GRANT SELECT ON kudeaketa_4.v_bisitari_parking TO 'rol_chatbot';
GRANT SELECT ON kudeaketa_4.v_inbentario_kudeaketa TO 'rol_chatbot';
GRANT SELECT ON kudeaketa_4.v_admin_parking_eta_inbentario TO 'rol_chatbot';
GRANT EXECUTE ON FUNCTION kudeaketa_4.fn_plaza_libreak TO 'rol_chatbot';
GRANT EXECUTE ON FUNCTION kudeaketa_4.fn_minutu_osotara_parking TO 'rol_chatbot';
GRANT EXECUTE ON FUNCTION kudeaketa_4.fn_porzentajea_hondatuta TO 'rol_chatbot';

DROP USER IF EXISTS 'usr_admin'@'localhost', 'usr_irakasle'@'localhost', 'usr_ikasle'@'localhost', 'usr_bisitari'@'localhost', 'usr_inbentario'@'localhost', 'usr_chatbot'@'localhost';

CREATE USER 'usr_admin'@'localhost' IDENTIFIED BY 'AdminPass123!' WITH MAX_QUERIES_PER_HOUR 1000;
CREATE USER 'usr_irakasle'@'localhost' IDENTIFIED BY 'IrakaslePass123!' WITH MAX_QUERIES_PER_HOUR 300;
CREATE USER 'usr_ikasle'@'localhost' IDENTIFIED BY 'IrakaslePass123!' WITH MAX_QUERIES_PER_HOUR 100;
CREATE USER 'usr_inbentario'@'localhost' IDENTIFIED BY 'InbentarioPass123!' WITH MAX_QUERIES_PER_HOUR 200;
CREATE USER 'usr_bisitari'@'localhost' IDENTIFIED BY 'BisitariPass123!' WITH MAX_QUERIES_PER_HOUR 20;
CREATE USER 'usr_chatbot'@'localhost' IDENTIFIED BY 'ChatbotPass123!' WITH MAX_QUERIES_PER_HOUR 5000;

GRANT 'rol_admin' TO 'usr_admin'@'localhost';
GRANT 'rol_irakasle' TO 'usr_irakasle'@'localhost';
GRANT 'rol_ikasle' TO 'usr_ikasle'@'localhost';
GRANT 'rol_inbentario' TO 'usr_inbentario'@'localhost';
GRANT 'rol_bisitari' TO 'usr_bisitari'@'localhost';
GRANT 'rol_chatbot' TO 'usr_chatbot'@'localhost';

SET DEFAULT ROLE ALL TO 
  'usr_admin'@'localhost',
  'usr_irakasle'@'localhost',
  'usr_ikasle'@'localhost',
  'usr_inbentario'@'localhost',
  'usr_bisitari'@'localhost',
  'usr_chatbot'@'localhost';

FLUSH PRIVILEGES;