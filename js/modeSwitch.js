export function initThemeToggle(buttonEl) {
  function calculateSettingAsThemeString(localStorageTheme, systemSettingDark) {
    if (localStorageTheme !== null) return localStorageTheme;
    return systemSettingDark.matches ? "dark" : "light";
  }

  function updateButton({ buttonEl, isDark }) {
    const newCta = isDark ? "Change to light theme" : "Change to dark theme";
    const iconClass = isDark ? "fas fa-sun" : "fas fa-moon";
    const label = isDark ? "Light Mode" : "Dark Mode";

    buttonEl.setAttribute("aria-label", newCta);
    buttonEl.querySelector("i").className = iconClass;
    buttonEl.querySelector("span").textContent = label;
  }

  function updateThemeOnHtmlEl(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

  let currentThemeSetting = calculateSettingAsThemeString(localStorageTheme, systemSettingDark);
  updateThemeOnHtmlEl(currentThemeSetting);
  updateButton({ buttonEl, isDark: currentThemeSetting === "dark" });

  buttonEl.addEventListener("click", () => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    updateThemeOnHtmlEl(newTheme);
    updateButton({ buttonEl, isDark: newTheme === "dark" });
    currentThemeSetting = newTheme;
  });
}

