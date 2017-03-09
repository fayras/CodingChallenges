#! /usr/bin/env node

const spawn = require('child_process').spawn;
const getChallengePath = require('./getChallengePath.js');

function runChallenge(challenge, basePath) {
  let path = getChallengePath(challenge, basePath);

  const npm = spawn('npm', ['run', 'start'], {
    cwd: path,
    shell: true,
    stdio: 'inherit'
  });
}

module.exports = runChallenge
