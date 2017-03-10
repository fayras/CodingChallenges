const fs = require('fs');
const path = require('path');

module.exports = function(challenge, basePath) {
  if(!challenge) {
    return process.cwd();
  }
  
  const baseDir = path.dirname(fs.realpathSync(basePath));
  return fs.realpathSync(`${baseDir}/../${challenge}`);
}
