const fs = require('fs');
const Command = require('./Command.js');
const SpawnCommand = require('./SpawnCommand.js');

class RunCommand extends Command {
  constructor(args) {
    super(args);
  }

  run() {
    this.installDependencies();
    this.startChallenge();
  }

  installDependencies() {
    const path = Command.getPath(this.args._[0]);
    const packagejson = require(`${path}/package.json`);

    if(!fs.existsSync(`${path}/node_modules`) && packagejson.dependencies) {
      console.info('Node modules not found. Installing missing dependencies...');
      new SpawnCommand('npm install', {
        cwd: path,
        sync: true
      }).run();
    }
  }

  startChallenge() {
    const path = Command.getPath(this.args._[0]);
    console.info('Starting...');
    new SpawnCommand('npm run start', {
      cwd: path
    }).run();
  }
}

module.exports = RunCommand
