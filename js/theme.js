const THEMES = ["dark", "cyber", "neon"];

function getActiveUser() {
  return sessionStorage.getItem("activeUser");
}

function applyTheme(theme) {
  document.body.classList.remove(...THEMES);
  document.body.classList.add(theme);
}

function setTheme(theme) {
  const user = getActiveUser();
  if (!user) return;

  localStorage.setItem(`theme_${user}`, theme);
  applyTheme(theme);
}

function loadTheme() {
  const user = getActiveUser();
  if (!user) return;

  const savedTheme = localStorage.getItem(`theme_${user}`) || "dark";
  applyTheme(savedTheme);

  // Sync dropdown UI
  const selector = document.getElementById("themeSelect");
  if (selector) selector.value = savedTheme;
}
