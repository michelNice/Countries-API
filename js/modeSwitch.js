function calculateSettingAsThemeString(localStorageTheme, systemSettingDark) {
  if (localStorageTheme !== null) return localStorageTheme; 

  return systemSettingDark.matches ? "dark" : "light";

}

function updateButton({ buttonEl, isDark }) {
  const newCta = isDark ? "Change to light theme" : "Change to dark theme";

  const iconClass = isDark ? "fas fa-moon" : "fas fa-sun";

  const label = isDark ? "Dark Mode" : "Light Mode";

  buttonEl.setAttribute("aria-label", newCta);

  buttonEl.querySelector("i").className = iconClass;

  buttonEl.querySelector("span").textContent = label;
}

function updateThemeOnHtmlEl(theme) {

  document.documentElement.setAttribute("data-theme", theme);
}

const button = document.querySelector("[data-theme-toggle]");

const localStorageTheme = localStorage.getItem("theme");

const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString(localStorageTheme, systemSettingDark);

updateThemeOnHtmlEl(currentThemeSetting);

updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });

button.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  
  updateThemeOnHtmlEl(newTheme);
  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  currentThemeSetting = newTheme;
});


