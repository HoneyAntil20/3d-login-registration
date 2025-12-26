function loadDashboard() {
  const key = sessionStorage.getItem("activeUser");
  const user = JSON.parse(localStorage.getItem(key));

  document.getElementById("welcome").innerText =
    "Welcome, " + user.name;

  document.getElementById("profileName").innerText = user.name;
  document.getElementById("lastLogin").innerText =
    "Last login: " + (user.lastLogin || "First time");

  document.getElementById("avatar").innerText =
    user.name.charAt(0).toUpperCase();
}
