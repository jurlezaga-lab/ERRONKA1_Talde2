const coverScreen = document.querySelector("#cover-screen");
const dashboardScreen = document.querySelector("#dashboard-screen");
const loginForm = document.querySelector("#login-form");
const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");
const loginError = document.querySelector("#login-error");
const clock = document.querySelector("#clock");
const todayDate = document.querySelector("#today-date");
const recordsBody = document.querySelector("#access-records");
const entryTotal = document.querySelector("#entry-total");
const exitTotal = document.querySelector("#exit-total");
const sessionUser = document.querySelector("#session-user");
const sessionRole = document.querySelector("#session-role");
const profileTitle = document.querySelector("#profile-title");
const recordCount = document.querySelector("#record-count");
const toast = document.querySelector("#toast");
const languageSelect = document.querySelector("#language-select");
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
    titleAdmin: "Administrazioa", titleTeacher: "Irakaslearen panela", titleStudent: "Ikaslearen panela",
    invalidLogin: "Erabiltzailea edo pasahitza ez da zuzena.", storageError: "Erregistroa pantaila honetan bakarrik dago eskuragarri.", accessSaved: "Sarbidea demo moduan erregistratu da.",
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
    titleAdmin: "Administración", titleTeacher: "Panel del profesorado", titleStudent: "Panel del alumnado",
    invalidLogin: "El usuario o la contraseña no son correctos.", storageError: "El registro solo está disponible en esta pantalla.", accessSaved: "Acceso registrado en modo demo.",
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
    titleAdmin: "Administration", titleTeacher: "Teacher dashboard", titleStudent: "Student dashboard",
    invalidLogin: "The username or password is incorrect.", storageError: "The record is only available on this screen.", accessSaved: "Access registered in demo mode.",
    recordCount: (count) => `${count} ${count === 1 ? "RECORD" : "RECORDS"}`, dateLocale: "en-GB", darkTheme: "Dark mode", lightTheme: "Light mode", pageTitle: "Access control | CIFP Txurdinaga LHII",
    viewParking: "View parking", parkingTitle: "Parking", parkingDescription: "Parking spaces, capacity and movement.", parkingLegendLabel: "Parking space status legend", parkingPlanLabel: "Top-down parking layout", spacesFree: "Free", spacesOccupied: "Occupied", filterAll: "All", parkingFiltersLabel: "Filter parking zones",
    spaceFree: "Free space", spaceOccupied: "Occupied space", zoneVisits: "Visitors", zoneOthers: "Others", zoneTeachers: "Teachers", zoneStudents: "Students", zoneCodeVisits: "VI", zoneCodeOthers: "OT", zoneCodeTeachers: "TE", zoneCodeStudents: "ST", otherSpacesLegendLabel: "Space types", otherCapacityMotorcycles: "5 motorcycles", otherCapacityElectric: "3 electric", otherCapacityAccessible: "2 accessible", otherTypeMotorcycle: "Motorcycle", otherTypeElectric: "Electric vehicle", otherTypeAccessible: "Accessible", parkingAisle: "Driving lane", buildingLabel: "Main building", schoolBuilding: "CIFP Txurdinaga LHII", parkingOccupancy: "Parking occupancy", parkingEntrance: "Entrance", parkingExit: "Exit", parkingRoad: "Circulation lane",
    parkingDialogEyebrow: "Parking · selected space", parkingReserveTitle: "Reserve space", parkingOccupiedTitle: "Space occupied", reserveParkingSpace: "Confirm reservation", reservedForPlate: "Reservation for license plate", releaseParkingSpace: "Release space", parkingReserved: (plate) => `Reservation confirmed for ${plate}.`, parkingReleased: "Space released.", unknownReservedPlate: "No license plate registered.", invalidParkingPlate: "Enter a valid license plate.", closeDialogLabel: "Close window", exitParking: "Exit parking", exitParkingLabel: "Return to dashboard",
    parkingSpaceLabel: (zone, number, status) => `${zone}, space ${number}, ${status}`, parkingCount: (free, occupied) => `${free} free · ${occupied} occupied`
  }
};
let toastTimeout;
let currentLanguage = "eu";
let activeAccount = null;
const demoAccounts = {
  admin: { password: "1234", role: "Admin" },
  irakasle: { password: "1234", role: "Teacher" },
  ikasle: { password: "1234", role: "Student" }
};

function translate(key) {
  return translations[currentLanguage][key];
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
  if (!activeAccount) return;
  sessionUser.textContent = activeAccount.username;
  sessionRole.textContent = translate(`role${activeAccount.role}`);
  profileTitle.textContent = translate(`title${activeAccount.role}`);
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
  entries.unshift({ ...record, full_name: "", created_at: new Date().toISOString() });
  saveEntries();
  renderDashboard();
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
  const today = dateKey(new Date());
  const entriesToday = sortedEntries.filter((entry) =>
    entry.access_type === "entrada" && dateKey(new Date(entry.created_at)) === today
  );
  const exitsToday = sortedEntries.filter((entry) =>
    entry.access_type === "salida" && dateKey(new Date(entry.created_at)) === today
  );
  const recentEntries = sortedEntries.slice(0, 8);

  entryTotal.textContent = String(entriesToday.length);
  exitTotal.textContent = String(exitsToday.length);
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

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = loginUsername.value.trim().toLowerCase();
  const account = demoAccounts[username];
  if (!account || loginPassword.value !== account.password) {
    loginError.textContent = translate("invalidLogin");
    loginError.hidden = false;
    loginPassword.setAttribute("aria-invalid", "true");
    loginPassword.focus();
    return;
  }

  loginError.hidden = true;
  loginPassword.removeAttribute("aria-invalid");
  activeAccount = { username, role: account.role };
  updateSessionIdentity();
  loginPassword.value = "";
  showDashboard();
});

loginForm.addEventListener("input", () => {
  loginError.hidden = true;
  loginPassword.removeAttribute("aria-invalid");
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
window.setInterval(updateDateTime, 1000);
window.setInterval(refreshParkingFromStorage, 3000);
