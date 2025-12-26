function register(){
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const age = document.getElementById("age").value;

  if(name.length < 3) return alert("Name too short");
  if(!email.includes("@")) return alert("Invalid email");
  if(username.length < 4) return alert("Username must be 4+ chars");
  if(password.length < 6) return alert("Password must be 6+ chars");
  if(age < 18) return alert("Age must be 18+");

  const user = { name, email, username, password, age };

  localStorage.setItem(username, JSON.stringify(user));
  alert("🎉 Registration Successful");
  location.href = "index.html";
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = localStorage.getItem(username);
  if (!data) return alert("User not found");

  const user = JSON.parse(data);
  if (user.password !== password) return alert("Wrong password");

  user.lastLogin = new Date().toLocaleString();
  localStorage.setItem(username, JSON.stringify(user));

  sessionStorage.setItem("activeUser", username);

  // 🔑 IMPORTANT: redirect AFTER session is set
  location.href = "dashboard.html";
}
