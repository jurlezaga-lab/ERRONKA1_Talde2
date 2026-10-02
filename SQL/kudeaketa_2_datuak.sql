-- 2.1 CENTROS (3 registros)
INSERT INTO `zentroa` (`id`, `izena`, `kokapena`) VALUES
(1, 'CIFP Tartanga LHII', 'Erandio, Bizkaia'),
(2, 'IES Elorrieta-Ereaga BHII', 'Bilbao, Bizkaia'),
(3, 'CIFP Txurdinaga LHII', 'Bilbao, Bizkaia');

-- 2.2 ROLES (4 registros)
INSERT INTO `rol` (`id`, `izena`, `deskribapena`) VALUES
(1, 'ADMIN', 'Administrador del sistema con acceso total'),
(2, 'IKASLE', 'Alumnado con permisos de lectura y consulta de parking'),
(3, 'IRAKASLE', 'Profesorado con permisos sobre su parking e información'),
(4, 'INBENTARIO', 'Gestor de inventario con permisos CRUD en equipos');

-- 2.3 USUARIOS (10 registros con contraseña '1234')
INSERT INTO `usuarios` (`id`, `izena`, `abizena`, `emaila`, `pasahitza`, `rol_id`, `zentroa_id`) VALUES
(1, 'Aitor', 'Iturbe', 'aitor.admin@tartanga.eu', '1234', 1, 1),
(2, 'Miren', 'Goikoetxea', 'miren.ikasle@tartanga.eu', '1234', 2, 1),
(3, 'Unai', 'Etxebarria', 'unai.ikasle@tartanga.eu', '1234', 2, 1),
(4, 'Jon', 'Urrutia', 'jon.irakasle@tartanga.eu', '1234', 3, 1),
(5, 'Ane', 'Zubizarreta', 'ane.irakasle@tartanga.eu', '1234', 3, 1),
(6, 'Koldo', 'Garcia', 'koldo.inbentario@elorrieta.eu', '1234', 4, 2),
(7, 'Amaia', 'Larrañaga', 'amaia.irakasle@elorrieta.eu', '1234', 3, 2),
(8, 'Iker', 'Bilbao', 'iker.ikasle@elorrieta.eu', '1234', 2, 2),
(9, 'Nerea', 'Agirre', 'nerea.admin@txurdinaga.eu', '1234', 1, 3),
(10, 'Gorka', 'Mendoza', 'gorka.irakasle@txurdinaga.eu', '1234', 3, 3);

-- 2.4 INVENTARIO (10 registros)
INSERT INTO `inbentario` (`id`, `izena`, `kopurua`, `egoera`, `zentroa_id`) VALUES
(1, 'Proiektorea Epson EB-685Wi', 5, 'ONDO', 1),
(2, 'Ordenagailu eramangarria HP ProBook', 20, 'MANTENIMENDUAN', 1),
(3, 'Imprimagailu 3D Creality Ender 3', 3, 'ONDO', 2),
(4, 'Monitor Dell 24 P2419H', 12, 'ONDO', 1),
(5, 'Switch Cisco Catalyst 2960', 4, 'ONDO', 3),
(6, 'Proiektorea BenQ MH535', 2, 'ERABILI_EZINIK', 2),
(7, 'Kamera Web Logitech C920', 8, 'ONDO', 3),
(8, 'Osciloscopio Digital Hantek', 6, 'MANTENIMENDUAN', 1),
(9, 'Kit Arduino Uno Rev3', 15, 'GALDUTAKO', 2),
(10, 'Servidor Rack HP ProLiant', 1, 'ONDO', 3);

-- 2.5 PARKING (10 registros)
INSERT INTO `parking` 
  (`zentroa_id`, `plaza_numero`, `mota`, `egoera`, `erabiltzaile_id`, `bisitari_izena`, `matrikula`, `emaila`, `erreserba_data`, `sarrera_data`, `irteera_data`) 
VALUES
-- 1. Ikasle (Tartanga)
(1, 101, 'IKASLE', 'ERRESERBATUA', 2, NULL, '1234ABC', 'miren.ikasle@tartanga.eu', '2026-10-02 08:00:00', '2026-10-02 08:05:00', '2026-10-02 14:00:00'),

-- 2. Ikasle (Tartanga)
(1, 102, 'IKASLE', 'LIBRE', 3, NULL, '5555BBB', 'unai.ikasle@tartanga.eu', NULL, '2026-10-02 08:10:00', '2026-10-02 13:30:00'),

-- 3. Irakasle (Tartanga)
(1, 201, 'IRAKASLE', 'OKUPATUA', 4, NULL, '9999XYZ', 'jon.irakasle@tartanga.eu', '2026-10-02 07:30:00', '2026-10-02 07:45:00', '2026-10-02 15:00:00'),

-- 4. Irakasle (Tartanga)
(1, 202, 'IRAKASLE', 'OKUPATUA', 5, NULL, '8888LMN', 'ane.irakasle@tartanga.eu', '2026-10-02 07:30:00', '2026-10-02 07:50:00', '2026-10-02 14:30:00'),

-- 5. Bisitari (Con email opcional)
(NULL, 301, 'BISITARI', 'OKUPATUA', NULL, 'Marta Lopetegi', '1111BBB', 'marta.visitante@gmail.com', NULL, '2026-10-02 09:00:00', '2026-10-02 11:30:00'),

-- 6. Ikasle (Elorrieta)
(2, 101, 'IKASLE', 'OKUPATUA', 8, NULL, '5678DEF', 'iker.ikasle@elorrieta.eu', NULL, '2026-10-02 08:15:00', '2026-10-02 13:45:00'),

-- 7. Irakasle (Elorrieta)
(2, 201, 'IRAKASLE', 'ERRESERBATUA', 7, NULL, '3333GHI', 'amaia.irakasle@elorrieta.eu', '2026-10-02 08:30:00', '2026-10-02 08:35:00', '2026-10-02 18:00:00'),

-- 8. Bisitari (Sin email -> NULL)
(NULL, 302, 'BISITARI', 'LIBRE', NULL, 'Carlos Ruiz', '2222CCC', NULL, '2026-10-02 09:30:00', '2026-10-02 10:00:00', '2026-10-02 12:00:00'),

-- 9. Irakasle (Txurdinaga)
(3, 201, 'IRAKASLE', 'OKUPATUA', 10, NULL, '4444JKL', 'gorka.irakasle@txurdinaga.eu', '2026-10-02 07:45:00', '2026-10-02 08:00:00', '2026-10-02 15:30:00'),

-- 10. Bisitari (Con email opcional)
(NULL, 303, 'BISITARI', 'INHABILITATUA', NULL, 'Lucia Sanz', '7777KKK', 'lucia.sanz@proveedor.es', NULL, '2026-10-02 08:00:00', '2026-10-02 09:00:00');

COMMIT;