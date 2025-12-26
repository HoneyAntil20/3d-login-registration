function logout() {
  // DO NOT TOUCH THEME
  sessionStorage.removeItem("activeUser");
  location.href = "index.html";
}

function checkSession() {
  if (!sessionStorage.getItem("activeUser")) {
    location.href = "index.html";
  }
}


function initTilt(id){
  const el=document.getElementById(id);
  document.addEventListener("mousemove",e=>{
    let x=(window.innerWidth/2-e.clientX)/25;
    let y=(window.innerHeight/2-e.clientY)/25;
    el.style.transform=`rotateY(${x}deg) rotateX(${y}deg)`;
  });
}
