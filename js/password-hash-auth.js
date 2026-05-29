(function() {
  var passwordHash = '013daef607ae6021bb178b8211e2420a05ea94d21c5e43a6a9b8aab2528be073';

  function bytesToHex(buffer) {
    var bytes = new Uint8Array(buffer);
    var hex = [];

    bytes.forEach(function(byte) {
      hex.push(byte.toString(16).padStart(2, '0'));
    });

    return hex.join('');
  }

  window.verifyPasswordHash = function(password) {
    if (!window.crypto || !window.crypto.subtle) {
      return Promise.reject(new Error('This browser does not support password verification.'));
    }

    return window.crypto.subtle
      .digest('SHA-256', new TextEncoder().encode(password))
      .then(function(hashBuffer) {
        return bytesToHex(hashBuffer) === passwordHash;
      });
  };
})();
