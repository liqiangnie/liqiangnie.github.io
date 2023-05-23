function checkPassword() {
  var passwordInput = document.getElementById("password");
  var password = passwordInput.value;
  
  // Replace "password123" with your desired password
  if (password === "iLearn2016") {
    var hiddenRows = document.querySelectorAll(".hidden_row");
    hiddenRows.forEach(function(row) {
      row.classList.remove("hidden_row");
    });
    
    document.getElementById("passwordInput").style.display = "none";
  } else {
    alert("Incorrect password. Please try again.");
  }
  
  // Clear the password input field
  passwordInput.value = "";
}
