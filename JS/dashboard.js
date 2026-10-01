const coverScreen = document.querySelector("#cover-screen");
const dashboardScreen = document.querySelector("#dashboard-screen");
const loginForm = document.querySelector("#login-form");
const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");
const loginError = document.querySelector("#login-error");
const clock = document.querySelector("#clock");
const todayDate = document.querySelector("#today-date");
const accessForm = document.querySelector("#access-form");
const identifierInput = document.querySelector("#identifier");
const plateFormatHint = document.querySelector("#plate-format-hint");
const plateFormatInputs = document.querySelectorAll('input[name="plate-format"]');
const accessType = document.querySelector("#access-type");
const recordsBody = document.querySelector("#access-records");
const entryTotal = document.querySelector("#entry-total");
const exitTotal = document.querySelector("#exit-total");
const sessionUser = document.querySelector("#session-user");
const sessionRole = document.querySelector("#session-role");
const profileTitle = document.querySelector("#profile-title");
const recordCount = document.querySelector("#record-count");
const toast = document.querySelector("#toast");
const languageSelect = document.querySelector("#language-select");
const storageKey = "txurdinaga-demo-accesses";
const languageStorageKey = "txurdinaga-language";
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
    exitCardTitle: "Irteerak", exitCardDescription: "Gaur erregistratutako irteerak", dailyTotal: "Eguneko guztira",
    today: "Gaur", recentEntries: "Azken sarrerak", recentActivity: "Ikastetxeko azken mugimenduak",
    person: "Pertsona", identifier: "Matrikula", time: "Ordua", type: "Mota", status: "Egoera", footerBrand: "CIFP TXURDINAGA LHII · SARBIDE-KONTROLA",
    localDemo: "Demo lokala", emptyRecords: "Oraindik ez dago sarbiderik erregistratuta.", demoPerson: "Demo ikaslea", demoStatus: "Demoa",
    signedInAs: "Saioa irekita:", roleAdmin: "Administratzailea", roleTeacher: "Irakaslea", roleStudent: "Ikaslea",
    titleAdmin: "Administrazioa", titleTeacher: "Irakaslearen panela", titleStudent: "Ikaslearen panela",
    invalidLogin: "Erabiltzailea edo pasahitza ez da zuzena.", storageError: "Erregistroa pantaila honetan bakarrik dago eskuragarri.", accessSaved: "Sarbidea demo moduan erregistratu da.",
    recordCount: (count) => `${count} ERREGISTRO`, dateLocale: "eu-ES", darkTheme: "Modu iluna", lightTheme: "Modu argia", pageTitle: "Sarbide-kontrola | CIFP Txurdinaga LHII"
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
    exitCardTitle: "Salidas", exitCardDescription: "Salidas registradas hoy", dailyTotal: "Total del día",
    today: "Hoy", recentEntries: "Últimos accesos", recentActivity: "Últimos movimientos del centro",
    person: "Persona", identifier: "Matrícula", time: "Hora", type: "Tipo", status: "Estado", footerBrand: "CIFP TXURDINAGA LHII · CONTROL DE ACCESO",
    localDemo: "Demo local", emptyRecords: "Todavía no hay accesos registrados.", demoPerson: "Alumno/a de demo", demoStatus: "Demo",
    signedInAs: "Sesión iniciada:", roleAdmin: "Administrador", roleTeacher: "Profesor/a", roleStudent: "Alumno/a",
    titleAdmin: "Administración", titleTeacher: "Panel del profesorado", titleStudent: "Panel del alumnado",
    invalidLogin: "El usuario o la contraseña no son correctos.", storageError: "El registro solo está disponible en esta pantalla.", accessSaved: "Acceso registrado en modo demo.",
    recordCount: (count) => `${count} ${count === 1 ? "REGISTRO" : "REGISTROS"}`, dateLocale: "es-ES", darkTheme: "Modo oscuro", lightTheme: "Modo claro", pageTitle: "Control de acceso | CIFP Txurdinaga LHII"
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
    exitCardTitle: "Exits", exitCardDescription: "Exits registered today", dailyTotal: "Daily total",
    today: "Today", recentEntries: "Recent entries", recentActivity: "Latest school activity",
    person: "Person", identifier: "License plate", time: "Time", type: "Type", status: "Status", footerBrand: "CIFP TXURDINAGA LHII · ACCESS CONTROL",
    localDemo: "Local demo", emptyRecords: "No access records yet.", demoPerson: "Demo student", demoStatus: "Demo",
    signedInAs: "Signed in as:", roleAdmin: "Administrator", roleTeacher: "Teacher", roleStudent: "Student",
    titleAdmin: "Administration", titleTeacher: "Teacher dashboard", titleStudent: "Student dashboard",
    invalidLogin: "The username or password is incorrect.", storageError: "The record is only available on this screen.", accessSaved: "Access registered in demo mode.",
    recordCount: (count) => `${count} ${count === 1 ? "RECORD" : "RECORDS"}`, dateLocale: "en-GB", darkTheme: "Dark mode", lightTheme: "Light mode", pageTitle: "Access control | CIFP Txurdinaga LHII"
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

function updatePlateFormat() {
  const isCurrentFormat = document.querySelector('input[name="plate-format"]:checked').value === "current";
  const format = isCurrentFormat ? "current" : "old";
  identifierInput.pattern = isCurrentFormat ? platePatterns.current : platePatterns.old;
  identifierInput.maxLength = isCurrentFormat ? 7 : 10;
  identifierInput.placeholder = translate(isCurrentFormat ? "currentPlatePlaceholder" : "oldPlatePlaceholder");
  plateFormatHint.textContent = translate(isCurrentFormat ? "currentPlateHint" : "oldPlateHint");
  if (!partialPlatePatterns[format].test(identifierInput.value.toUpperCase())) identifierInput.value = "";
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
  updatePlateFormat();
  if (window.updateThemeLabels) window.updateThemeLabels(currentLanguage);
  updateSessionIdentity();
  updateDateTime();
  renderDashboard();
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

function saveEntries() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(entries));
  } catch {
    showToast(translate("storageError"), true);
  }
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
  avatar.textContent = initialsFrom(record.full_name);
  name.className = "person-name";
  name.textContent = record.full_name === "Demo ikaslea" ? translate("demoPerson") : record.full_name;
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
    identifierInput.focus({ preventScroll: true });
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

accessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!identifierInput.checkValidity()) {
    identifierInput.reportValidity();
    identifierInput.focus();
    return;
  }
  const identifier = identifierInput.value.trim().toUpperCase();
  if (!identifier) {
    identifierInput.focus();
    return;
  }

  entries.unshift({
    identifier,
    full_name: "Demo ikaslea",
    access_type: accessType.value,
    created_at: new Date().toISOString()
  });
  saveEntries();
  renderDashboard();
  accessForm.reset();
  accessType.value = "entrada";
  updatePlateFormat();
  identifierInput.focus();
  showToast(translate("accessSaved"));
});

plateFormatInputs.forEach((input) => input.addEventListener("change", updatePlateFormat));
identifierInput.addEventListener("beforeinput", (event) => {
  if (!event.inputType.startsWith("insert") || event.isComposing) return;

  const insertedText = event.data ?? event.dataTransfer?.getData("text/plain");
  if (insertedText === null || insertedText === undefined) return;

  const start = identifierInput.selectionStart;
  const end = identifierInput.selectionEnd;
  const candidate = `${identifierInput.value.slice(0, start)}${insertedText.toUpperCase()}${identifierInput.value.slice(end)}`;
  const format = document.querySelector('input[name="plate-format"]:checked').value;
  if (!partialPlatePatterns[format].test(candidate)) event.preventDefault();
});

identifierInput.addEventListener("input", () => {
  const format = document.querySelector('input[name="plate-format"]:checked').value;
  const uppercaseValue = identifierInput.value.toUpperCase();
  if (partialPlatePatterns[format].test(uppercaseValue)) {
    identifierInput.value = uppercaseValue;
  } else {
    identifierInput.value = "";
  }
});

languageSelect.addEventListener("change", () => {
  applyLanguage(languageSelect.value);
  try {
    localStorage.setItem(languageStorageKey, currentLanguage);
  } catch {
    return;
  }
});

applyLanguage(currentLanguage);
window.setInterval(updateDateTime, 1000);
