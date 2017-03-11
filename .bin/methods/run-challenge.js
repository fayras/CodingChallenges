#! /usr/bin/env node

const fs = require('fs');
const { spawn, spawnSync } = require('child_process');
const getChallengePath = require('./getChallengePath.js');

function runChallenge(challenge, basePath) {
  let path = getChallengePath(challenge, basePath);

  if(!fs.existsSync(`${path}/node_modules`)) {
    console.log('node_modules not found. Installing missing dependencies...');
    spawnSync('npm', ['install'], {
      cwd: path,
      shell: true,
      stdio: 'inherit'
    });
  }

  console.log('Starting...');
  const npm = spawn('npm', ['run', 'start'], {
    cwd: path,
    shell: true,
    stdio: 'inherit'
  });
}

module.exports = runChallenge
