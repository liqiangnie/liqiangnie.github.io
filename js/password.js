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

function checkPasswordone() {
  var passwordInput = document.getElementById("password1");
  var password = passwordInput.value;
  
  // Replace "password123" with your desired password
  if (password === "iLearn2016") {
    var hiddenRows = document.querySelectorAll(".hidden_row1");
    hiddenRows.forEach(function(row) {
      row.classList.remove("hidden_row1");
    });
    
    document.getElementById("passwordInput1").style.display = "none";
  } else {
    alert("Incorrect password. Please try again.");
  }
  
  // Clear the password input field
  passwordInput.value = "";
}

function checkPasswordtwo() {
  var passwordInput = document.getElementById("password2");
  var password = passwordInput.value;
  
  // Replace "password123" with your desired password
  if (password === "iLearn2016") {
    var hiddenRows = document.querySelectorAll(".hidden_row2");
    hiddenRows.forEach(function(row) {
      row.classList.remove("hidden_row2");
    });
    
    document.getElementById("passwordInput2").style.display = "none";
  } else {
    alert("Incorrect password. Please try again.");
  }
  
  // Clear the password input field
  passwordInput.value = "";
}

function checkPasswordthree() {
  var passwordInput = document.getElementById("password3");
  var password = passwordInput.value;
  
  // Replace "password123" with your desired password
  if (password === "iLearn2016") {
    var hiddenRows = document.querySelectorAll(".hidden_row3");
    hiddenRows.forEach(function(row) {
      row.classList.remove("hidden_row3");
    });
    
    document.getElementById("passwordInput3").style.display = "none";
  } else {
    alert("Incorrect password. Please try again.");
  }
  
  // Clear the password input field
  passwordInput.value = "";
}

