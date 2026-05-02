// LOGIN
function login() {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;

  if(user === "admin" && pass === "1234"){
    localStorage.setItem("login", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong login");
  }
}

// LOGOUT
function logout(){
  localStorage.removeItem("login");
  window.location.href = "index.html";
}

// PAGE SECURITY
if(window.location.pathname.includes("dashboard.html")){
  if(localStorage.getItem("login") !== "true"){
    window.location.href = "index.html";
  }
}

// MENU PAGE CHANGE
function showPage(page){
  let content = document.getElementById("content");

  if(page === "downline"){
    content.innerHTML = `
      <h3>Downline List</h3>
      <table>
        <tr><th>Name</th><th>Balance</th></tr>
        <tr><td>Zayan</td><td>0</td></tr>
        <tr><td>Mahamud3</td><td>427</td></tr>
      </table>
    `;
  }

  if(page === "account"){
    content.innerHTML = "<h3>My Account</h3><p>Balance: 1000</p>";
  }

  if(page === "reports"){
    content.innerHTML = "<h3>Reports</h3><p>No data</p>";
  }

  if(page === "bet"){
    content.innerHTML = "<h3>Bet List</h3><p>No bets</p>";
  }

  if(page === "live"){
    content.innerHTML = "<h3>Live Bets</h3><p>Running...</p>";
  }

  if(page === "risk"){
    content.innerHTML = "<h3>Risk Management</h3>";
  }

  if(page === "bank"){
    content.innerHTML = "<h3>Agent Banking</h3>";
  }
}
