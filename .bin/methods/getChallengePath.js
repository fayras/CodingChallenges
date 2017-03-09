const fs = require('fs');
const path = require('path');

module.exports = function(challenge, basePath) {
  if(!challenge) {
    return process.cwd();
  }

  return fs.realpathSync(
    path.dirname(fs.realpathSync(basePath)) +
    '/../' +
    challenge
  );
}
