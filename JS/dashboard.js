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
const inventoryItemCount = document.querySelector("#inventory-item-count");
const inventoryUnitCount = document.querySelector("#inventory-unit-count");
const inventoryAttentionCount = document.querySelector("#inventory-attention-count");
const inventoryDatabaseDescription = document.querySelector("#inventory-database-view [data-i18n='inventoryDatabaseDescription']");
const inventoryExcelList = document.querySelector("#inventory-excel-list");
const inventoryExcelSummary = document.querySelector("#inventory-excel-summary");
const inventoryExcelHeader = document.querySelector("#inventory-excel-header");
const inventoryExcelLoadMessage = document.querySelector("#inventory-excel-load-message");
let inventoryExcelData = null;
let inventoryExcelLoadPromise = null;
let inventoryExcelLoadState = "idle";
let inventoryExcelLoadError = null;
const demoModeNotice = document.querySelector("#demo-mode-notice");
const usersList = document.querySelector("#users-list");
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
    inventoryView: "Inbentarioa", inventoryEyebrow: "Txurdinaga · Inbentarioa", inventoryTitle: "Inbentarioa eta aurrekontua", inventoryDescription: "Kontsultatu ekipamendua eta planifikatu etorkizuneko beharrak.", inventoryModesLabel: "Inbentarioaren ikuspegiak", inventoryDatabaseTab: "Uneko inbentarioa · Datu-basea", inventoryBudgetTab: "Etorkizuneko aurrekontua · Demoa", inventoryDatabaseTitle: "Uneko ekipamendua", inventoryDatabaseDescription: "MySQL datu-basetik zuzenean kargatua.", inventoryRefresh: "Berritu", inventoryKinds: "Artikulu mota", inventoryUnits: "Guztizko unitateak", inventoryNeedsAttention: "Arreta behar dute", inventoryTableLabel: "Datu-baseko inbentario-zerrenda", inventoryIdLabel: "ID", inventoryNameLabel: "Artikulua", inventoryQuantityLabel: "Kopurua", inventoryStatusLabel: "Egoera", inventoryCenterLabel: "Zentroa", inventoryReviewLabel: "Azken berrikuspena", inventoryLoading: "Inbentarioa kargatzen...", inventoryError: "Ezin izan da inbentarioa kargatu. Egiaztatu PHP zerbitzaria, datu-basea eta inbentario-taula.", inventoryEmpty: "Ez dago inbentario-artikulurik datu-basean.", inventoryStatusGood: "Ondo", inventoryStatusUnusable: "Erabili ezinik", inventoryStatusMaintenance: "Mantentze-lanetan", inventoryStatusLost: "Galduta", inventoryNoReview: "Berrikuspen-datarik ez",
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
    inventoryView: "Inventario", inventoryEyebrow: "Txurdinaga · Inventario", inventoryTitle: "Inventario y presupuesto", inventoryDescription: "Consulta el equipamiento y planifica necesidades futuras.", inventoryModesLabel: "Vistas del inventario", inventoryDatabaseTab: "Inventario actual · Base de datos", inventoryBudgetTab: "Presupuesto futuro · Demo", inventoryDatabaseTitle: "Equipamiento actual", inventoryDatabaseDescription: "Cargado directamente desde la base de datos MySQL.", inventoryRefresh: "Actualizar", inventoryKinds: "Tipos de artículos", inventoryUnits: "Unidades totales", inventoryNeedsAttention: "Necesitan atención", inventoryTableLabel: "Lista de inventario de la base de datos", inventoryIdLabel: "ID", inventoryNameLabel: "Artículo", inventoryQuantityLabel: "Cantidad", inventoryStatusLabel: "Estado", inventoryCenterLabel: "Centro", inventoryReviewLabel: "Última revisión", inventoryLoading: "Cargando inventario...", inventoryError: "No se pudo cargar el inventario. Comprueba PHP, la base de datos y la tabla de inventario.", inventoryEmpty: "No hay artículos de inventario en la base de datos.", inventoryStatusGood: "Correcto", inventoryStatusUnusable: "Inutilizable", inventoryStatusMaintenance: "En mantenimiento", inventoryStatusLost: "Perdido", inventoryNoReview: "Sin fecha de revisión",
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
    inventoryView: "Inventory", inventoryEyebrow: "Txurdinaga · Inventory", inventoryTitle: "Inventory and budget", inventoryDescription: "Review equipment and plan for future needs.", inventoryModesLabel: "Inventory views", inventoryDatabaseTab: "Current inventory · Database", inventoryBudgetTab: "Future budget · Demo", inventoryDatabaseTitle: "Current equipment", inventoryDatabaseDescription: "Loaded directly from the MySQL database.", inventoryRefresh: "Refresh", inventoryKinds: "Item types", inventoryUnits: "Total units", inventoryNeedsAttention: "Need attention", inventoryTableLabel: "Database inventory list", inventoryIdLabel: "ID", inventoryNameLabel: "Item", inventoryQuantityLabel: "Quantity", inventoryStatusLabel: "Status", inventoryCenterLabel: "Center", inventoryReviewLabel: "Last review", inventoryLoading: "Loading inventory...", inventoryError: "Could not load inventory. Check PHP, the database and the inventory table.", inventoryEmpty: "There are no inventory items in the database.", inventoryStatusGood: "Good", inventoryStatusUnusable: "Unusable", inventoryStatusMaintenance: "Under maintenance", inventoryStatusLost: "Lost", inventoryNoReview: "No review date",
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
    inventoryExcelError: "Ezin izan da Excel fitxategia irakurri. Egiaztatu zerbitzaria eta InbentorioaE1T2.xlsx fitxategia.",
    inventoryExcelDescription: "InbentorioaE1T2.xlsx fitxategiko osagai eta zehaztapen guztiak.",
    excelOtherParts: "Beste osagai batzuk",
    excelGroupCount: "Taldeak",
    excelComponentCount: "Osagaiak",
    excelUnitCount: "Unitateak guztira"
  },
  es: {
    inventoryExcelLoading: "Cargando los datos del Excel...",
    inventoryExcelError: "No se pudo leer el Excel. Comprueba el servidor y el archivo InbentorioaE1T2.xlsx.",
    inventoryExcelDescription: "Todos los componentes y especificaciones del archivo InbentorioaE1T2.xlsx.",
    excelOtherParts: "Otros componentes",
    excelGroupCount: "Grupos",
    excelComponentCount: "Componentes",
    excelUnitCount: "Unidades en total"
  },
  en: {
    inventoryExcelLoading: "Loading Excel data...",
    inventoryExcelError: "Could not read the Excel file. Check the server and InbentorioaE1T2.xlsx.",
    inventoryExcelDescription: "All components and specifications from InbentorioaE1T2.xlsx.",
    excelOtherParts: "Other components",
    excelGroupCount: "Groups",
    excelComponentCount: "Components",
    excelUnitCount: "Total units"
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
  return inventoryExcelTranslations[currentLanguage]?.[key] ?? translations[currentLanguage][key];
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
    cell.colSpan = 8;
    cell.textContent = translate(usersLoadState === "loading" ? "loadingUsers" : usersLoadErrorKey);
    row.append(cell);
    usersList.append(row);
    return;
  }

  if (visibleUsers.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    row.className = "empty-row";
    cell.colSpan = 8;
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
    const centerName = user.zentroa_id === null
      ? "-"
      : `${user.zentroa_izena || ""}${user.zentroa_izena ? " · " : ""}${user.zentroa_id}`;
    const cells = [
      String(user.id),
      user.izena,
      user.abizena,
      user.emaila,
      user.rol_id === null ? roleName : `${user.rol_id} · ${roleName}`,
      centerName
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
    usersList.append(row);
  });
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

function parseExcelXml(xmlText, source) {
  const document = new DOMParser().parseFromString(xmlText, "application/xml");
  if (document.getElementsByTagName("parsererror").length) {
    throw new Error(`Invalid XML in ${source}`);
  }
  return document;
}

function zipEntries(buffer) {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  const directoryEndSignature = 0x06054b50;
  const directoryEntrySignature = 0x02014b50;
  const searchStart = Math.max(0, bytes.length - 0xffff - 22);
  let endOffset = -1;

  for (let offset = bytes.length - 22; offset >= searchStart; offset--) {
    if (view.getUint32(offset, true) === directoryEndSignature) {
      endOffset = offset;
      break;
    }
  }
  if (endOffset < 0) throw new Error("The Excel file has no ZIP directory");

  const entryCount = view.getUint16(endOffset + 10, true);
  let offset = view.getUint32(endOffset + 16, true);
  const entries = new Map();
  const decoder = new TextDecoder();
  for (let index = 0; index < entryCount; index++) {
    if (view.getUint32(offset, true) !== directoryEntrySignature) {
      throw new Error("The Excel file has an invalid ZIP directory");
    }
    const compression = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localOffset = view.getUint32(offset + 42, true);
    const name = decoder.decode(bytes.subarray(offset + 46, offset + 46 + nameLength));
    entries.set(name, { compression, compressedSize, localOffset });
    offset += 46 + nameLength + extraLength + commentLength;
  }

  return entries;
}

async function readExcelZipEntry(buffer, entries, path) {
  const entry = entries.get(path);
  if (!entry) throw new Error(`The Excel file is missing ${path}`);

  const view = new DataView(buffer);
  const nameLength = view.getUint16(entry.localOffset + 26, true);
  const extraLength = view.getUint16(entry.localOffset + 28, true);
  const dataOffset = entry.localOffset + 30 + nameLength + extraLength;
  const compressed = new Uint8Array(buffer, dataOffset, entry.compressedSize);
  let content;
  if (entry.compression === 0) {
    content = compressed;
  } else if (entry.compression === 8) {
    const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    content = new Uint8Array(await new Response(stream).arrayBuffer());
  } else {
    throw new Error(`Unsupported Excel ZIP compression: ${entry.compression}`);
  }

  return new TextDecoder("utf-8").decode(content);
}

async function parseExcelWorkbook(buffer) {
  const entries = zipEntries(buffer);
  const workbookXml = parseExcelXml(await readExcelZipEntry(buffer, entries, "xl/workbook.xml"), "xl/workbook.xml");
  const sheet = workbookXml.getElementsByTagNameNS("*", "sheet")[0];
  if (!sheet) throw new Error("The Excel workbook has no sheets");

  const relationshipId = sheet.getAttributeNS(
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "id"
  );
  const relationshipsXml = parseExcelXml(
    await readExcelZipEntry(buffer, entries, "xl/_rels/workbook.xml.rels"),
    "xl/_rels/workbook.xml.rels"
  );
  const relationship = [...relationshipsXml.getElementsByTagNameNS("*", "Relationship")]
    .find((item) => item.getAttribute("Id") === relationshipId);
  if (!relationship) throw new Error("The Excel worksheet relationship is missing");

  const target = relationship.getAttribute("Target").replaceAll("\\", "/");
  const sheetPathParts = target.startsWith("/") ? [] : ["xl"];
  target.split("/").forEach((part) => {
    if (!part || part === ".") return;
    if (part === "..") sheetPathParts.pop();
    else sheetPathParts.push(part);
  });
  const sheetPath = sheetPathParts.join("/");
  let sharedStrings = [];
  if (entries.has("xl/sharedStrings.xml")) {
    const sharedXml = parseExcelXml(
      await readExcelZipEntry(buffer, entries, "xl/sharedStrings.xml"),
      "xl/sharedStrings.xml"
    );
    sharedStrings = [...sharedXml.getElementsByTagNameNS("*", "si")]
      .map((item) => item.textContent || "");
  }

  const sheetXml = parseExcelXml(await readExcelZipEntry(buffer, entries, sheetPath), sheetPath);
  const rows = [...sheetXml.getElementsByTagNameNS("*", "row")].map((row) => {
    const cells = new Map();
    [...row.children].filter((cell) => cell.localName === "c").forEach((cell) => {
      const reference = cell.getAttribute("r").match(/^([A-Z]+)/);
      if (!reference) throw new Error("The Excel file contains an invalid cell reference");
      const column = [...reference[1]].reduce((index, letter) => index * 26 + letter.charCodeAt(0) - 64, 0);
      const value = cell.getElementsByTagNameNS("*", "v")[0]?.textContent || "";
      const cellText = cell.getAttribute("t") === "s"
        ? sharedStrings[Number(value)] || ""
        : cell.getAttribute("t") === "inlineStr"
          ? cell.getElementsByTagNameNS("*", "is")[0]?.textContent || ""
          : value;
      cells.set(column, cellText.replace(/\s+/g, " ").trim());
    });
    return cells;
  });

  const groups = [];
  let columns = [];
  let firstHeaderColumn = 3;
  let activeGroup = null;
  let quantityColumn = null;
  rows.forEach((cells) => {
    const hasComponentHeader = [...cells.values()].some((value) =>
      /osagaia|componente/i.test(value)
    );
    if (hasComponentHeader) {
      const populatedColumns = [...cells.entries()]
        .filter(([column, value]) => column >= 3 && value !== "")
        .map(([column]) => column);
      if (!populatedColumns.length) throw new Error("The Excel table has no column headers");
      const firstColumn = Math.min(...populatedColumns);
      const lastColumn = Math.max(...populatedColumns);
      firstHeaderColumn = firstColumn;
      columns = Array.from({ length: lastColumn - firstColumn + 1 }, (_, index) =>
        cells.get(firstColumn + index) || `Column ${firstColumn + index}`
      );
      groups.push({ title: (cells.get(2) || "Inventario").replace(/\s+/g, " ").trim(), items: [] });
      activeGroup = groups.length - 1;
      quantityColumn = columns.findIndex((column) => /kantitatea|cantidad|quantity/i.test(column));
      if (quantityColumn < 0) quantityColumn = null;
      return;
    }
    if (activeGroup === null || !columns.length) return;

    const values = columns.map((_, index) => cells.get(firstHeaderColumn + index) || "");
    if (values.some(Boolean)) groups[activeGroup].items.push(values);
  });

  if (!groups.length || !columns.length) throw new Error("No component tables were found in the Excel file");
  return { source: "InbentorioaE1T2.xlsx", columns, quantityColumn, groups };
}

async function loadInventoryExcel() {
  if (inventoryExcelLoadState === "loaded" || inventoryExcelLoadPromise) return inventoryExcelLoadPromise;

  inventoryExcelLoadState = "loading";
  inventoryExcelLoadError = null;
  renderInventoryExcel();
  inventoryExcelLoadPromise = fetch("PHP/inventario-excel.php", { cache: "no-store" })
    .then(async (response) => {
      if (response.status === 404) {
        const workbookResponse = await fetch("InbentorioaE1T2.xlsx", { cache: "no-store" });
        if (workbookResponse.status === 404) {
          const staticResponse = await fetch("data/inventario-excel.json", { cache: "no-store" });
          if (!staticResponse.ok) throw new Error(`HTTP ${staticResponse.status}`);
          return staticResponse.json();
        }
        if (!workbookResponse.ok) throw new Error(`HTTP ${workbookResponse.status}`);
        return parseExcelWorkbook(await workbookResponse.arrayBuffer());
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data.columns) || !Array.isArray(data.groups)) {
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
  inventoryExcelHeader.replaceChildren();

  if (inventoryExcelLoadState !== "loaded" || !inventoryExcelData) return;

  const items = inventoryExcelData.groups.flatMap((group) => group.items);
  const quantityIndex = Number.isInteger(inventoryExcelData.quantityColumn)
    ? inventoryExcelData.quantityColumn
    : -1;
  const totalUnits = items.reduce((total, item) => {
    const quantity = quantityIndex < 0 ? 1 : Number(String(item[quantityIndex] ?? "").replace(",", "."));
    return total + (Number.isFinite(quantity) ? quantity : 0);
  }, 0);
  [
    ["excelGroupCount", inventoryExcelData.groups.length],
    ["excelComponentCount", items.length],
    ["excelUnitCount", totalUnits.toLocaleString(currentLanguage)]
  ].forEach(([labelKey, valueText]) => {
    const card = document.createElement("article");
    const label = document.createElement("span");
    const value = document.createElement("strong");
    card.className = "glass-panel inventory-summary-card";
    label.textContent = translate(labelKey);
    value.textContent = valueText;
    card.append(label, value);
    inventoryExcelSummary.append(card);
  });

  inventoryExcelData.columns.forEach((column) => {
    const cell = document.createElement("th");
    cell.scope = "col";
    cell.textContent = column;
    inventoryExcelHeader.append(cell);
  });

  inventoryExcelData.groups.forEach((group) => {
    const groupRow = document.createElement("tr");
    const groupCell = document.createElement("th");
    groupRow.className = "excel-group-row";
    groupCell.scope = "rowgroup";
    groupCell.colSpan = inventoryExcelData.columns.length;
    groupCell.textContent = group.title.trim() === "Beste osagai batzuk"
      ? translate("excelOtherParts")
      : group.title;
    groupRow.append(groupCell);
    inventoryExcelList.append(groupRow);

    group.items.forEach((item) => {
      const row = document.createElement("tr");
      item.forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value || "—";
        row.append(cell);
      });
      inventoryExcelList.append(row);
    });
  });
}

async function loadInventory() {
  if (activeAccount?.isDemo) {
    inventoryItems = demoInventoryFixture;
    inventoryLoadState = "loaded";
    renderInventory();
    return;
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
    cell.colSpan = 6;
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
    const values = [String(item.id), item.izena, String(item.kopurua), status, item.zentroa_izena || String(item.zentroa_id), reviewDate];
    values.forEach((value) => {
      const cell = document.createElement("td");
      if (value instanceof HTMLElement) cell.append(value);
      else cell.textContent = value;
      row.append(cell);
    });
    inventoryList.append(row);
  });
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

    const demoAccount = { username: "gugul", role: "Admin", userId: null, isDemo: true };
    try {
      sessionStorage.setItem(demoSessionStorageKey, JSON.stringify(demoAccount));
      loginPassword.value = "";
      openAuthenticatedDashboard(demoAccount);
    } catch (error) {
      console.error("Could not save the browser demo session:", error);
      loginError.textContent = translate("demoSessionError");
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
inventoryModeButtons.forEach((button) => button.addEventListener("click", () => setInventoryMode(button.dataset.inventoryMode)));
inventoryRefreshButton.addEventListener("click", () => {
  inventoryLoadState = "idle";
  loadInventory();
});
userSearchInput.addEventListener("input", renderAttendanceUsers);
userRoleFilter.addEventListener("change", renderAttendanceUsers);
usersList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-attendance-user-id]");
  if (button) toggleUserAttendance(Number(button.dataset.attendanceUserId));
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
