const cookieNotice = document.querySelector("#cookie-notice");
const cookieNoticeError = cookieNotice.querySelector('[data-cookie-text="error"]');
const cookieDismissButton = cookieNotice.querySelector("[data-cookie-dismiss]");
const cookieNoticeCookie = `txurdinaga-cookie-notice-v2${window.location.port ? `-${window.location.port}` : ""}`;
const cookieNoticeTexts = {
  eu: {
    title: "Cookie-oharra",
    message: "Cookie tekniko bat erabiltzen dugu ohar hau ikusi duzula gogoratzeko. Ez dugu jarraipen-cookie-rik erabiltzen.",
    dismiss: "Ados",
    error: "Ezin izan da cookiea gorde. Egiaztatu nabigatzailearen cookie-ezarpenak."
  },
  es: {
    title: "Aviso de cookies",
    message: "Usamos una cookie técnica para recordar que has visto este aviso. No utilizamos cookies de seguimiento.",
    dismiss: "Entendido",
    error: "No se ha podido guardar la cookie. Revisa la configuración de cookies del navegador."
  },
  en: {
    title: "Cookie notice",
    message: "We use a technical cookie to remember that you have seen this notice. We do not use tracking cookies.",
    dismiss: "Got it",
    error: "The cookie could not be saved. Check your browser's cookie settings."
  }
};

function updateCookieNoticeLanguage() {
  const language = cookieNoticeTexts[document.documentElement.lang] ? document.documentElement.lang : "eu";
  const text = cookieNoticeTexts[language];

  cookieNotice.querySelector('[data-cookie-text="title"]').textContent = text.title;
  cookieNotice.querySelector('[data-cookie-text="message"]').textContent = text.message;
  cookieDismissButton.textContent = text.dismiss;
  cookieNoticeError.textContent = text.error;
}

function hasSeenCookieNotice() {
  try {
    return document.cookie.split("; ").some((cookie) => cookie === `${cookieNoticeCookie}=seen`);
  } catch {
    return false;
  }
}

function rememberCookieNotice() {
  try {
    const secureAttribute = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${cookieNoticeCookie}=seen; Max-Age=15552000; Path=/; SameSite=Lax${secureAttribute}`;
    return hasSeenCookieNotice();
  } catch {
    return false;
  }
}

updateCookieNoticeLanguage();
cookieNotice.hidden = hasSeenCookieNotice();

new MutationObserver(updateCookieNoticeLanguage).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["lang"]
});

cookieDismissButton.addEventListener("click", () => {
  if (!rememberCookieNotice()) {
    cookieNoticeError.hidden = false;
    return;
  }

  cookieNotice.hidden = true;
});
