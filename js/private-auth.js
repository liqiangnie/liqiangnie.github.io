(function() {
  window.openProtectedCertificate = function(event, fileName) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    var password = prompt('Please enter the password to view this certificate:');

    if (password === null) {
      return false;
    }

    window.verifyPasswordHash(password)
      .then(function(isValid) {
        if (!isValid) {
          alert('Incorrect password.');
          return;
        }

        window.location.href = 'cetificate/' + encodeURIComponent(fileName);
      })
      .catch(function(error) {
        alert(error.message || 'Unable to verify password.');
      });

    return false;
  };
})();
