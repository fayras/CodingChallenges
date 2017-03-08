#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

function runChallenge(challenge, basePath) {
  let _path;
  if(challenge) {
    _path = fs.realpathSync(
      path.dirname(fs.realpathSync(basePath)) +
      '/../' +
      challenge
    );
  } else {
    _path = process.cwd();
  }

  const npm = spawn('npm', ['run', 'start'], {
    cwd: _path,
    shell: true,
    stdio: 'inherit'
  });
}

module.exports = runChallenge
