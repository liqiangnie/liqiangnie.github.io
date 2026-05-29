(function() {
  function unlockRows(passwordInputId, rowClassName, passwordBoxId) {
    var passwordInput = document.getElementById(passwordInputId);
    var password = passwordInput.value;

    window.verifyPasswordHash(password)
      .then(function(isValid) {
        if (!isValid) {
          alert('Incorrect password. Please try again.');
          return;
        }

        var hiddenRows = document.querySelectorAll('.' + rowClassName);
        hiddenRows.forEach(function(row) {
          row.classList.remove(rowClassName);
        });

        document.getElementById(passwordBoxId).style.display = 'none';
      })
      .catch(function(error) {
        alert(error.message || 'Unable to verify password.');
      })
      .finally(function() {
        passwordInput.value = '';
      });
  }

  window.checkPassword = function() {
    unlockRows('password', 'hidden_row', 'passwordInput');
  };

  window.checkPasswordone = function() {
    unlockRows('password1', 'hidden_row1', 'passwordInput1');
  };

  window.checkPasswordtwo = function() {
    unlockRows('password2', 'hidden_row2', 'passwordInput2');
  };

  window.checkPasswordthree = function() {
    unlockRows('password3', 'hidden_row3', 'passwordInput3');
  };

  window.checkPasswordfour = function() {
    unlockRows('password4', 'hidden_row4', 'passwordInput4');
  };
})();
