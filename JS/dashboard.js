const coverScreen = document.querySelector("#cover-screen");
const dashboardScreen = document.querySelector("#dashboard-screen");
const pageTransition = document.querySelector("#page-transition");
const loginForm = document.querySelector("#login-form");
const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");
const loginError = document.querySelector("#login-error");
const logoutButton = document.querySelector("#logout-button");
const clock = document.querySelector("#clock");
const todayDate = document.querySelector("#today-date");
const recordsBody = document.querySelector("#access-records");
const sessionUser = document.querySelector("#session-user");
const sessionRole = document.querySelector("#session-role");
const profileTitle = document.querySelector("#profile-title");
const recordCount = document.querySelector("#record-count");
const toast = document.querySelector("#toast");
const languageSelect = document.querySelector("#language-select");
const viewButtons = document.querySelectorAll("[data-app-view]");
const viewSwitcher = document.querySelector(".view-switcher");
const overviewViewButton = document.querySelector("#overview-view-button");
const usersView = document.querySelector("#users-view");
const inventoryViewButton = document.querySelector("#inventory-view-button");
const inventoryView = document.querySelector("#inventory-view");
const inventoryDatabaseView = document.querySelector("#inventory-database-view");
const inventoryExcelView = document.querySelector("#inventory-excel-view");
const inventoryBudgetView = document.querySelector("#inventory-budget-view");
const inventoryModeButtons = document.querySelectorAll("[data-inventory-mode]");
const overviewOnlySections = [
  document.querySelector(".intro"),
  document.querySelector(".dashboard-grid"),
  document.querySelector("#parking-section"),
  document.querySelector(".records-section")
];
const inventoryList = document.querySelector("#inventory-list");
const inventoryLoadMessage = document.querySelector("#inventory-load-message");
const inventoryRefreshButton = document.querySelector("#inventory-refresh");
const inventoryCreateForm = document.querySelector("#inventory-create-form");
const inventoryCreateMessage = document.querySelector("#inventory-create-message");
const inventoryManageHeader = document.querySelector("#inventory-manage-header");
const inventoryItemCount = document.querySelector("#inventory-item-count");
const inventoryUnitCount = document.querySelector("#inventory-unit-count");
const inventoryAttentionCount = document.querySelector("#inventory-attention-count");
const inventoryDatabaseDescription = document.querySelector("#inventory-database-view [data-i18n='inventoryDatabaseDescription']");
const inventoryExcelList = document.querySelector("#inventory-excel-list");
const inventoryExcelSummary = document.querySelector("#inventory-excel-summary");
const inventoryExcelLoadMessage = document.querySelector("#inventory-excel-load-message");
const inventoryExcelRecommendation = document.querySelector("#inventory-excel-recommendation");
const inventoryExcelRecommendationTitle = document.querySelector("#inventory-excel-recommendation-title");
let inventoryExcelData = null;
let inventoryExcelLoadPromise = null;
let inventoryExcelLoadState = "idle";
let inventoryExcelLoadError = null;
const demoModeNotice = document.querySelector("#demo-mode-notice");
const usersList = document.querySelector("#users-list");
const usersCreateForm = document.querySelector("#users-create-form");
const usersCreateMessage = document.querySelector("#users-create-message");
const usersManageHeader = document.querySelector("#users-manage-header");
const userCreateRole = document.querySelector("#user-create-role");
const userSearchInput = document.querySelector("#user-search");
const userRoleFilter = document.querySelector("#user-role-filter");
const attendanceInsideCount = document.querySelector("#attendance-inside-count");
const attendanceOutsideCount = document.querySelector("#attendance-outside-count");
const parkingDialog = document.querySelector("#parking-dialog");
const parkingDialogTitle = document.querySelector("#parking-dialog-title");
const parkingDialogSpace = document.querySelector("#parking-dialog-space");
const parkingDialogClose = document.querySelector("#parking-dialog-close");
const parkingReservationForm = document.querySelector("#parking-reservation-form");
const parkingPlate = document.querySelector("#parking-plate");
const parkingPlateHint = document.querySelector("#parking-plate-hint");
const parkingPlateError = document.querySelector("#parking-plate-error");
const parkingPlateFormatInputs = document.querySelectorAll('input[name="parking-plate-format"]');
const parkingReservedDetails = document.querySelector("#parking-reserved-details");
const reservedPlate = document.querySelector("#reserved-plate");
const parkingReleaseButton = document.querySelector("#parking-release-button");
const parkingFilters = document.querySelectorAll("[data-parking-filter]");
const storageKey = "txurdinaga-demo-accesses";
const demoSessionStorageKey = "txurdinaga-demo-account";
const serverSessionStorageKey = "txurdinaga-server-session";
const languageStorageKey = "txurdinaga-language";
const parkingStorageKey = "txurdinaga-parking-spaces";
const parkingReservationsStorageKey = "txurdinaga-parking-reservations";
const parkingSpaceElements = new Map();
const parkingZones = [
  { id: "visits", prefixKey: "zoneCodeVisits", title: "zoneVisits", countId: "count-visits", upperId: "spaces-visits-upper", lowerId: "spaces-visits-lower", capacity: 20, occupied: [2, 6] },
  { id: "others", prefixKey: "zoneCodeOthers", title: "zoneOthers", countId: "count-others", upperId: "spaces-others-upper", lowerId: "spaces-others-lower", capacity: 10, occupied: [], spaceTypes: ["otherTypeMotorcycle", "otherTypeMotorcycle", "otherTypeMotorcycle", "otherTypeMotorcycle", "otherTypeMotorcycle", "otherTypeElectric", "otherTypeElectric", "otherTypeElectric", "otherTypeAccessible", "otherTypeAccessible"] },
  { id: "students", prefixKey: "zoneCodeStudents", title: "zoneStudents", countId: "count-students", upperId: "spaces-students-upper", lowerId: "spaces-students-lower", capacity: 30, occupied: [1, 2, 3, 5, 8] },
  { id: "teachers", prefixKey: "zoneCodeTeachers", title: "zoneTeachers", countId: "count-teachers", upperId: "spaces-teachers-upper", lowerId: "spaces-teachers-lower", capacity: 25, occupied: [1, 4, 7] }
];
const spanishProvinceCodes = ["A", "AB", "AL", "AV", "B", "BA", "BI", "BU", "C", "CA", "CC", "CE", "CO", "CR", "CS", "CU", "GC", "GE", "GI", "GR", "GU", "H", "HU", "J", "L", "LE", "LO", "LU", "M", "MA", "ML", "MU", "NA", "O", "OR", "P", "PM", "PO", "S", "SA", "SE", "SG", "SO", "SS", "T", "TE", "TF", "TO", "V", "VA", "VI", "Z", "ZA"];
const spanishProvincePrefixes = [...new Set(spanishProvinceCodes.flatMap((code) => [code[0], code]))];
const validPlateLetters = "BCDFGHJKLMNPRSTVWXYZ";
const platePatterns = {
  current: `[0-9]{4}[${validPlateLetters}]{3}`,
  old: `(?:${spanishProvinceCodes.join("|")})-?[0-9]{4}-?[${validPlateLetters}]{1,2}`
};
const partialPlatePatterns = {
  current: new RegExp(`^(?:[0-9]{0,4}|[0-9]{4}[${validPlateLetters}]{0,3})$`),
  old: new RegExp(`^(?:|${spanishProvincePrefixes.join("|")}|(?:${spanishProvinceCodes.join("|")})-?[0-9]{0,4}|(?:${spanishProvinceCodes.join("|")})-?[0-9]{4}-?[${validPlateLetters}]{0,2})$`)
};
const translations = {
  eu: {
    languageLabel: "Hizkuntza", schoolName: "CIFP TXURDINAGA LHII", accessControl: "SARBIDE-KONTROLA", welcome: "Ongi etorri", welcomePlace: "Txurdinagara.",
    coverDescription: "Ikastetxeko sarrera eta irteeren kontrola, toki bakar batean.", username: "Erabiltzailea", password: "Pasahitza", signIn: "Sartu",
    location: "DOCTOR ORNILLA 2 · 48004 BILBO", welcomeLabel: "ONGI ETORRI", controlActive: "Demo moduan", localTime: "Ordu lokala",
    schoolReception: "Txurdinaga · Harrera", goodDay: "Egun on,", todayActivity: "gaurko jarduna.", introNote: "Ikastetxeko sarrera-irteeren erregistroa.",
    todayLabel: "Gaurko jardunaldia", loadingDate: "Data kargatzen...", accessSummary: "Sarbide-erregistroa eta laburpena", registerAccess: "Sarbide bat erregistratu",
    enterIdentifierHint: "Erregistratu ibilgailuen sarrerak eta irteerak matrikularen bidez.", accessType: "Sarrera mota", entry: "Sarrera", exit: "Irteera",
    identifierLabel: "Ibilgailuaren matrikula", identifierPlaceholder: "1234BCD", plateFormatLabel: "Matrikula mota", currentPlateOption: "Berria", oldPlateOption: "Probintzia-kodea",
    currentPlatePlaceholder: "1234BCD", oldPlatePlaceholder: "BI-1234-BC", currentPlateHint: "Formatu berria: 1234BCD (4 digitu eta 3 kontsonante, espaziorik gabe).", oldPlateHint: "Antzinako formatua: BI-1234-BC (probintzia-kodea, 4 digitu eta 1-2 kontsonante).", register: "Erregistratu",
    demoStorage: "Demo modua: erregistroak nabigatzaile honetan bakarrik gordetzen dira.", entryCardTitle: "Sarrerak", entryCardDescription: "Gaur erregistratutako sarrerak",
    exitCardTitle: "Irteerak", exitCardDescription: "Gaur erregistratutako irteerak", dailyTotal: "Eguneko guztira", parkingNow: "Orain", parkingFreeDescription: "Une honetan erabilgarri dauden plazak", parkingOccupiedDescription: "Une honetan okupatuta dauden plazak",
    today: "Gaur", recentEntries: "Azken sarrerak", recentActivity: "Ikastetxeko azken mugimenduak",
    person: "Pertsona", identifier: "Matrikula", time: "Ordua", type: "Mota", status: "Egoera", footerBrand: "CIFP TXURDINAGA LHII · SARBIDE-KONTROLA",
    localDemo: "Demo lokala", emptyRecords: "Oraindik ez dago sarbiderik erregistratuta.", demoPerson: "Demo ikaslea", demoStatus: "Demoa",
    signedInAs: "Saioa irekita:", roleAdmin: "Administratzailea", roleTeacher: "Irakaslea", roleStudent: "Ikaslea",
    titleAdmin: "Administrazioa", titleTeacher: "Irakaslearen panela", titleStudent: "Ikaslearen panela", titleInventory: "Inbentarioa", roleInventory: "Inbentarioa",
    appNavigation: "Nabigazio nagusia", overviewView: "Orokorra", usersView: "Erabiltzaileak", attendanceEyebrow: "Txurdinaga · Erabiltzaileak", usersTitle: "Zentroko fitxaketa", usersDescription: "Ikusi nor dagoen barruan eta erregistratu sarrera edo irteera.", usersTableLabel: "Zentroko erabiltzaileen zerrenda", userIdLabel: "ID", firstNameLabel: "Izena", lastNameLabel: "Abizena", emailLabel: "Emaila", roleIdLabel: "Rola / ID", centerIdLabel: "Zentroa / ID", attendanceStatusLabel: "Egoera", attendanceActionLabel: "Ekintza", attendanceInside: "Barruan", attendanceOutside: "Kanpoan", attendanceNotApplicable: "Ez dagokio", attendanceInAction: "Sarrera erregistratu", attendanceOutAction: "Irteera erregistratu", attendanceEntrySaved: "Sarrera erregistratu da.", attendanceExitSaved: "Irteera erregistratu da.", searchUsersLabel: "Bilatu erabiltzaileak", searchUsersPlaceholder: "Izena edo abizena", filterByRoleLabel: "Iragazi rolaren arabera", allRoles: "Rol guztiak", noUsersFound: "Ez da erabiltzailerik aurkitu.", loadingUsers: "Erabiltzaileak kargatzen...", usersLoadError: "Ezin izan dira erabiltzaileak kargatu. Egiaztatu PHP zerbitzaria eta datu-basearen konexioa.",
    databaseConnectionError: "Ezin da MySQL zerbitzaria atzitu. Egiaztatu martxan dagoela.", databaseAccessDenied: "MySQL-k konexioa ukatu du. Egiaztatu PHP/db.konexioa.php fitxategiko erabiltzailea eta pasahitza.", databaseNotFound: "Ez da kudeaketa_db datu-basea aurkitu. Sortu eta inportatu SQL eskemak.", usersTableMissing: "Ez da usuarios taula aurkitu. Inportatu SQL/kudeaketa_2_estruktura.sql eskema.", invalidUsersResponse: "PHP zerbitzariak ez du JSON erantzun baliozkorik itzuli.",
    inventoryView: "Inbentarioa", inventoryEyebrow: "Txurdinaga · Inbentarioa", inventoryTitle: "Inbentarioa eta aurrekontua", inventoryDescription: "Kontsultatu ekipamendua eta planifikatu etorkizuneko beharrak.", inventoryModesLabel: "Inbentarioaren ikuspegiak", inventoryDatabaseTab: "Uneko inbentarioa · Datu-basea", inventoryBudgetTab: "Etorkizuneko aurrekontua · Demoa", inventoryDatabaseTitle: "Uneko ekipamendua", inventoryDatabaseDescription: "MySQL datu-basetik zuzenean kargatua.", inventoryRefresh: "Berritu", inventoryKinds: "Artikulu mota", inventoryUnits: "Guztizko unitateak", inventoryNeedsAttention: "Arreta behar dute", inventoryTableLabel: "Datu-baseko inbentario-zerrenda", inventoryIdLabel: "ID", inventoryNameLabel: "Artikulua", inventoryQuantityLabel: "Kopurua", inventoryStatusLabel: "Egoera", inventoryCenterLabel: "Zentroa / arduraduna", inventoryReviewLabel: "Azken berrikuspena", inventoryLoading: "Inbentarioa kargatzen...", inventoryError: "Ezin izan da inbentarioa kargatu. Egiaztatu PHP zerbitzaria, datu-basea eta inbentario-taula.", inventoryEmpty: "Ez dago inbentario-artikulurik datu-basean.", inventoryStatusGood: "Ondo", inventoryStatusUnusable: "Erabili ezinik", inventoryStatusMaintenance: "Mantentze-lanetan", inventoryStatusLost: "Galduta", inventoryNoReview: "Berrikuspen-datarik ez",
    budgetPlanningEyebrow: "Etorkizuneko plangintza · Demoa", budgetPlanningTitle: "10.000 €-ko aurrekontua planifikatzea", budgetPlanningDescription: "Kalkulu orientagarriak dira; ez daude datu-basera konektatuta eta ez dira benetako gastuak.", budgetAvailableLabel: "Urteko aurrekontua", budgetPlannedLabel: "Aurreikusitako beharrak", budgetRemainingLabel: "Erreserba geratzen da", budgetUseLabel: "Aurrekontuaren zatia", budgetDistributionTitle: "Beharren banaketa lehentasunaren arabera", budgetDistributionDescription: "Kolore bakoitzak etorkizunerako aurreikusitako gastua erakusten du.", budgetChartLabel: "Aurrekontuaren banaketa: lehentasun baxua berdez, ertaina laranjaz eta altua gorriz.", priorityLow: "Baxua · Berdea", priorityMedium: "Ertaina · Laranja", priorityHigh: "Altua · Gorria", budgetItemsTitle: "Etorkizuneko behar posibleak", budgetItemsDescription: "Aurrekontuaren adibide ilustratiboa, lehentasunaren arabera.", budgetPriorityTotal: "Guztira", budgetLowLaptop: "Ordenagailu eramangarrietarako RAM memoria", budgetLowMice: "Sagu eta teklatu sorta", budgetMediumWifi: "Ikasgelako Wi-Fi sarbide-puntuak", budgetMediumProjector: "Proiektoreen mantentzea eta piezak", budgetHighServer: "Laborategiko zerbitzari berritzea", budgetHighElectrical: "Laborategiko instalazio elektrikoak",
    inventoryExcelTab: "PC osagaiak · Excel", inventoryExcelTitle: "PCaren osagaiak · Excel", inventoryExcelDescription: "Jatorrizko Excel fitxategiaren zehaztapen teknikoen laburpena.", inventoryExcelDownload: "Excel deskargatu", inventoryExcelSummary: "PCaren zehaztapen nagusiak", inventoryExcelTableLabel: "Excel fitxategiko osagaien zerrenda", excelStorage: "Biltegiratzea guztira", excelMemory: "RAM memoria", excelPower: "Energia-iturria", excelNumber: "Zk.", excelComponent: "Osagaia / Kategoria", excelManufacturer: "Fabrikatzailea / Marka", excelModel: "Modeloa / Zehaztapena", excelCapacity: "Edukiera / Potentzia", excelNotes: "Ohar teknikoak", excelMotherboard: "Plaka nagusia", excelMotherboardNote: "Intel mahai gaineko socket estandarra", excelGraphics: "Txartel grafikoa", excelGraphicsNote: "Oinarrizko gama eta bulegotika", excelHardDriveOne: "1. disko gogorra", excelHardDriveTwo: "2. disko gogorra", excelRam: "RAM memoria", excelGeneric: "Generikoa / Hainbat", excelRamNote: "2 GB-ko DDR3 modulua", excelPowerSupply: "Energia-iturria", excelCase: "Kaxa / Txasisa", excelMidTower: "Mid Tower", excelCaseNote: "ATX/MicroATX kaxa beltza", excelOpticalDrive: "Unitate optikoa / DVD irakurgailua", excelDvdModel: "DVD 24x (irakurri eta grabatu)", excelDvdNote: "SATA DVD/CD irakurgailu eta grabagailua", excelRecommendationTitle: "Excel fitxategiko gomendioa", excelRecommendationText: "RAM memoria 8 GB-ra zabaltzea eta SATA SSD disko bat gehitzea proposatzen da.",
    inventoryDemoDescription: "Demoko adibide-datuak dira; ez dira MySQLetik kargatu.", demoModeNotice: "DEMOSTRAZIO MODUA: zerrendak adibideak dira eta ez da PHP zerbitzari edo datu-basera konektatzen.", demoSessionError: "Ezin izan da demoko saioa nabigatzailean gorde.",
    invalidLogin: "Erabiltzailea edo pasahitza ez da zuzena.", sessionUnavailable: "Ezin izan da saioa egiaztatu. Egiaztatu PHP zerbitzaria.", logout: "Saioa itxi", logoutFailed: "Ezin izan da saioa itxi. Saiatu berriro.", storageError: "Erregistroa pantaila honetan bakarrik dago eskuragarri.", accessSaved: "Sarbidea demo moduan erregistratu da.",
    recordCount: (count) => `${count} ERREGISTRO`, dateLocale: "eu-ES", darkTheme: "Modu iluna", lightTheme: "Modu argia", pageTitle: "Sarbide-kontrola | CIFP Txurdinaga LHII",
    viewParking: "Aparkalekua ikusi", parkingTitle: "Aparkalekua", parkingDescription: "Plazak, aforoa eta mugimenduak denbora errealean.", parkingLegendLabel: "Aparkalekuko egoeren legenda", parkingPlanLabel: "Aparkalekuko planoa goitik ikusita", spacesFree: "Libre", spacesOccupied: "Okupatuta", filterAll: "Denak", parkingFiltersLabel: "Aparkalekuko eremuak iragazi",
    spaceFree: "Plaza librea", spaceOccupied: "Plaza okupatuta", zoneVisits: "Bisitariak", zoneOthers: "Besteak", zoneTeachers: "Irakasleak", zoneStudents: "Ikasleak", zoneCodeVisits: "B", zoneCodeOthers: "BE", zoneCodeTeachers: "IR", zoneCodeStudents: "IK", otherSpacesLegendLabel: "Plaza motak", otherCapacityMotorcycles: "5 moto", otherCapacityElectric: "3 elektriko", otherCapacityAccessible: "2 mugikortasun urriko", otherTypeMotorcycle: "Motoa", otherTypeElectric: "Ibilgailu elektrikoa", otherTypeAccessible: "Mugikortasun urrikoentzako", parkingAisle: "Zirkulazio-eremua", buildingLabel: "Eraikin nagusia", schoolBuilding: "CIFP Txurdinaga LHII", parkingOccupancy: "Aparkalekuko okupazioa", parkingEntrance: "Sarrera", parkingExit: "Irteera", parkingRoad: "Zirkulazio-bidea",
    parkingDialogEyebrow: "Aparkalekua · plaza hautatua", parkingReserveTitle: "Plaza erreserbatu", parkingOccupiedTitle: "Plaza okupatuta", reserveParkingSpace: "Erreserbatu plaza", reservedForPlate: "Matrikula honekin erreserbatuta", releaseParkingSpace: "Plaza libre utzi", parkingReserved: (plate) => `${plate} matrikularentzako plaza erreserbatu da.`, parkingReleased: "Plaza libre dago.", unknownReservedPlate: "Ez dago matrikularik erregistratuta.", invalidParkingPlate: "Idatzi matrikula baliodun bat.", closeDialogLabel: "Itxi leihoa", exitParking: "Aparkalekutik atera", exitParkingLabel: "Itxi aparkalekua",
    parkingSpaceLabel: (zone, number, status) => `${zone}, ${number}. plaza, ${status}`, parkingCount: (free, occupied) => `${free} libre · ${occupied} okupatuta`
  },
  es: {
    languageLabel: "Idioma", schoolName: "CIFP TXURDINAGA LHII", accessControl: "CONTROL DE ACCESO", welcome: "Te damos la bienvenida", welcomePlace: "a Txurdinaga.",
    coverDescription: "Control de entradas y salidas del centro, en un solo lugar.", username: "Usuario", password: "Contraseña", signIn: "Entrar",
    location: "DOCTOR ORNILLA 2 · 48004 BILBAO", welcomeLabel: "BIENVENIDO", controlActive: "Modo demostración", localTime: "Hora local",
    schoolReception: "Txurdinaga · Recepción", goodDay: "Buenos días,", todayActivity: "actividad de hoy.", introNote: "Registro de entradas y salidas del centro.",
    todayLabel: "Jornada de hoy", loadingDate: "Cargando fecha...", accessSummary: "Registro de accesos y resumen", registerAccess: "Registrar un acceso",
    enterIdentifierHint: "Registra las entradas y salidas de vehículos por matrícula.", accessType: "Tipo de acceso", entry: "Entrada", exit: "Salida",
    identifierLabel: "Matrícula del vehículo", identifierPlaceholder: "1234BCD", plateFormatLabel: "Formato de matrícula", currentPlateOption: "Actual", oldPlateOption: "Provincial",
    currentPlatePlaceholder: "1234BCD", oldPlatePlaceholder: "BI-1234-BC", currentPlateHint: "Formato actual: 1234BCD (4 cifras y 3 consonantes, sin espacios).", oldPlateHint: "Formato provincial antiguo: BI-1234-BC (código provincial, 4 cifras y 1-2 consonantes).", register: "Registrar",
    demoStorage: "Modo demo: los registros solo se guardan en este navegador.", entryCardTitle: "Entradas", entryCardDescription: "Entradas registradas hoy",
    exitCardTitle: "Salidas", exitCardDescription: "Salidas registradas hoy", dailyTotal: "Total del día", parkingNow: "Ahora", parkingFreeDescription: "Plazas disponibles en este momento", parkingOccupiedDescription: "Plazas ocupadas en este momento",
    today: "Hoy", recentEntries: "Últimos accesos", recentActivity: "Últimos movimientos del centro",
    person: "Persona", identifier: "Matrícula", time: "Hora", type: "Tipo", status: "Estado", footerBrand: "CIFP TXURDINAGA LHII · CONTROL DE ACCESO",
    localDemo: "Demo local", emptyRecords: "Todavía no hay accesos registrados.", demoPerson: "Alumno/a de demo", demoStatus: "Demo",
    signedInAs: "Sesión iniciada:", roleAdmin: "Administrador", roleTeacher: "Profesor/a", roleStudent: "Alumno/a",
    titleAdmin: "Administración", titleTeacher: "Panel del profesorado", titleStudent: "Panel del alumnado", titleInventory: "Panel de inventario", roleInventory: "Inventario",
    appNavigation: "Navegación principal", overviewView: "Resumen", usersView: "Usuarios", attendanceEyebrow: "Txurdinaga · Usuarios", usersTitle: "Fichaje del centro", usersDescription: "Consulta quién está dentro y registra entradas o salidas.", usersTableLabel: "Lista de usuarios del centro", userIdLabel: "ID", firstNameLabel: "Nombre", lastNameLabel: "Apellidos", emailLabel: "Email", roleIdLabel: "Rol / ID", centerIdLabel: "Centro / ID", attendanceStatusLabel: "Estado", attendanceActionLabel: "Acción", attendanceInside: "Dentro", attendanceOutside: "Fuera", attendanceNotApplicable: "No aplica", attendanceInAction: "Registrar entrada", attendanceOutAction: "Registrar salida", attendanceEntrySaved: "Entrada registrada.", attendanceExitSaved: "Salida registrada.", searchUsersLabel: "Buscar usuarios", searchUsersPlaceholder: "Nombre o apellidos", filterByRoleLabel: "Filtrar por rol", allRoles: "Todos los roles", noUsersFound: "No se encontraron usuarios.", loadingUsers: "Cargando usuarios...", usersLoadError: "No se pudieron cargar los usuarios. Comprueba el servidor PHP y la conexión con la base de datos.",
    databaseConnectionError: "No se puede conectar con MySQL. Comprueba que el servidor está iniciado.", databaseAccessDenied: "MySQL ha rechazado la conexión. Revisa el usuario y la contraseña en PHP/db.konexioa.php.", databaseNotFound: "No se encontró la base de datos kudeaketa_db. Créala e importa los esquemas SQL.", usersTableMissing: "No se encontró la tabla usuarios. Importa el esquema SQL/kudeaketa_2_estruktura.sql.", invalidUsersResponse: "El servidor PHP no devolvió una respuesta JSON válida.",
    inventoryView: "Inventario", inventoryEyebrow: "Txurdinaga · Inventario", inventoryTitle: "Inventario y presupuesto", inventoryDescription: "Consulta el equipamiento y planifica necesidades futuras.", inventoryModesLabel: "Vistas del inventario", inventoryDatabaseTab: "Inventario actual · Base de datos", inventoryBudgetTab: "Presupuesto futuro · Demo", inventoryDatabaseTitle: "Equipamiento actual", inventoryDatabaseDescription: "Cargado directamente desde la base de datos MySQL.", inventoryRefresh: "Actualizar", inventoryKinds: "Tipos de artículos", inventoryUnits: "Unidades totales", inventoryNeedsAttention: "Necesitan atención", inventoryTableLabel: "Lista de inventario de la base de datos", inventoryIdLabel: "ID", inventoryNameLabel: "Artículo", inventoryQuantityLabel: "Cantidad", inventoryStatusLabel: "Estado", inventoryCenterLabel: "Centro / responsable", inventoryReviewLabel: "Última revisión", inventoryLoading: "Cargando inventario...", inventoryError: "No se pudo cargar el inventario. Comprueba PHP, la base de datos y la tabla de inventario.", inventoryEmpty: "No hay artículos de inventario en la base de datos.", inventoryStatusGood: "Correcto", inventoryStatusUnusable: "Inutilizable", inventoryStatusMaintenance: "En mantenimiento", inventoryStatusLost: "Perdido", inventoryNoReview: "Sin fecha de revisión",
    budgetPlanningEyebrow: "Planificación futura · Demo", budgetPlanningTitle: "Planificación de un presupuesto de 10.000 €", budgetPlanningDescription: "Son estimaciones orientativas; no están conectadas a la base de datos ni representan gastos reales.", budgetAvailableLabel: "Presupuesto anual", budgetPlannedLabel: "Necesidades previstas", budgetRemainingLabel: "Reserva restante", budgetUseLabel: "Parte del presupuesto", budgetDistributionTitle: "Distribución de necesidades por prioridad", budgetDistributionDescription: "Cada color muestra el gasto previsto para necesidades futuras.", budgetChartLabel: "Distribución del presupuesto: prioridad baja en verde, media en naranja y alta en rojo.", priorityLow: "Baja · Verde", priorityMedium: "Media · Naranja", priorityHigh: "Alta · Rojo", budgetItemsTitle: "Posibles necesidades futuras", budgetItemsDescription: "Ejemplo ilustrativo de presupuesto, ordenado por prioridad.", budgetPriorityTotal: "Total", budgetLowLaptop: "Memoria RAM para portátiles", budgetLowMice: "Lote de ratones y teclados", budgetMediumWifi: "Puntos de acceso Wi-Fi para aulas", budgetMediumProjector: "Mantenimiento y piezas para proyectores", budgetHighServer: "Renovación del servidor del laboratorio", budgetHighElectrical: "Instalación eléctrica del laboratorio",
    inventoryExcelTab: "Componentes PC · Excel", inventoryExcelTitle: "Componentes del PC · Excel", inventoryExcelDescription: "Resumen de las especificaciones técnicas del archivo Excel original.", inventoryExcelDownload: "Descargar Excel", inventoryExcelSummary: "Especificaciones principales del PC", inventoryExcelTableLabel: "Lista de componentes del archivo Excel", excelStorage: "Almacenamiento total", excelMemory: "Memoria RAM", excelPower: "Fuente de alimentación", excelNumber: "N.º", excelComponent: "Componente / Categoría", excelManufacturer: "Fabricante / Marca", excelModel: "Modelo / Especificación", excelCapacity: "Capacidad / Potencia", excelNotes: "Notas técnicas", excelMotherboard: "Placa base", excelMotherboardNote: "Socket de sobremesa Intel estándar", excelGraphics: "Tarjeta gráfica", excelGraphicsNote: "Gama básica y ofimática", excelHardDriveOne: "Disco duro 1", excelHardDriveTwo: "Disco duro 2", excelRam: "Memoria RAM", excelGeneric: "Genérico / Varios", excelRamNote: "Módulo DDR3 de 2 GB", excelPowerSupply: "Fuente de alimentación", excelCase: "Caja / Chasis", excelMidTower: "Semitorre", excelCaseNote: "Caja negra ATX/MicroATX", excelOpticalDrive: "Unidad óptica / Lector DVD", excelDvdModel: "DVD 24x (lectura y grabación)", excelDvdNote: "Lector y grabador SATA DVD/CD", excelRecommendationTitle: "Recomendación del Excel", excelRecommendationText: "Se recomienda ampliar la RAM a 8 GB y añadir una unidad SSD SATA.",
    inventoryDemoDescription: "Datos de ejemplo de la demo; no proceden de MySQL.", demoModeNotice: "Modo demostración: las listas son datos de ejemplo y no hay conexión con PHP ni la base de datos.", demoSessionError: "No se pudo guardar la sesión de demo en este navegador.",
    invalidLogin: "El usuario o la contraseña no son correctos.", sessionUnavailable: "No se pudo comprobar la sesión. Comprueba el servidor PHP.", logout: "Cerrar sesión", logoutFailed: "No se pudo cerrar la sesión. Inténtalo de nuevo.", storageError: "El registro solo está disponible en esta pantalla.", accessSaved: "Acceso registrado en modo demo.",
    recordCount: (count) => `${count} ${count === 1 ? "REGISTRO" : "REGISTROS"}`, dateLocale: "es-ES", darkTheme: "Modo oscuro", lightTheme: "Modo claro", pageTitle: "Control de acceso | CIFP Txurdinaga LHII",
    viewParking: "Ver parking", parkingTitle: "Parking", parkingDescription: "Plazas, aforo y movimientos del aparcamiento.", parkingLegendLabel: "Leyenda del estado de las plazas", parkingPlanLabel: "Plano del parking visto desde arriba", spacesFree: "Libres", spacesOccupied: "Ocupadas", filterAll: "Todas", parkingFiltersLabel: "Filtrar zonas del parking",
    spaceFree: "Plaza libre", spaceOccupied: "Plaza ocupada", zoneVisits: "Visitas", zoneOthers: "Otros", zoneTeachers: "Profesorado", zoneStudents: "Alumnado", zoneCodeVisits: "VI", zoneCodeOthers: "OT", zoneCodeTeachers: "PR", zoneCodeStudents: "AL", otherSpacesLegendLabel: "Tipos de plaza", otherCapacityMotorcycles: "5 motos", otherCapacityElectric: "3 eléctricos", otherCapacityAccessible: "2 accesibles", otherTypeMotorcycle: "Moto", otherTypeElectric: "Vehículo eléctrico", otherTypeAccessible: "Movilidad reducida", parkingAisle: "Carril de circulación", buildingLabel: "Edificio principal", schoolBuilding: "CIFP Txurdinaga LHII", parkingOccupancy: "Ocupación del parking", parkingEntrance: "Entrada", parkingExit: "Salida", parkingRoad: "Vial de circulación",
    parkingDialogEyebrow: "Parking · plaza seleccionada", parkingReserveTitle: "Reservar plaza", parkingOccupiedTitle: "Plaza ocupada", reserveParkingSpace: "Confirmar reserva", reservedForPlate: "Reserva asociada a la matrícula", releaseParkingSpace: "Liberar plaza", parkingReserved: (plate) => `Reserva confirmada para ${plate}.`, parkingReleased: "Plaza liberada.", unknownReservedPlate: "Sin matrícula registrada.", invalidParkingPlate: "Introduce una matrícula válida.", closeDialogLabel: "Cerrar ventana", exitParking: "Salir del parking", exitParkingLabel: "Volver al panel",
    parkingSpaceLabel: (zone, number, status) => `${zone}, plaza ${number}, ${status}`, parkingCount: (free, occupied) => `${free} libres · ${occupied} ocupadas`
  },
  en: {
    languageLabel: "Language", schoolName: "CIFP TXURDINAGA LHII", accessControl: "ACCESS CONTROL", welcome: "Welcome", welcomePlace: "to Txurdinaga.",
    coverDescription: "The school's entrance and exit log, all in one place.", username: "Username", password: "Password", signIn: "Sign in",
    location: "DOCTOR ORNILLA 2 · 48004 BILBAO", welcomeLabel: "WELCOME", controlActive: "Demo mode", localTime: "Local time",
    schoolReception: "Txurdinaga · Reception", goodDay: "Good morning,", todayActivity: "today's activity.", introNote: "School entrance and exit log.",
    todayLabel: "Today's activity", loadingDate: "Loading date...", accessSummary: "Access log and summary", registerAccess: "Register an access",
    enterIdentifierHint: "Register vehicle entries and exits by license plate.", accessType: "Access type", entry: "Entry", exit: "Exit",
    identifierLabel: "Vehicle license plate", identifierPlaceholder: "1234BCD", plateFormatLabel: "Plate format", currentPlateOption: "Current", oldPlateOption: "Provincial",
    currentPlatePlaceholder: "1234BCD", oldPlatePlaceholder: "BI-1234-BC", currentPlateHint: "Current format: 1234BCD (4 digits and 3 consonants, no spaces).", oldPlateHint: "Older provincial format: BI-1234-BC (province code, 4 digits and 1-2 consonants).", register: "Register",
    demoStorage: "Demo mode: records are only stored in this browser.", entryCardTitle: "Entries", entryCardDescription: "Entries registered today",
    exitCardTitle: "Exits", exitCardDescription: "Exits registered today", dailyTotal: "Daily total", parkingNow: "Now", parkingFreeDescription: "Spaces available right now", parkingOccupiedDescription: "Spaces occupied right now",
    today: "Today", recentEntries: "Recent entries", recentActivity: "Latest school activity",
    person: "Person", identifier: "License plate", time: "Time", type: "Type", status: "Status", footerBrand: "CIFP TXURDINAGA LHII · ACCESS CONTROL",
    localDemo: "Local demo", emptyRecords: "No access records yet.", demoPerson: "Demo student", demoStatus: "Demo",
    signedInAs: "Signed in as:", roleAdmin: "Administrator", roleTeacher: "Teacher", roleStudent: "Student",
    titleAdmin: "Administration", titleTeacher: "Teacher dashboard", titleStudent: "Student dashboard", titleInventory: "Inventory dashboard", roleInventory: "Inventory",
    appNavigation: "Main navigation", overviewView: "Overview", usersView: "Users", attendanceEyebrow: "Txurdinaga · Users", usersTitle: "Attendance", usersDescription: "See who is inside and record check-ins or check-outs.", usersTableLabel: "School user list", userIdLabel: "ID", firstNameLabel: "First name", lastNameLabel: "Last name", emailLabel: "Email", roleIdLabel: "Role / ID", centerIdLabel: "Center / ID", attendanceStatusLabel: "Status", attendanceActionLabel: "Action", attendanceInside: "Inside", attendanceOutside: "Outside", attendanceNotApplicable: "Not applicable", attendanceInAction: "Check in", attendanceOutAction: "Check out", attendanceEntrySaved: "Check-in recorded.", attendanceExitSaved: "Check-out recorded.", searchUsersLabel: "Search users", searchUsersPlaceholder: "Name or surname", filterByRoleLabel: "Filter by role", allRoles: "All roles", noUsersFound: "No users found.", loadingUsers: "Loading users...", usersLoadError: "Could not load users. Check the PHP server and database connection.",
    databaseConnectionError: "Cannot reach MySQL. Check that the server is running.", databaseAccessDenied: "MySQL rejected the connection. Check the username and password in PHP/db.konexioa.php.", databaseNotFound: "Database kudeaketa_db was not found. Create it and import the SQL schema.", usersTableMissing: "Table usuarios was not found. Import SQL/kudeaketa_2_estruktura.sql.", invalidUsersResponse: "The PHP server did not return a valid JSON response.",
    inventoryView: "Inventory", inventoryEyebrow: "Txurdinaga · Inventory", inventoryTitle: "Inventory and budget", inventoryDescription: "Review equipment and plan for future needs.", inventoryModesLabel: "Inventory views", inventoryDatabaseTab: "Current inventory · Database", inventoryBudgetTab: "Future budget · Demo", inventoryDatabaseTitle: "Current equipment", inventoryDatabaseDescription: "Loaded directly from the MySQL database.", inventoryRefresh: "Refresh", inventoryKinds: "Item types", inventoryUnits: "Total units", inventoryNeedsAttention: "Need attention", inventoryTableLabel: "Database inventory list", inventoryIdLabel: "ID", inventoryNameLabel: "Item", inventoryQuantityLabel: "Quantity", inventoryStatusLabel: "Status", inventoryCenterLabel: "Center / responsible person", inventoryReviewLabel: "Last review", inventoryLoading: "Loading inventory...", inventoryError: "Could not load inventory. Check PHP, the database and the inventory table.", inventoryEmpty: "There are no inventory items in the database.", inventoryStatusGood: "Good", inventoryStatusUnusable: "Unusable", inventoryStatusMaintenance: "Under maintenance", inventoryStatusLost: "Lost", inventoryNoReview: "No review date",
    budgetPlanningEyebrow: "Future planning · Demo", budgetPlanningTitle: "Planning a €10,000 budget", budgetPlanningDescription: "These are illustrative estimates, not connected to the database or actual expenses.", budgetAvailableLabel: "Annual budget", budgetPlannedLabel: "Forecast needs", budgetRemainingLabel: "Remaining reserve", budgetUseLabel: "Budget allocated", budgetDistributionTitle: "Forecast needs by priority", budgetDistributionDescription: "Each colour represents forecast spending for future needs.", budgetChartLabel: "Budget allocation: low priority in green, medium in orange and high in red.", priorityLow: "Low · Green", priorityMedium: "Medium · Orange", priorityHigh: "High · Red", budgetItemsTitle: "Possible future needs", budgetItemsDescription: "Illustrative budget example grouped by priority.", budgetPriorityTotal: "Total", budgetLowLaptop: "Laptop RAM upgrades", budgetLowMice: "Mouse and keyboard bundle", budgetMediumWifi: "Classroom Wi-Fi access points", budgetMediumProjector: "Projector maintenance and parts", budgetHighServer: "Laboratory server upgrade", budgetHighElectrical: "Laboratory electrical installation",
    inventoryExcelTab: "PC parts · Excel", inventoryExcelTitle: "PC components · Excel", inventoryExcelDescription: "Summary of the technical specifications in the original Excel file.", inventoryExcelDownload: "Download Excel", inventoryExcelSummary: "Main PC specifications", inventoryExcelTableLabel: "Components from the Excel file", excelStorage: "Total storage", excelMemory: "RAM", excelPower: "Power supply", excelNumber: "No.", excelComponent: "Component / Category", excelManufacturer: "Manufacturer / Brand", excelModel: "Model / Specification", excelCapacity: "Capacity / Power", excelNotes: "Technical notes", excelMotherboard: "Motherboard", excelMotherboardNote: "Standard Intel desktop socket", excelGraphics: "Graphics card", excelGraphicsNote: "Entry-level / office use", excelHardDriveOne: "Hard drive 1", excelHardDriveTwo: "Hard drive 2", excelRam: "RAM memory", excelGeneric: "Generic / Various", excelRamNote: "2 GB DDR3 module", excelPowerSupply: "Power supply", excelCase: "Case / Chassis", excelMidTower: "Mid Tower", excelCaseNote: "Black ATX/MicroATX case", excelOpticalDrive: "Optical drive / DVD reader", excelDvdModel: "DVD 24x (reader and writer)", excelDvdNote: "SATA DVD/CD reader and writer", excelRecommendationTitle: "Excel recommendation", excelRecommendationText: "The workbook recommends expanding the RAM to 8 GB and adding a SATA SSD.",
    inventoryDemoDescription: "Demo sample data; not loaded from MySQL.", demoModeNotice: "Demo mode: lists contain sample data and are not connected to PHP or the database.", demoSessionError: "Could not save the demo session in this browser.",
    invalidLogin: "The username or password is incorrect.", sessionUnavailable: "The session could not be checked. Check the PHP server.", logout: "Sign out", logoutFailed: "The session could not be ended. Please try again.", storageError: "The record is only available on this screen.", accessSaved: "Access registered in demo mode.",
    recordCount: (count) => `${count} ${count === 1 ? "RECORD" : "RECORDS"}`, dateLocale: "en-GB", darkTheme: "Dark mode", lightTheme: "Light mode", pageTitle: "Access control | CIFP Txurdinaga LHII",
    viewParking: "View parking", parkingTitle: "Parking", parkingDescription: "Parking spaces, capacity and movement.", parkingLegendLabel: "Parking space status legend", parkingPlanLabel: "Top-down parking layout", spacesFree: "Free", spacesOccupied: "Occupied", filterAll: "All", parkingFiltersLabel: "Filter parking zones",
    spaceFree: "Free space", spaceOccupied: "Occupied space", zoneVisits: "Visitors", zoneOthers: "Others", zoneTeachers: "Teachers", zoneStudents: "Students", zoneCodeVisits: "VI", zoneCodeOthers: "OT", zoneCodeTeachers: "TE", zoneCodeStudents: "ST", otherSpacesLegendLabel: "Space types", otherCapacityMotorcycles: "5 motorcycles", otherCapacityElectric: "3 electric", otherCapacityAccessible: "2 accessible", otherTypeMotorcycle: "Motorcycle", otherTypeElectric: "Electric vehicle", otherTypeAccessible: "Accessible", parkingAisle: "Driving lane", buildingLabel: "Main building", schoolBuilding: "CIFP Txurdinaga LHII", parkingOccupancy: "Parking occupancy", parkingEntrance: "Entrance", parkingExit: "Exit", parkingRoad: "Circulation lane",
    parkingDialogEyebrow: "Parking · selected space", parkingReserveTitle: "Reserve space", parkingOccupiedTitle: "Space occupied", reserveParkingSpace: "Confirm reservation", reservedForPlate: "Reservation for license plate", releaseParkingSpace: "Release space", parkingReserved: (plate) => `Reservation confirmed for ${plate}.`, parkingReleased: "Space released.", unknownReservedPlate: "No license plate registered.", invalidParkingPlate: "Enter a valid license plate.", closeDialogLabel: "Close window", exitParking: "Exit parking", exitParkingLabel: "Return to dashboard",
    parkingSpaceLabel: (zone, number, status) => `${zone}, space ${number}, ${status}`, parkingCount: (free, occupied) => `${free} free · ${occupied} occupied`
  }
};
const inventoryExcelTranslations = {
  eu: {
    inventoryExcelLoading: "Excel datuak kargatzen...",
    inventoryExcelError: "Ezin izan dira Excel datuak kargatu. Egiaztatu zerbitzaria eta data/inbentario-excel.json fitxategia.",
    excelOtherParts: "Beste osagai batzuk",
    excelStorageSummary: "Biltegiratze ahalmen osoa",
    excelRamSummary: "RAM memoriaren edukiera",
    excelGraphicsSummary: "Prozesamendu grafikoa",
    excelOpticalSummary: "Unitate optikoa",
    excelRecommendationSummary: "Eguneratzeko gomendioa"
  },
  es: {
    inventoryExcelLoading: "Cargando los datos del Excel...",
    inventoryExcelError: "No se pudieron cargar los datos del Excel. Comprueba el servidor y el archivo data/inventario-excel.json.",
    excelOtherParts: "Otros componentes",
    excelStorageSummary: "Capacidad total de almacenamiento",
    excelRamSummary: "Capacidad de memoria RAM",
    excelGraphicsSummary: "Procesamiento gráfico",
    excelOpticalSummary: "Unidad óptica",
    excelRecommendationSummary: "Recomendación de actualización"
  },
  en: {
    inventoryExcelLoading: "Loading Excel data...",
    inventoryExcelError: "Could not load Excel data. Check the server and data/inventario-excel.json.",
    excelOtherParts: "Other components",
    excelStorageSummary: "Total storage capacity",
    excelRamSummary: "RAM capacity",
    excelGraphicsSummary: "Graphics processing",
    excelOpticalSummary: "Optical drive",
    excelRecommendationSummary: "Upgrade recommendation"
  }
};
const managementTranslations = {
  eu: {
    manageHeader: "Kudeatu", manageRecord: "Kudeatu", sortAscending: "goranzko ordena", sortDescending: "beheranzko ordena", createUserTitle: "Erabiltzailea gehitu", createUserDescription: "Bete erabiltzaile berriaren datuak.", createInventoryTitle: "Artikulua gehitu", createInventoryDescription: "Gehitu artikulu bat MySQL inbentarioan.", selectRole: "Aukeratu rola", newUserPasswordLabel: "Hasierako pasahitza", createRecord: "Gehitu", editRecord: "Aldatu datuak", saveChanges: "Gorde", cancelChanges: "Utzi", deleteRecord: "Ezabatu", optionalPassword: "Utzi hutsik pasahitza aldatu nahi ez baduzu.", confirmDeleteUser: "Ziur erabiltzaile hau ezabatu nahi duzula?", confirmDeleteInventory: "Ziur artikulu hau ezabatu nahi duzula?", createSuccess: "Erregistroa gehitu da.", updateSuccess: "Aldaketak gorde dira.", deleteSuccess: "Erregistroa ezabatu da.", managementFailed: "Ezin izan da eragiketa osatu. Saiatu berriro.", duplicateEntry: "Dagoeneko erabiltzen den email bat edo datu bikoiztu bat dago.", invalidReference: "Aukeratutako rola edo zentroa ez da baliozkoa.", invalidUserData: "Egiaztatu erabiltzailearen izena, abizena eta emaila.", invalidRole: "Aukeratu baliozko rol bat.", passwordRequired: "Erabiltzaile berriarentzat pasahitza behar da.", invalidInventoryData: "Egiaztatu artikuluaren izena, kopurua eta egoera.", centerRequired: "Aukeratu zentro ID baliozko bat.", centerUnavailable: "Datu-baseak artikulua lotzeko zentro bat behar du, baina ez dago erabilgarririk.", inventoryManagerRequired: "Ezin da artikulua sortu saioa erabiltzaile baliodun bati lotuta ez dagoelako.", recordNotFound: "Erregistroa ez da aurkitu. Eguneratu zerrenda eta saiatu berriro.", recordNotFoundForDelete: "Erregistroa ez da aurkitu. Eguneratu zerrenda eta saiatu berriro."
  },
  es: {
    manageHeader: "Gestionar", manageRecord: "Gestionar", sortAscending: "orden ascendente", sortDescending: "orden descendente", createUserTitle: "Añadir usuario", createUserDescription: "Introduce los datos de la nueva cuenta.", createInventoryTitle: "Añadir artículo", createInventoryDescription: "Añade un artículo al inventario de MySQL.", selectRole: "Selecciona un rol", newUserPasswordLabel: "Contraseña inicial", createRecord: "Añadir", editRecord: "Editar datos", saveChanges: "Guardar", cancelChanges: "Cancelar", deleteRecord: "Borrar", optionalPassword: "Déjalo vacío si no quieres cambiar la contraseña.", confirmDeleteUser: "¿Seguro que quieres borrar este usuario?", confirmDeleteInventory: "¿Seguro que quieres borrar este artículo?", createSuccess: "Registro añadido.", updateSuccess: "Cambios guardados.", deleteSuccess: "Registro borrado.", managementFailed: "No se pudo completar la operación. Inténtalo de nuevo.", duplicateEntry: "El correo ya está en uso o hay un registro duplicado.", invalidReference: "El rol o el centro seleccionado no es válido.", invalidUserData: "Revisa el nombre, los apellidos y el correo del usuario.", invalidRole: "Selecciona un rol válido.", passwordRequired: "La contraseña es obligatoria para crear un usuario.", invalidInventoryData: "Revisa el nombre, la cantidad y el estado del artículo.", centerRequired: "Selecciona un ID de centro válido.", centerUnavailable: "La base de datos requiere un centro, pero no hay ninguno disponible.", inventoryManagerRequired: "No se puede crear el artículo porque la sesión no está vinculada a un usuario válido.", recordNotFound: "No se encontró el registro. Actualiza la lista e inténtalo de nuevo.", recordNotFoundForDelete: "No se encontró el registro. Actualiza la lista e inténtalo de nuevo."
  },
  en: {
    manageHeader: "Manage", manageRecord: "Manage", sortAscending: "ascending order", sortDescending: "descending order", createUserTitle: "Add user", createUserDescription: "Enter the new account details.", createInventoryTitle: "Add item", createInventoryDescription: "Add an item to the MySQL inventory.", selectRole: "Select a role", newUserPasswordLabel: "Initial password", createRecord: "Add", editRecord: "Edit details", saveChanges: "Save", cancelChanges: "Cancel", deleteRecord: "Delete", optionalPassword: "Leave blank to keep the current password.", confirmDeleteUser: "Are you sure you want to delete this user?", confirmDeleteInventory: "Are you sure you want to delete this item?", createSuccess: "Record added.", updateSuccess: "Changes saved.", deleteSuccess: "Record deleted.", managementFailed: "The operation failed. Please try again.", duplicateEntry: "The email is already in use or a duplicate record exists.", invalidReference: "The selected role or center is invalid.", invalidUserData: "Check the user's name, surname and email.", invalidRole: "Select a valid role.", passwordRequired: "A password is required to create a user.", invalidInventoryData: "Check the item name, quantity and status.", centerRequired: "Select a valid center ID.", centerUnavailable: "The database requires a center, but none is available.", inventoryManagerRequired: "The item cannot be created because the session is not linked to a valid user.", recordNotFound: "Record not found. Refresh the list and try again.", recordNotFoundForDelete: "Record not found. Refresh the list and try again."
  }
};
let toastTimeout;
let currentLanguage = "eu";
let activeAccount = null;
let demoUsers = [];
let usersLoadState = "idle";
let usersLoadPromise = null;
let usersLoadErrorKey = "usersLoadError";
let inventoryItems = [];
let inventoryLoadState = "idle";
let inventoryLoadPromise = null;
let inventoryMode = "database";
let databaseRoles = [];
const tableSortStates = new Map([
  ["users-list", { column: 2, direction: 1, type: "text" }],
  ["inventory-list", { column: 1, direction: 1, type: "text" }],
  ["inventory-excel-list", { column: 0, direction: 1, type: "number" }],
  ["access-records", { column: 2, direction: -1, type: "date" }]
]);
const budgetLimit = 10000;
const budgetPlan = [
  { priority: "low", items: [{ label: "budgetLowLaptop", amount: 1100 }, { label: "budgetLowMice", amount: 400 }] },
  { priority: "medium", items: [{ label: "budgetMediumWifi", amount: 1800 }, { label: "budgetMediumProjector", amount: 1200 }] },
  { priority: "high", items: [{ label: "budgetHighServer", amount: 3000 }, { label: "budgetHighElectrical", amount: 1400 }] }
];
const demoUsersFixture = [
  { id: 1, izena: "Aitor", abizena: "Iturbe", emaila: "aitor.admin@txurdinaga.eus", rol_id: 1, rol_izena: "ADMIN", zentroa_id: 1, zentroa_izena: "CIFP Txurdinaga LHII" },
  { id: 2, izena: "Miren", abizena: "Goikoetxea", emaila: "miren.ikasle@txurdinaga.eus", rol_id: 2, rol_izena: "IKASLE", zentroa_id: 1, zentroa_izena: "CIFP Txurdinaga LHII" },
  { id: 3, izena: "Jon", abizena: "Urrutia", emaila: "jon.irakasle@txurdinaga.eus", rol_id: 3, rol_izena: "IRAKASLE", zentroa_id: 1, zentroa_izena: "CIFP Txurdinaga LHII" },
  { id: 4, izena: "Ane", abizena: "Zubizarreta", emaila: "ane.irakasle@txurdinaga.eus", rol_id: 3, rol_izena: "IRAKASLE", zentroa_id: 1, zentroa_izena: "CIFP Txurdinaga LHII" },
  { id: 5, izena: "Koldo", abizena: "Garcia", emaila: "koldo.inbentario@txurdinaga.eus", rol_id: 4, rol_izena: "INBENTARIO", zentroa_id: 1, zentroa_izena: "CIFP Txurdinaga LHII" }
];
const demoInventoryFixture = [
  { id: 1, izena: "Ordenagailu eramangarria", kopurua: 12, egoera: "ONDO", zentroa_id: 1, zentroa_izena: "CIFP Txurdinaga LHII", azken_berrikuspena: "2026-09-15 10:00:00" },
  { id: 2, izena: "Proiektorea", kopurua: 4, egoera: "MANTENIMENDUAN", zentroa_id: 1, zentroa_izena: "CIFP Txurdinaga LHII", azken_berrikuspena: "2026-09-10 09:30:00" },
  { id: 3, izena: "Mahaigaineko ordenagailua", kopurua: 24, egoera: "ONDO", zentroa_id: 1, zentroa_izena: "CIFP Txurdinaga LHII", azken_berrikuspena: "2026-09-12 11:15:00" },
  { id: 4, izena: "Inprimagailua", kopurua: 3, egoera: "ERABILI_EZINIK", zentroa_id: 1, zentroa_izena: "CIFP Txurdinaga LHII", azken_berrikuspena: "2026-09-08 08:45:00" },
  { id: 5, izena: "Sareko switch-a", kopurua: 6, egoera: "ONDO", zentroa_id: 1, zentroa_izena: "CIFP Txurdinaga LHII", azken_berrikuspena: "2026-09-16 12:00:00" }
];
function translate(key) {
  return managementTranslations[currentLanguage]?.[key]
    ?? inventoryExcelTranslations[currentLanguage]?.[key]
    ?? translations[currentLanguage][key];
}

function updateTableSortIndicators() {
  document.querySelectorAll(".table-sort-button").forEach((button) => {
    const bodyId = button.dataset.sortBody;
    const state = tableSortStates.get(bodyId);
    const isActive = state?.column === Number(button.dataset.sortColumn);
    const direction = isActive ? state.direction : 1;
    const indicator = button.querySelector(".table-sort-indicator");
    const label = button.querySelector(".table-sort-label").textContent;
    const directionLabel = translate(direction === 1 ? "sortAscending" : "sortDescending");
    indicator.textContent = button.dataset.sortType === "text"
      ? direction === 1 ? "A-Z" : "Z-A"
      : direction === 1 ? "↑" : "↓";
    button.setAttribute("aria-label", `${label}, ${directionLabel}`);
    button.title = `${label}: ${directionLabel}`;
    button.closest("th").setAttribute("aria-sort", isActive ? direction === 1 ? "ascending" : "descending" : "none");
  });
}

function sortTableBody(bodyId) {
  const body = document.getElementById(bodyId);
  const state = tableSortStates.get(bodyId);
  if (!body || !state) return;

  const rows = [...body.children].filter((row) => !row.classList.contains("excel-group-row") && !row.classList.contains("empty-row"));
  const collator = new Intl.Collator(currentLanguage, { numeric: true, sensitivity: "base" });
  const valueFor = (row) => {
    const cell = row.cells[state.column];
    const value = cell?.dataset.sortValue ?? cell?.textContent ?? "";
    return state.type === "text" ? value.replace(/\s+/g, " ").trim() : value.trim();
  };
  const compare = (first, second) => {
    const firstValue = valueFor(first.row);
    const secondValue = valueFor(second.row);
    if (firstValue === "" || secondValue === "") {
      if (firstValue === secondValue) return first.index - second.index;
      return firstValue === "" ? 1 : -1;
    }

    let comparison;
    if (state.type === "number") {
      comparison = Number(firstValue) - Number(secondValue);
      if (Number.isNaN(comparison)) comparison = collator.compare(firstValue, secondValue);
    } else if (state.type === "date") {
      comparison = Date.parse(firstValue) - Date.parse(secondValue);
      if (Number.isNaN(comparison)) comparison = collator.compare(firstValue, secondValue);
    } else {
      comparison = collator.compare(firstValue, secondValue);
    }
    return comparison === 0 ? first.index - second.index : comparison * state.direction;
  };

  const orderedRows = rows
    .map((row, index) => ({ row, index }))
    .sort(compare)
    .map(({ row }) => row);

  if (bodyId === "inventory-excel-list") {
    const groupHeaders = new Map(
      [...body.querySelectorAll(".excel-group-row")].map((row) => [row.dataset.groupKey, row])
    );
    let currentGroup = null;
    const fragment = document.createDocumentFragment();
    orderedRows.forEach((row) => {
      const group = row.dataset.sortGroup;
      if (group !== currentGroup) {
        const groupHeader = groupHeaders.get(group);
        if (groupHeader) fragment.append(groupHeader.cloneNode(true));
        currentGroup = group;
      }
      fragment.append(row);
    });
    body.replaceChildren(fragment);
  } else {
    const blocks = [];
    [...body.children].forEach((row) => {
      if (row.classList.contains("empty-row")) return;
      if (row.dataset.editorRow && blocks.length > 0) {
        blocks[blocks.length - 1].rows.push(row);
      } else {
        blocks.push({ row, rows: [row] });
      }
    });
    const orderedBlocks = blocks
      .map((block, index) => ({ ...block, index }))
      .sort((first, second) => {
        const comparison = compare(
          { row: first.row, index: first.index },
          { row: second.row, index: second.index }
        );
        return comparison;
      });
    const fragment = document.createDocumentFragment();
    orderedBlocks.forEach((block) => block.rows.forEach((row) => fragment.append(row)));
    body.replaceChildren(fragment);
  }

  updateTableSortIndicators();
}

function isDatabaseAdmin() {
  return activeAccount?.role === "Admin" && activeAccount.isDemo !== true;
}

function updateManagementVisibility() {
  const canManage = isDatabaseAdmin();
  usersCreateForm.hidden = !canManage;
  inventoryCreateForm.hidden = !canManage;
  usersManageHeader.hidden = !canManage;
  inventoryManageHeader.hidden = !canManage;
}

function populateRoleSelect(select, selectedRoleId = "") {
  select.replaceChildren();
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = translate("selectRole");
  select.append(placeholder);
  databaseRoles.forEach((role) => {
    const option = document.createElement("option");
    option.value = String(role.id);
    option.textContent = `${role.id} · ${role.izena || ""}`.trim();
    option.selected = String(role.id) === String(selectedRoleId);
    select.append(option);
  });
  select.disabled = databaseRoles.length === 0;
  select.required = databaseRoles.length > 0;
}

function createManagementField(name, labelKey, type, value, options = null) {
  const label = document.createElement("label");
  const caption = document.createElement("span");
  caption.textContent = translate(labelKey);
  const control = options
    ? document.createElement("select")
    : document.createElement("input");
  control.name = name;
  if (options) {
    control.required = true;
    options.forEach((optionData) => {
      const option = document.createElement("option");
      option.value = optionData.value;
      option.textContent = optionData.label;
      option.selected = optionData.value === String(value ?? "");
      control.append(option);
    });
  } else {
    control.type = type;
    control.required = ["izena", "abizena", "emaila", "kopurua"].includes(name);
    if (type !== "password") control.value = value ?? "";
    if (type === "password") control.autocomplete = "new-password";
    if (type === "email") control.maxLength = 100;
    if (name === "izena" || name === "abizena") control.maxLength = 50;
    if (name === "kopurua") {
      control.min = "0";
      control.step = "1";
    }
  }
  label.append(caption, control);
  return label;
}

function createInlineEditor(entity, record) {
  const row = document.createElement("tr");
  row.className = "inline-management-row";
  row.dataset.editorRow = "true";
  const cell = document.createElement("td");
  cell.colSpan = entity === "users" ? 8 : 6;
  const form = document.createElement("form");
  form.className = "inline-management-form";
  form.dataset.entity = entity;
  form.dataset.recordId = String(record.id);
  const fields = document.createElement("div");
  fields.className = "database-create-fields";
  if (entity === "users") {
    fields.append(
      createManagementField("izena", "firstNameLabel", "text", record.izena),
      createManagementField("abizena", "lastNameLabel", "text", record.abizena),
      createManagementField("emaila", "emailLabel", "email", record.emaila)
    );
    const roleField = createManagementField("rol_id", "roleIdLabel", "select", record.rol_id,
      databaseRoles.map((role) => ({ value: String(role.id), label: `${role.id} · ${role.izena || ""}`.trim() })));
    fields.append(roleField);
    const passwordField = createManagementField("pasahitza", "newUserPasswordLabel", "password", "");
    passwordField.querySelector("input").placeholder = translate("optionalPassword");
    fields.append(passwordField);
  } else {
    const statusOptions = [
      ["ONDO", "inventoryStatusGood"],
      ["ERABILI_EZINIK", "inventoryStatusUnusable"],
      ["MANTENIMENDUAN", "inventoryStatusMaintenance"],
      ["GALDUTAKO", "inventoryStatusLost"]
    ].map(([status, key]) => ({ value: status, label: translate(key) }));
    const inventoryNameField = createManagementField("izena", "inventoryNameLabel", "text", record.izena);
    inventoryNameField.querySelector("input").maxLength = 100;
    fields.append(
      inventoryNameField,
      createManagementField("kopurua", "inventoryQuantityLabel", "number", record.kopurua),
      createManagementField("egoera", "inventoryStatusLabel", "select", record.egoera, statusOptions)
    );
  }

  const controls = document.createElement("div");
  controls.className = "inline-management-actions";
  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.className = "database-action-button";
  saveButton.textContent = translate("saveChanges");
  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = "database-secondary-button";
  cancelButton.dataset.cancelEditor = "true";
  cancelButton.textContent = translate("cancelChanges");
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "database-delete-button";
  deleteButton.dataset.deleteEntity = entity;
  deleteButton.dataset.deleteId = String(record.id);
  deleteButton.textContent = translate("deleteRecord");
  controls.append(saveButton, cancelButton, deleteButton);
  form.append(fields, controls);
  cell.append(form);
  row.append(cell);
  return row;
}

function updateParkingPlateFormat() {
  const format = document.querySelector('input[name="parking-plate-format"]:checked').value;
  document.querySelector("#license-plate-preview").dataset.format = format;
  parkingPlate.pattern = platePatterns[format];
  parkingPlate.maxLength = format === "current" ? 7 : 10;
  parkingPlate.placeholder = translate(format === "current" ? "currentPlatePlaceholder" : "oldPlatePlaceholder");
  parkingPlateHint.textContent = translate(format === "current" ? "currentPlateHint" : "oldPlateHint");
  if (!partialPlatePatterns[format].test(parkingPlate.value.toUpperCase())) parkingPlate.value = "";
  parkingPlate.dataset.lastValid = parkingPlate.value.toUpperCase();
}

function updateSessionIdentity() {
  if (activeAccount) {
    sessionUser.textContent = activeAccount.username;
    sessionRole.textContent = translate(`role${activeAccount.role}`);
    profileTitle.textContent = translate(`title${activeAccount.role}`);
  }
  demoModeNotice.hidden = activeAccount?.isDemo !== true;
  inventoryDatabaseDescription.textContent = translate(activeAccount?.isDemo ? "inventoryDemoDescription" : "inventoryDatabaseDescription");
  updateManagementVisibility();
}

let pageTransitionTimeout;

function playPageTransition() {
  window.clearTimeout(pageTransitionTimeout);
  pageTransition.classList.remove("is-active");
  void pageTransition.offsetWidth;
  pageTransition.classList.add("is-active");
  pageTransitionTimeout = window.setTimeout(() => {
    pageTransition.classList.remove("is-active");
  }, 1100);
}

function setDashboardView(viewName) {
  const allowedViews = activeAccount?.role === "Admin"
    ? ["overview", "users", "inventory"]
    : activeAccount?.role === "Inventory"
      ? ["inventory"]
      : ["overview"];
  const selectedView = allowedViews.includes(viewName) ? viewName : allowedViews[0];
  const previousView = dashboardScreen.dataset.view;
  dashboardScreen.dataset.view = selectedView;
  overviewOnlySections.forEach((section) => {
    section.hidden = selectedView !== "overview";
  });
  usersView.hidden = selectedView !== "users";
  inventoryView.hidden = selectedView !== "inventory";
  overviewViewButton.hidden = !allowedViews.includes("overview");
  document.querySelector("#users-view-button").hidden = !allowedViews.includes("users");
  inventoryViewButton.hidden = !allowedViews.includes("inventory");
  viewSwitcher.hidden = activeAccount?.role === "Inventory";
  viewButtons.forEach((button) => {
    const isSelected = button.dataset.appView === selectedView;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
  if (previousView && previousView !== selectedView) playPageTransition();
  if (selectedView === "users") loadUsers();
  if (selectedView === "inventory") loadInventory();
}

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "eu";
  document.documentElement.lang = currentLanguage;
  document.title = translate("pageTitle");
  languageSelect.value = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = translate(element.dataset.i18nPlaceholder);
  });
  updateParkingPlateFormat();
  if (window.updateThemeLabels) window.updateThemeLabels(currentLanguage);
  updateSessionIdentity();
  updateDateTime();
  renderDashboard();
  renderParking();
  renderAttendanceUsers();
  renderInventory();
  renderInventoryExcel();
  renderBudgetPlan();
  updateTableSortIndicators();
}

try {
  currentLanguage = localStorage.getItem(languageStorageKey) || "eu";
} catch {
  currentLanguage = "eu";
}

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createDemoEntries() {
  const now = new Date();
  return [
    { identifier: "1234BCD", full_name: "Demo ikaslea", access_type: "entrada", created_at: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 42).toISOString() },
    { identifier: "5678 FGH", full_name: "Demo ikaslea", access_type: "entrada", created_at: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 36).toISOString() },
    { identifier: "BI-1234-BC", full_name: "Demo ikaslea", access_type: "salida", created_at: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 20).toISOString() }
  ];
}

function loadEntries() {
  try {
    const savedEntries = localStorage.getItem(storageKey);
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries);
      if (Array.isArray(parsedEntries)) return parsedEntries;
    }
  } catch {
    // Local storage may be unavailable when the file is opened directly.
  }
  return createDemoEntries();
}

let entries = loadEntries();

function loadParkingState() {
  try {
    const savedState = JSON.parse(localStorage.getItem(parkingStorageKey));
    if (savedState && typeof savedState === "object") {
      return Object.fromEntries(parkingZones.map((zone) => [
        zone.id,
        Array.isArray(savedState[zone.id]) ? [...new Set(savedState[zone.id].filter((number) => Number.isInteger(number) && number >= 1 && number <= zone.capacity))] : zone.occupied
      ]));
    }
  } catch {
    // Local storage may be unavailable when the file is opened directly.
  }
  return Object.fromEntries(parkingZones.map((zone) => [zone.id, [...zone.occupied]]));
}

let parkingState = loadParkingState();

function loadParkingReservations(state = parkingState) {
  try {
    const savedReservations = JSON.parse(localStorage.getItem(parkingReservationsStorageKey));
    if (savedReservations && typeof savedReservations === "object") {
      return Object.fromEntries(parkingZones.map((zone) => {
        const zoneReservations = savedReservations[zone.id];
        const validReservations = zoneReservations && typeof zoneReservations === "object" && !Array.isArray(zoneReservations)
          ? Object.entries(zoneReservations).flatMap(([rawNumber, reservation]) => {
            const number = Number(rawNumber);
            const savedReservation = typeof reservation === "string" ? { plate: reservation, format: "current" } : reservation;
            if (!Number.isInteger(number) || number < 1 || number > zone.capacity || !state[zone.id].includes(number) || !savedReservation || typeof savedReservation.plate !== "string" || !savedReservation.plate.trim()) return [];
            return [[number, { plate: savedReservation.plate.trim().toUpperCase(), format: savedReservation.format === "old" ? "old" : "current" }]];
          })
          : [];
        return [zone.id, Object.fromEntries(validReservations)];
      }));
    }
  } catch {
    // Local storage may be unavailable when the file is opened directly.
  }
  return Object.fromEntries(parkingZones.map((zone) => [zone.id, {}]));
}

let parkingReservations = loadParkingReservations(parkingState);
let selectedParkingSpace = null;

function saveParkingReservations() {
  try {
    localStorage.setItem(parkingReservationsStorageKey, JSON.stringify(parkingReservations));
  } catch {
    showToast(translate("storageError"), true);
  }
}

function focusParkingSpace(zone, number) {
  document.querySelector(`#${zone.upperId} [data-space-number="${number}"], #${zone.lowerId} [data-space-number="${number}"]`).focus({ preventScroll: true });
}

function openParkingSpace(zone, number) {
  selectedParkingSpace = { zone, number };
  const spaceName = `${translate(zone.prefixKey)}-${String(number).padStart(2, "0")}`;
  const isOccupied = parkingState[zone.id].includes(number);
  parkingDialogTitle.textContent = translate(isOccupied ? "parkingOccupiedTitle" : "parkingReserveTitle");
  const spaceType = zone.spaceTypes?.[number - 1];
  parkingDialogSpace.textContent = `${translate(zone.title)} · ${spaceName}${spaceType ? ` · ${translate(spaceType)}` : ""}`;
  parkingReservationForm.hidden = isOccupied;
  parkingReservedDetails.hidden = !isOccupied;
  parkingPlateError.hidden = true;

  if (isOccupied) {
    const reservation = parkingReservations[zone.id][number];
    reservedPlate.textContent = reservation?.plate || translate("unknownReservedPlate");
    reservedPlate.dataset.format = reservation?.format || "current";
  } else {
    parkingReservationForm.reset();
    parkingPlate.value = "";
    updateParkingPlateFormat();
  }

  parkingDialog.showModal();
  if (!isOccupied) requestAnimationFrame(() => parkingPlate.focus({ preventScroll: true }));
}

function reserveSelectedParkingSpace(event) {
  event.preventDefault();
  if (!selectedParkingSpace) return;

  if (!parkingPlate.checkValidity()) {
    parkingPlateError.textContent = translate("invalidParkingPlate");
    parkingPlateError.hidden = false;
    parkingPlate.reportValidity();
    parkingPlate.focus();
    return;
  }

  const { zone, number } = selectedParkingSpace;
  const plate = parkingPlate.value.trim().toUpperCase();
  const format = document.querySelector('input[name="parking-plate-format"]:checked').value;
  if (parkingState[zone.id].includes(number)) {
    openParkingSpace(zone, number);
    return;
  }

  parkingState[zone.id] = [...parkingState[zone.id], number];
  parkingReservations[zone.id][number] = { plate, format };
  saveParkingState();
  saveParkingReservations();
  renderParking();
  addAccessRecord({ identifier: plate, parkingZone: zone.id, access_type: "entrada" });
  parkingDialog.close();
  focusParkingSpace(zone, number);
  selectedParkingSpace = null;
  showToast(translate("parkingReserved")(plate));
}

function releaseSelectedParkingSpace() {
  if (!selectedParkingSpace) return;
  const { zone, number } = selectedParkingSpace;
  const identifier = parkingReservations[zone.id][number]?.plate || `${translate(zone.prefixKey)}-${String(number).padStart(2, "0")}`;
  parkingState[zone.id] = parkingState[zone.id].filter((spaceNumber) => spaceNumber !== number);
  delete parkingReservations[zone.id][number];
  saveParkingState();
  saveParkingReservations();
  renderParking();
  addAccessRecord({ identifier, parkingZone: zone.id, access_type: "salida" });
  parkingDialog.close();
  focusParkingSpace(zone, number);
  selectedParkingSpace = null;
  showToast(translate("parkingReleased"));
}

function saveParkingState() {
  try {
    localStorage.setItem(parkingStorageKey, JSON.stringify(parkingState));
  } catch {
    showToast(translate("storageError"), true);
  }
}

function createParkingPlan() {
  parkingZones.forEach((zone) => {
    const upperSpaces = document.querySelector(`#${zone.upperId}`);
    const lowerSpaces = document.querySelector(`#${zone.lowerId}`);
    const upperCapacity = Math.ceil(zone.capacity / 2);
    const lowerCapacity = Math.floor(zone.capacity / 2);
    upperSpaces.style.setProperty("--spot-columns", String(upperCapacity));
    lowerSpaces.style.setProperty("--spot-columns", String(lowerCapacity));

    for (let number = 1; number <= zone.capacity; number += 1) {
      const button = document.createElement("button");
      const indicator = document.createElement("span");
      const label = document.createElement("span");
      const tooltip = document.createElement("span");
      button.type = "button";
      button.className = "parking-space is-free";
      button.dataset.spaceNumber = String(number);
      button.dataset.zoneId = zone.id;
      if (zone.spaceTypes?.[number - 1]) button.dataset.spaceType = zone.spaceTypes[number - 1];
      button.setAttribute("aria-pressed", "false");
      indicator.className = "space-status-indicator";
      indicator.setAttribute("aria-hidden", "true");
      label.className = "space-number";
      label.textContent = String(number).padStart(2, "0");
      tooltip.className = "parking-space-tooltip";
      button.append(indicator, label, tooltip);
      button.addEventListener("click", () => openParkingSpace(zone, number));
      (number <= upperCapacity ? upperSpaces : lowerSpaces).append(button);
      parkingSpaceElements.set(`${zone.id}:${number}`, { button, tooltip });
    }
  });
}

function renderParking() {
  let totalFree = 0;
  let totalOccupied = 0;

  parkingZones.forEach((zone) => {
    const zoneName = translate(zone.title);
    const occupied = parkingState[zone.id];
    const freeCount = zone.capacity - occupied.length;
    totalFree += freeCount;
    totalOccupied += occupied.length;
    document.querySelector(`#${zone.countId}`).textContent = translate("parkingCount")(freeCount, occupied.length);

    for (let number = 1; number <= zone.capacity; number += 1) {
      const isOccupied = occupied.includes(number);
      const { button, tooltip } = parkingSpaceElements.get(`${zone.id}:${number}`);
      const reservation = parkingReservations[zone.id][number];
      const spaceType = zone.spaceTypes?.[number - 1];
      const statusKey = isOccupied ? "spaceOccupied" : "spaceFree";
      const code = `${translate(zone.prefixKey)}-${String(number).padStart(2, "0")}`;
      const status = translate(statusKey);
      const details = [code, ...(spaceType ? [translate(spaceType)] : []), reservation?.plate || status].join(" · ");
      button.classList.toggle("is-occupied", isOccupied);
      button.classList.toggle("is-free", !isOccupied);
      button.setAttribute("aria-pressed", String(isOccupied));
      button.setAttribute("aria-label", `${translate("parkingSpaceLabel")(zoneName, code, status)}${spaceType ? ` · ${translate(spaceType)}` : ""}`);
      button.title = details;
      tooltip.textContent = details;

    }
  });

  document.querySelector("#parking-free-total").textContent = String(totalFree);
  document.querySelector("#parking-occupied-total").textContent = String(totalOccupied);
}

function applyParkingFilter(filterId) {
  parkingFilters.forEach((button) => {
    const isActive = button.dataset.parkingFilter === filterId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  document.querySelectorAll("[data-parking-zone]").forEach((zone) => {
    zone.classList.toggle("is-filtered-out", filterId !== "all" && zone.dataset.parkingZone !== filterId);
  });
}

function refreshParkingFromStorage() {
  const nextState = loadParkingState();
  const nextReservations = loadParkingReservations(nextState);
  if (JSON.stringify(nextState) === JSON.stringify(parkingState) && JSON.stringify(nextReservations) === JSON.stringify(parkingReservations)) return;
  parkingState = nextState;
  parkingReservations = nextReservations;
  renderParking();
}

function saveEntries() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(entries));
  } catch {
    showToast(translate("storageError"), true);
  }
}

function addAccessRecord(record) {
  entries.unshift({ ...record, full_name: record.full_name || "", created_at: new Date().toISOString() });
  saveEntries();
  renderDashboard();
  renderAttendanceUsers();
}

function initialsFrom(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "?";
}

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.classList.toggle("error", isError);
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3000);
}

function formatTime(value) {
  return new Intl.DateTimeFormat(translate("dateLocale"), {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(new Date(value));
}

function createRecordRow(record) {
  const row = document.createElement("tr");
  const personCell = document.createElement("td");
  const person = document.createElement("div");
  const avatar = document.createElement("span");
  const name = document.createElement("span");
  const identifierCell = document.createElement("td");
  const timeCell = document.createElement("td");
  const typeCell = document.createElement("td");
  const statusCell = document.createElement("td");
  const badge = document.createElement("span");
  const dot = document.createElement("span");
  const status = document.createElement("span");

  person.className = "person-cell";
  avatar.className = "avatar";
  const parkingZone = parkingZones.find((zone) => zone.id === record.parkingZone);
  const displayName = parkingZone
    ? `${translate("parkingTitle")} · ${translate(parkingZone.title)}`
    : record.full_name === "Demo ikaslea" ? translate("demoPerson") : record.full_name;
  avatar.textContent = initialsFrom(displayName);
  name.className = "person-name";
  name.textContent = displayName;
  person.append(avatar, name);
  personCell.append(person);
  identifierCell.className = "person-id";
  identifierCell.textContent = record.identifier;
  timeCell.className = "time-cell";
  timeCell.textContent = formatTime(record.created_at);
  timeCell.dataset.sortValue = record.created_at;
  badge.className = `access-badge${record.access_type === "salida" ? " exit" : ""}`;
  dot.className = "status-dot";
  badge.append(dot, document.createTextNode(translate(record.access_type === "salida" ? "exit" : "entry")));
  typeCell.append(badge);
  status.className = "result-badge";
  status.textContent = translate("demoStatus");
  statusCell.append(status);
  row.append(personCell, identifierCell, timeCell, typeCell, statusCell);
  return row;
}

function renderDashboard() {
  const sortedEntries = [...entries].sort((first, second) => new Date(second.created_at) - new Date(first.created_at));
  const recentEntries = sortedEntries.slice(0, 8);

  recordCount.textContent = translate("recordCount")(recentEntries.length);
  recordsBody.replaceChildren();

  if (recentEntries.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    row.className = "empty-row";
    cell.colSpan = 5;
    cell.textContent = translate("emptyRecords");
    row.append(cell);
    recordsBody.append(row);
    return;
  }

  recentEntries.forEach((entry) => recordsBody.append(createRecordRow(entry)));
  sortTableBody("access-records");
}

async function loadUsers() {
  if (activeAccount?.isDemo) {
    demoUsers = demoUsersFixture;
    usersLoadState = "loaded";
    renderAttendanceUsers();
    return;
  }
  if (usersLoadState === "loaded") {
    renderAttendanceUsers();
    return;
  }
  if (usersLoadPromise) return usersLoadPromise;

  usersLoadState = "loading";
  usersLoadErrorKey = "usersLoadError";
  renderAttendanceUsers();
  usersLoadPromise = (async () => {
    try {
      const response = await fetch("PHP/select.php", {
        headers: { Accept: "application/json" }
      });
      let result;
      try {
        result = await response.json();
      } catch (error) {
        usersLoadErrorKey = "invalidUsersResponse";
        throw error;
      }
      if (!response.ok) {
        usersLoadErrorKey = translations[currentLanguage][result.errorCode] ? result.errorCode : "usersLoadError";
        throw new Error(`HTTP ${response.status}: ${result.errorCode || "Unknown error"}`);
      }
      if (!Array.isArray(result.users)) {
        usersLoadErrorKey = "invalidUsersResponse";
        throw new Error("Invalid users response");
      }
      demoUsers = result.users;
      databaseRoles = Array.isArray(result.roles) ? result.roles : [];
      populateRoleSelect(userCreateRole);
      usersLoadState = "loaded";
    } catch (error) {
      console.error("No se pudieron cargar los usuarios:", error);
      usersLoadState = "error";
    } finally {
      usersLoadPromise = null;
      renderAttendanceUsers();
    }
  })();
  return usersLoadPromise;
}

function latestUserAttendance(userId) {
  return entries
    .filter((entry) => entry.user_id === userId)
    .reduce((latest, entry) => !latest || new Date(entry.created_at) > new Date(latest.created_at) ? entry : latest, null);
}

function renderAttendanceUsers() {
  if (!activeAccount || !usersList) return;
  const authorizedUsers = activeAccount.role === "Admin"
    ? demoUsers
    : demoUsers.filter((user) => user.id === activeAccount.userId);
  const attendanceUsers = authorizedUsers.filter((user) => [1, 2, 3, 4].includes(user.rol_id));
  const insideCount = attendanceUsers.filter((user) => latestUserAttendance(user.id)?.access_type === "entrada").length;
  const searchTerm = userSearchInput.value.trim().toLocaleLowerCase(currentLanguage);
  const selectedRole = userRoleFilter.value;
  const visibleUsers = authorizedUsers.filter((user) => {
    const fullName = `${user.izena} ${user.abizena}`.toLocaleLowerCase(currentLanguage);
    const matchesName = !searchTerm || fullName.includes(searchTerm);
    const matchesRole = selectedRole === "all" || String(user.rol_id) === selectedRole;
    return matchesName && matchesRole;
  });

  attendanceInsideCount.textContent = String(insideCount);
  attendanceOutsideCount.textContent = String(attendanceUsers.length - insideCount);
  usersList.replaceChildren();

  if (usersLoadState === "loading" || usersLoadState === "error") {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    row.className = "empty-row";
    cell.colSpan = isDatabaseAdmin() ? 8 : 7;
    cell.textContent = translate(usersLoadState === "loading" ? "loadingUsers" : usersLoadErrorKey);
    row.append(cell);
    usersList.append(row);
    return;
  }

  if (visibleUsers.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    row.className = "empty-row";
    cell.colSpan = isDatabaseAdmin() ? 8 : 7;
    cell.textContent = translate("noUsersFound");
    row.append(cell);
    usersList.append(row);
    return;
  }

  visibleUsers.forEach((user) => {
    const row = document.createElement("tr");
    const attendance = latestUserAttendance(user.id);
    const canAttend = [1, 2, 3, 4].includes(user.rol_id);
    const isInside = attendance?.access_type === "entrada";
    const roleKey = { 1: "roleAdmin", 2: "roleStudent", 3: "roleTeacher", 4: "roleInventory" }[user.rol_id];
    const roleName = roleKey ? translate(roleKey) : user.rol_izena || "-";
    const cells = [
      String(user.id),
      user.izena,
      user.abizena,
      user.emaila,
      user.rol_id === null ? roleName : `${user.rol_id} · ${roleName}`
    ];

    cells.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });

    const statusCell = document.createElement("td");
    const status = document.createElement("span");
    status.className = `attendance-status${canAttend ? isInside ? " is-inside" : " is-outside" : " is-inactive"}`;
    status.textContent = canAttend ? translate(isInside ? "attendanceInside" : "attendanceOutside") : translate("attendanceNotApplicable");
    statusCell.append(status);
    row.append(statusCell);

    const actionCell = document.createElement("td");
    if (canAttend) {
      const button = document.createElement("button");
      const actionKey = isInside ? "attendanceOutAction" : "attendanceInAction";
      button.type = "button";
      button.className = "attendance-action";
      button.dataset.attendanceUserId = String(user.id);
      button.textContent = translate(actionKey);
      button.setAttribute("aria-label", `${translate(actionKey)} · ${user.izena} ${user.abizena}`);
      actionCell.append(button);
    } else {
      actionCell.textContent = "-";
    }
    row.append(actionCell);
    if (isDatabaseAdmin()) {
      const manageCell = document.createElement("td");
      const manageButton = document.createElement("button");
      manageButton.type = "button";
      manageButton.className = "database-action-button";
      manageButton.dataset.manageEntity = "users";
      manageButton.dataset.manageId = String(user.id);
      manageButton.textContent = translate("manageRecord");
      manageCell.append(manageButton);
      row.append(manageCell);
    }
    usersList.append(row);
  });
  sortTableBody("users-list");
}

function formatEuro(amount) {
  const locale = currentLanguage === "eu" ? "es-ES" : translate("dateLocale");
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(amount);
}

function setInventoryMode(mode) {
  const selectedMode = ["excel", "budget"].includes(mode) ? mode : "database";
  const modeChanged = inventoryMode !== selectedMode;
  inventoryMode = selectedMode;
  inventoryDatabaseView.hidden = inventoryMode !== "database";
  inventoryExcelView.hidden = inventoryMode !== "excel";
  inventoryBudgetView.hidden = inventoryMode !== "budget";
  inventoryModeButtons.forEach((button) => {
    const isSelected = button.dataset.inventoryMode === inventoryMode;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
  if (modeChanged) playPageTransition();
  if (inventoryMode === "database") loadInventory();
  if (inventoryMode === "excel") loadInventoryExcel();
}

async function loadInventoryExcel() {
  if (inventoryExcelLoadState === "loaded" || inventoryExcelLoadPromise) return inventoryExcelLoadPromise;

  inventoryExcelLoadState = "loading";
  inventoryExcelLoadError = null;
  renderInventoryExcel();
  inventoryExcelLoadPromise = fetch("data/inventario-excel.json")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data.groups) || !Array.isArray(data.summary)) {
        throw new Error("Invalid Excel inventory JSON structure");
      }
      inventoryExcelData = data;
      inventoryExcelLoadState = "loaded";
    })
    .catch((error) => {
      inventoryExcelLoadState = "error";
      inventoryExcelLoadError = error;
      console.error("Could not load Excel inventory data.", error);
    })
    .finally(() => {
      inventoryExcelLoadPromise = null;
      renderInventoryExcel();
    });
  return inventoryExcelLoadPromise;
}

function renderInventoryExcel() {
  inventoryExcelLoadMessage.hidden = inventoryExcelLoadState === "loaded";
  inventoryExcelLoadMessage.textContent = translate(
    inventoryExcelLoadState === "error" ? "inventoryExcelError" : "inventoryExcelLoading"
  );
  inventoryExcelList.replaceChildren();
  inventoryExcelSummary.replaceChildren();
  inventoryExcelRecommendation.textContent = "";

  if (inventoryExcelLoadState !== "loaded" || !inventoryExcelData) return;

  const summaryRows = inventoryExcelData.summary;
  const recommendation = summaryRows[summaryRows.length - 1];
  const summaryCards = summaryRows.slice(0, -1);
  const summaryLabels = {
    "Biltegiratze ahalmen osoa": "excelStorageSummary",
    "RAM memoriaren edukiera": "excelRamSummary",
    "Prozesamendu grafikoa": "excelGraphicsSummary",
    "Unitate optikoa": "excelOpticalSummary"
  };

  summaryCards.forEach((item) => {
    const card = document.createElement("article");
    const label = document.createElement("span");
    const value = document.createElement("strong");
    card.className = "glass-panel inventory-summary-card";
    label.textContent = translate(summaryLabels[item.label]) || item.label;
    value.textContent = item.value;
    card.append(label, value);
    inventoryExcelSummary.append(card);
  });
  if (recommendation) {
    inventoryExcelRecommendationTitle.textContent = translate("excelRecommendationTitle");
    inventoryExcelRecommendation.textContent = recommendation.value;
  }

  inventoryExcelData.groups.forEach((group) => {
    const groupRow = document.createElement("tr");
    const groupCell = document.createElement("th");
    groupRow.className = "excel-group-row";
    groupRow.dataset.groupKey = group.title;
    groupCell.scope = "rowgroup";
    groupCell.colSpan = 7;
    groupCell.textContent = group.title.trim() === "Beste osagai batzuk"
      ? translate("excelOtherParts")
      : group.title;
    groupRow.append(groupCell);
    inventoryExcelList.append(groupRow);

    group.items.forEach((item) => {
      const row = document.createElement("tr");
      [
        item.number,
        item.component,
        item.manufacturer,
        item.model,
        item.capacity,
        item.notes,
        String(item.quantity)
      ].forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value || "—";
        row.append(cell);
      });
      row.dataset.sortGroup = group.title;
      inventoryExcelList.append(row);
    });
  });
  sortTableBody("inventory-excel-list");
}

async function loadInventory() {
  if (activeAccount?.isDemo) {
    return loadDemoInventory();
  }
  if (inventoryLoadState === "loaded") {
    renderInventory();
    return;
  }
  if (inventoryLoadPromise) return inventoryLoadPromise;

  inventoryLoadState = "loading";
  renderInventory();
  inventoryLoadPromise = (async () => {
    try {
      const response = await fetch("PHP/inbentarioa.php", {
        credentials: "same-origin",
        cache: "no-store",
        headers: { Accept: "application/json" }
      });
      const result = await response.json();
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${result.error || "No se pudo cargar"}`);
      if (!Array.isArray(result.items)) throw new Error("La respuesta de inventario no contiene una lista válida");
      inventoryItems = result.items;
      inventoryLoadState = "loaded";
    } catch (error) {
      console.error("No se pudo cargar el inventario:", error);
      inventoryLoadState = "error";
    } finally {
      inventoryLoadPromise = null;
      renderInventory();
    }
  })();
  return inventoryLoadPromise;
}

async function loadDemoInventory() {
  try {
    let { response, result } = await requestSession("GET");
    if (response.ok && !result.authenticated) {
      ({ response, result } = await requestSession("POST", {
        username: "gugul",
        password: "67"
      }));
    }
    if (response.ok && result.authenticated && result.account) {
      activeAccount = result.account;
      sessionStorage.removeItem(demoSessionStorageKey);
      sessionStorage.setItem(serverSessionStorageKey, "1");
      updateSessionIdentity();
      return loadInventory();
    }
    if (response.status !== 404 && response.status !== 405) {
      throw new Error(`No se pudo iniciar la sesión PHP: HTTP ${response.status}`);
    }
  } catch (error) {
    const unavailablePhp = error instanceof TypeError
      || error.status === 404
      || error.status === 405
      || (error.status === 200 && error.cause instanceof SyntaxError);
    if (!unavailablePhp) {
      console.error("No se pudo comprobar la sesión PHP:", error);
      inventoryLoadState = "error";
      renderInventory();
      return;
    }
  }

  inventoryItems = demoInventoryFixture;
  inventoryLoadState = "loaded";
  renderInventory();
}

function renderInventory() {
  if (!inventoryList) return;
  const unitCount = inventoryItems.reduce((total, item) => total + item.kopurua, 0);
  const attentionCount = inventoryItems.filter((item) => item.egoera !== "ONDO").length;
  inventoryItemCount.textContent = String(inventoryItems.length);
  inventoryUnitCount.textContent = String(unitCount);
  inventoryAttentionCount.textContent = String(attentionCount);
  inventoryList.replaceChildren();

  if (inventoryLoadState === "loading" || inventoryLoadState === "error") {
    inventoryLoadMessage.textContent = translate(inventoryLoadState === "loading" ? "inventoryLoading" : "inventoryError");
    inventoryLoadMessage.hidden = false;
    return;
  }
  inventoryLoadMessage.hidden = true;

  if (inventoryItems.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    row.className = "empty-row";
    cell.colSpan = isDatabaseAdmin() ? 6 : 5;
    cell.textContent = translate("inventoryEmpty");
    row.append(cell);
    inventoryList.append(row);
    return;
  }

  const statusKeys = {
    ONDO: "inventoryStatusGood",
    ERABILI_EZINIK: "inventoryStatusUnusable",
    MANTENIMENDUAN: "inventoryStatusMaintenance",
    GALDUTAKO: "inventoryStatusLost"
  };
  inventoryItems.forEach((item) => {
    const row = document.createElement("tr");
    const statusKey = statusKeys[item.egoera];
    const status = document.createElement("span");
    status.className = `inventory-status ${statusKey ? statusKey.replace("inventoryStatus", "").toLowerCase() : "unknown"}`;
    status.textContent = statusKey ? translate(statusKey) : item.egoera;
    const reviewDate = item.azken_berrikuspena
      ? new Intl.DateTimeFormat(translate("dateLocale"), { dateStyle: "medium" }).format(new Date(item.azken_berrikuspena.replace(" ", "T")))
      : translate("inventoryNoReview");
    const values = [String(item.id), item.izena, String(item.kopurua), status, reviewDate];
    values.forEach((value) => {
      const cell = document.createElement("td");
      if (value instanceof HTMLElement) cell.append(value);
      else cell.textContent = value;
      row.append(cell);
    });
    if (item.azken_berrikuspena) row.cells[4].dataset.sortValue = item.azken_berrikuspena;
    if (isDatabaseAdmin()) {
      const manageCell = document.createElement("td");
      const manageButton = document.createElement("button");
      manageButton.type = "button";
      manageButton.className = "database-action-button";
      manageButton.dataset.manageEntity = "inventory";
      manageButton.dataset.manageId = String(item.id);
      manageButton.textContent = translate("manageRecord");
      manageCell.append(manageButton);
      row.append(manageCell);
    }
    inventoryList.append(row);
  });
  sortTableBody("inventory-list");
}

const managementErrorKeys = {
  duplicate_entry: "duplicateEntry",
  invalid_reference: "invalidReference",
  invalid_user_data: "invalidUserData",
  invalid_role: "invalidRole",
  password_required: "passwordRequired",
  invalid_inventory_data: "invalidInventoryData",
  center_required: "centerRequired",
  center_unavailable: "centerUnavailable",
  inventory_manager_required: "inventoryManagerRequired",
  record_not_found: "recordNotFound",
  database_access_denied: "managementFailed",
  database_not_found: "managementFailed",
  table_not_found: "managementFailed",
  database_connection_failed: "managementFailed"
};

async function sendManagementRequest(entity, action, data, id = null) {
  const response = await fetch("PHP/manage.php", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ entity, action, id, data })
  });
  let result;
  try {
    result = await response.json();
  } catch (error) {
    throw new Error("The management endpoint returned invalid JSON.", { cause: error });
  }
  if (!response.ok) {
    const error = new Error(`Management request failed with status ${response.status}.`);
    error.errorCode = result.errorCode;
    throw error;
  }
  return result;
}

function formManagementData(form) {
  const data = Object.fromEntries(new FormData(form));
  ["rol_id", "kopurua"].forEach((key) => {
    if (data[key] !== undefined && data[key] !== "") data[key] = Number(data[key]);
  });
  return data;
}

function managementErrorKey(error) {
  return managementErrorKeys[error.errorCode] || "managementFailed";
}

async function refreshManagedData(entity) {
  if (entity === "users") {
    usersLoadState = "idle";
    await loadUsers();
  } else {
    inventoryLoadState = "idle";
    await loadInventory();
  }
}

async function submitManagementForm(form) {
  if (!isDatabaseAdmin()) return;
  const entity = form.dataset.entity || (form === usersCreateForm ? "users" : "inventory");
  const action = form.dataset.recordId ? "update" : "create";
  const submitButton = form.querySelector('button[type="submit"]');
  const message = form === usersCreateForm
    ? usersCreateMessage
    : form === inventoryCreateForm
      ? inventoryCreateMessage
      : null;
  if (message) message.hidden = true;
  submitButton.disabled = true;

  try {
    await sendManagementRequest(entity, action, formManagementData(form), form.dataset.recordId ? Number(form.dataset.recordId) : null);
    if (message) {
      message.textContent = translate("createSuccess");
      message.hidden = false;
    } else {
      showToast(translate("updateSuccess"));
    }
    if (action === "create") {
      form.reset();
      populateRoleSelect(userCreateRole);
      const quantityInput = inventoryCreateForm.querySelector('[name="kopurua"]');
      if (quantityInput) quantityInput.value = "1";
    }
    await refreshManagedData(entity);
  } catch (error) {
    console.error(`No se pudo ${action === "create" ? "crear" : "actualizar"} el registro:`, error);
    const key = managementErrorKey(error);
    if (message) {
      message.textContent = translate(key);
      message.hidden = false;
    } else {
      showToast(translate(key));
    }
  } finally {
    submitButton.disabled = false;
  }
}

async function deleteManagedRecord(entity, id) {
  if (!isDatabaseAdmin()) return;
  const confirmationKey = entity === "users" ? "confirmDeleteUser" : "confirmDeleteInventory";
  if (!window.confirm(translate(confirmationKey))) return;
  try {
    await sendManagementRequest(entity, "delete", null, id);
    showToast(translate("deleteSuccess"));
    await refreshManagedData(entity);
  } catch (error) {
    console.error("No se pudo borrar el registro:", error);
    showToast(translate(managementErrorKey(error)));
  }
}

function toggleInlineEditor(entity, id) {
  const list = entity === "users" ? usersList : inventoryList;
  const record = (entity === "users" ? demoUsers : inventoryItems).find((item) => item.id === id);
  if (!record) return;
  list.querySelectorAll("[data-editor-row]").forEach((row) => row.remove());
  const row = [...list.querySelectorAll("[data-manage-id]")]
    .find((button) => Number(button.dataset.manageId) === id)
    ?.closest("tr");
  if (row) row.after(createInlineEditor(entity, record));
}

function renderBudgetPlan() {
  const plannedTotal = budgetPlan.reduce((total, group) => total + group.items.reduce((subtotal, item) => subtotal + item.amount, 0), 0);
  const remaining = budgetLimit - plannedTotal;
  const groupTotals = Object.fromEntries(budgetPlan.map((group) => [
    group.priority,
    group.items.reduce((total, item) => total + item.amount, 0)
  ]));
  document.querySelector("#budget-total-value").textContent = formatEuro(budgetLimit);
  document.querySelector("#budget-planned-value").textContent = formatEuro(plannedTotal);
  document.querySelector("#budget-remaining-value").textContent = formatEuro(remaining);
  document.querySelector("#budget-use-value").textContent = `${Math.round(plannedTotal / budgetLimit * 100)}%`;
  document.querySelector("#budget-chart-total").textContent = formatEuro(plannedTotal);
  document.querySelector("#budget-low-value").textContent = formatEuro(groupTotals.low);
  document.querySelector("#budget-medium-value").textContent = formatEuro(groupTotals.medium);
  document.querySelector("#budget-high-value").textContent = formatEuro(groupTotals.high);
  budgetPlan.forEach((group) => {
    document.querySelector(`#budget-bar-${group.priority}`).style.flexBasis = `${groupTotals[group.priority] / budgetLimit * 100}%`;
  });

  const groupsContainer = document.querySelector("#budget-priority-groups");
  groupsContainer.replaceChildren();
  budgetPlan.forEach((group) => {
    const section = document.createElement("section");
    section.className = `budget-priority-group priority-${group.priority}`;
    const heading = document.createElement("h4");
    heading.textContent = translate(`priority${group.priority[0].toUpperCase()}${group.priority.slice(1)}`);
    const list = document.createElement("ul");
    group.items.forEach((item) => {
      const row = document.createElement("li");
      const description = document.createElement("span");
      description.textContent = translate(item.label);
      const amount = document.createElement("strong");
      amount.textContent = formatEuro(item.amount);
      row.append(description, amount);
      list.append(row);
    });
    const total = document.createElement("p");
    total.className = "budget-priority-total";
    total.textContent = `${translate("budgetPriorityTotal")}: ${formatEuro(groupTotals[group.priority])}`;
    section.append(heading, list, total);
    groupsContainer.append(section);
  });
}

function toggleUserAttendance(userId) {
  if (activeAccount?.role !== "Admin" && activeAccount?.userId !== userId) return;
  const user = demoUsers.find((item) => item.id === userId);
  if (!user || ![1, 2, 3, 4].includes(user.rol_id)) return;
  const isInside = latestUserAttendance(userId)?.access_type === "entrada";
  const accessType = isInside ? "salida" : "entrada";
  addAccessRecord({
    identifier: user.emaila,
    full_name: `${user.izena} ${user.abizena}`,
    user_id: user.id,
    access_type: accessType
  });
  showToast(translate(accessType === "entrada" ? "attendanceEntrySaved" : "attendanceExitSaved"));
}

function updateDateTime() {
  const now = new Date();
  clock.textContent = new Intl.DateTimeFormat(translate("dateLocale"), {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  }).format(now);
  todayDate.textContent = new Intl.DateTimeFormat(translate("dateLocale"), {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  }).format(now);
}

function showDashboard() {
  coverScreen.classList.add("cover-exiting");
  dashboardScreen.hidden = false;
  dashboardScreen.classList.add("dashboard-entering");
  window.setTimeout(() => {
    coverScreen.hidden = true;
    dashboardScreen.classList.remove("dashboard-entering");
    dashboardScreen.focus({ preventScroll: true });
  }, 360);
}

async function requestSession(method, payload) {
  const response = await fetch("PHP/saioa.php", {
    method,
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: payload ? JSON.stringify(payload) : undefined
  });
  let result;
  try {
    result = await response.json();
  } catch (error) {
    const responseError = new Error("The session endpoint returned an invalid response.", { cause: error });
    responseError.status = response.status;
    throw responseError;
  }
  return { response, result };
}

function openAuthenticatedDashboard(account) {
  activeAccount = account;
  updateSessionIdentity();
  setDashboardView(activeAccount.role === "Inventory" ? "inventory" : "overview");
  showDashboard();
}

async function restoreSession() {
  let hasServerSession = false;
  try {
    const savedDemoAccount = sessionStorage.getItem(demoSessionStorageKey);
    if (savedDemoAccount) {
      const account = JSON.parse(savedDemoAccount);
      if (account?.username === "gugul" && account.role === "Admin" && account.isDemo === true) {
        openAuthenticatedDashboard(account);
        return;
      }
      sessionStorage.removeItem(demoSessionStorageKey);
      console.warn("Discarded an invalid stored demo session.");
    }
    hasServerSession = sessionStorage.getItem(serverSessionStorageKey) === "1";
  } catch (error) {
    console.error("Could not restore the browser demo session:", error);
    return;
  }
  if (!hasServerSession) return;

  try {
    const { response, result } = await requestSession("GET");
    if (!response.ok) {
      const error = new Error(`Session check failed with status ${response.status}.`);
      error.status = response.status;
      throw error;
    }
    if (result.authenticated) openAuthenticatedDashboard(result.account);
  } catch (error) {
    console.warn("Could not check the PHP session; the browser demo login remains available:", error);
  }
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = loginForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  loginError.hidden = true;
  loginPassword.removeAttribute("aria-invalid");
  const username = loginUsername.value.trim().toLowerCase();
  if (username === "gugul") {
    if (loginPassword.value !== "67") {
      loginError.textContent = translate("invalidLogin");
      loginError.hidden = false;
      loginPassword.setAttribute("aria-invalid", "true");
      loginPassword.focus();
      submitButton.disabled = false;
      return;
    }

    try {
      let serverAccount = null;
      try {
        const { response, result } = await requestSession("POST", {
          username,
          password: loginPassword.value
        });
        if (response.ok && result.account) {
          serverAccount = result.account;
        } else if (response.status !== 404 && response.status !== 405) {
          throw new Error(`Login failed with status ${response.status}.`);
        }
      } catch (error) {
        const unavailablePhp = error instanceof TypeError
          || error.status === 404
          || error.status === 405
          || (error.status === 200 && error.cause instanceof SyntaxError);
        if (!unavailablePhp) throw error;
      }

      loginPassword.value = "";
      if (serverAccount) {
        sessionStorage.removeItem(demoSessionStorageKey);
        sessionStorage.setItem(serverSessionStorageKey, "1");
        openAuthenticatedDashboard(serverAccount);
      } else {
        const demoAccount = { username: "gugul", role: "Admin", userId: null, isDemo: true };
        sessionStorage.removeItem(serverSessionStorageKey);
        sessionStorage.setItem(demoSessionStorageKey, JSON.stringify(demoAccount));
        openAuthenticatedDashboard(demoAccount);
      }
    } catch (error) {
      console.error("Could not sign in with the demo account:", error);
      loginError.textContent = translate("sessionUnavailable");
      loginError.hidden = false;
    } finally {
      submitButton.disabled = false;
    }
    return;
  }

  try {
    const { response, result } = await requestSession("POST", {
      username: loginUsername.value.trim(),
      password: loginPassword.value
    });
    if (response.status === 401) {
      loginError.textContent = translate("invalidLogin");
      loginError.hidden = false;
      loginPassword.setAttribute("aria-invalid", "true");
      loginPassword.focus();
      return;
    }
    if (!response.ok || !result.account) throw new Error(`Login failed with status ${response.status}.`);

    sessionStorage.setItem(serverSessionStorageKey, "1");
    loginPassword.value = "";
    openAuthenticatedDashboard(result.account);
  } catch (error) {
    console.error("Could not sign in:", error);
    loginError.textContent = translate("sessionUnavailable");
    loginError.hidden = false;
  } finally {
    submitButton.disabled = false;
  }
});

logoutButton.addEventListener("click", async () => {
  logoutButton.disabled = true;
  try {
    if (activeAccount?.isDemo) {
      sessionStorage.removeItem(demoSessionStorageKey);
    } else {
      const { response } = await requestSession("DELETE");
      if (!response.ok) throw new Error(`Logout failed with status ${response.status}.`);
      sessionStorage.removeItem(serverSessionStorageKey);
    }

    activeAccount = null;
    demoUsers = [];
    usersLoadState = "idle";
    inventoryItems = [];
    inventoryLoadState = "idle";
    updateSessionIdentity();
    dashboardScreen.hidden = true;
    dashboardScreen.classList.remove("dashboard-entering");
    coverScreen.hidden = false;
    coverScreen.classList.remove("cover-exiting");
    loginForm.reset();
    loginError.hidden = true;
    loginUsername.focus();
  } catch (error) {
    console.error("Could not sign out:", error);
    showToast(translate("logoutFailed"));
  } finally {
    logoutButton.disabled = false;
  }
});

loginForm.addEventListener("input", () => {
  loginError.hidden = true;
  loginPassword.removeAttribute("aria-invalid");
});

viewButtons.forEach((button) => button.addEventListener("click", () => setDashboardView(button.dataset.appView)));
document.querySelectorAll(".table-sort-button").forEach((button) => {
  button.addEventListener("click", () => {
    const bodyId = button.dataset.sortBody;
    const column = Number(button.dataset.sortColumn);
    const current = tableSortStates.get(bodyId);
    const direction = current?.column === column ? -current.direction : 1;
    tableSortStates.set(bodyId, { column, direction, type: button.dataset.sortType });
    sortTableBody(bodyId);
  });
});
inventoryModeButtons.forEach((button) => button.addEventListener("click", () => setInventoryMode(button.dataset.inventoryMode)));
inventoryRefreshButton.addEventListener("click", () => {
  inventoryLoadState = "idle";
  loadInventory();
});
userSearchInput.addEventListener("input", renderAttendanceUsers);
userRoleFilter.addEventListener("change", renderAttendanceUsers);
usersCreateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitManagementForm(usersCreateForm);
});
inventoryCreateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitManagementForm(inventoryCreateForm);
});
usersList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.manageEntity) {
    toggleInlineEditor(button.dataset.manageEntity, Number(button.dataset.manageId));
  } else if (button.dataset.deleteEntity) {
    deleteManagedRecord(button.dataset.deleteEntity, Number(button.dataset.deleteId));
  } else if (button.dataset.cancelEditor) {
    button.closest("[data-editor-row]")?.remove();
  } else if (button.dataset.attendanceUserId) {
    toggleUserAttendance(Number(button.dataset.attendanceUserId));
  }
});
inventoryList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.manageEntity) {
    toggleInlineEditor(button.dataset.manageEntity, Number(button.dataset.manageId));
  } else if (button.dataset.deleteEntity) {
    deleteManagedRecord(button.dataset.deleteEntity, Number(button.dataset.deleteId));
  } else if (button.dataset.cancelEditor) {
    button.closest("[data-editor-row]")?.remove();
  }
});
usersList.addEventListener("submit", (event) => {
  const form = event.target.closest("form[data-entity]");
  if (!form) return;
  event.preventDefault();
  submitManagementForm(form);
});
inventoryList.addEventListener("submit", (event) => {
  const form = event.target.closest("form[data-entity]");
  if (!form) return;
  event.preventDefault();
  submitManagementForm(form);
});

parkingDialogClose.addEventListener("click", () => parkingDialog.close());
parkingDialog.addEventListener("click", (event) => {
  if (event.target === parkingDialog) parkingDialog.close();
});
parkingReservationForm.addEventListener("submit", reserveSelectedParkingSpace);
parkingReleaseButton.addEventListener("click", releaseSelectedParkingSpace);
parkingPlateFormatInputs.forEach((input) => input.addEventListener("change", updateParkingPlateFormat));
parkingPlate.addEventListener("beforeinput", (event) => {
  if (!event.inputType.startsWith("insert") || event.isComposing) return;
  const insertedText = event.data ?? event.dataTransfer?.getData("text/plain");
  if (insertedText === null || insertedText === undefined) return;
  const start = parkingPlate.selectionStart;
  const end = parkingPlate.selectionEnd;
  const candidate = `${parkingPlate.value.slice(0, start)}${insertedText.toUpperCase()}${parkingPlate.value.slice(end)}`;
  const format = document.querySelector('input[name="parking-plate-format"]:checked').value;
  if (!partialPlatePatterns[format].test(candidate)) event.preventDefault();
});
parkingPlate.addEventListener("input", () => {
  const format = document.querySelector('input[name="parking-plate-format"]:checked').value;
  const uppercaseValue = parkingPlate.value.toUpperCase();
  if (partialPlatePatterns[format].test(uppercaseValue)) {
    parkingPlate.value = uppercaseValue;
    parkingPlate.dataset.lastValid = uppercaseValue;
  } else {
    parkingPlate.value = parkingPlate.dataset.lastValid || "";
  }
  parkingPlateError.hidden = true;
});
parkingFilters.forEach((button) => button.addEventListener("click", () => applyParkingFilter(button.dataset.parkingFilter)));
window.addEventListener("storage", (event) => {
  if ([parkingStorageKey, parkingReservationsStorageKey].includes(event.key)) refreshParkingFromStorage();
});

languageSelect.addEventListener("change", () => {
  applyLanguage(languageSelect.value);
  try {
    localStorage.setItem(languageStorageKey, currentLanguage);
  } catch {
    return;
  }
});

createParkingPlan();
applyParkingFilter("all");
applyLanguage(currentLanguage);
loadInventoryExcel();
window.setInterval(updateDateTime, 1000);
window.setInterval(refreshParkingFromStorage, 3000);
restoreSession();
