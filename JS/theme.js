const themeRoot = document.documentElement;
const themeButtons = document.querySelectorAll("[data-theme-toggle]");
const themeStorageKey = "txurdinaga-theme";
let themeTransitionTimeout;

function applyTheme(theme, animate = false) {
  const selectedTheme = theme === "dark" ? "dark" : "light";
  const updateTheme = () => {
    themeRoot.dataset.theme = selectedTheme;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.content = selectedTheme === "dark" ? "#050607" : "#e3eae6";
    }

    themeButtons.forEach((button) => {
      const language = themeRoot.lang || "eu";
      const labels = {
        eu: { light: "Modu argia", dark: "Modu iluna" },
        es: { light: "Modo claro", dark: "Modo oscuro" },
        en: { light: "Light mode", dark: "Dark mode" }
      };
      const nextThemeLabel = selectedTheme === "dark" ? labels[language].light : labels[language].dark;
      button.setAttribute("aria-label", nextThemeLabel);
      button.title = nextThemeLabel;
      const label = button.querySelector("[data-theme-label]");
      if (label) label.textContent = nextThemeLabel;
    });
  };

  if (animate && typeof document.startViewTransition === "function") {
    document.startViewTransition(updateTheme);
  } else {
    if (animate) {
      clearTimeout(themeTransitionTimeout);
      themeRoot.classList.add("theme-transitioning");
      themeTransitionTimeout = window.setTimeout(() => {
        themeRoot.classList.remove("theme-transitioning");
      }, 850);
    }
    updateTheme();
  }
}

window.updateThemeLabels = () => applyTheme(themeRoot.dataset.theme);

let savedTheme = "light";
try {
  savedTheme = localStorage.getItem(themeStorageKey) || "light";
} catch {
  savedTheme = "light";
}
applyTheme(savedTheme);

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme = themeRoot.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
    try {
      localStorage.setItem(themeStorageKey, nextTheme);
    } catch {
      return;
    }
  });
});
