const fs = require('fs');
const { spawn, spawnSync } = require('child_process');
const Command = require('./Command.js');

class RunCommand extends Command {
  constructor(args) {
    super(args);
  }

  run() {
    const path = Command.getPath(this.args._[0]);
    const packagejson = require(`${path}/package.json`);

    if(!fs.existsSync(`${path}/node_modules`) && packagejson.dependencies) {
      console.info('Node modules not found. Installing missing dependencies...');
      spawnSync('npm', ['install'], {
        cwd: path,
        shell: true,
        stdio: 'inherit'
      });
    }

    console.info('Starting...');
    const npm = spawn('npm', ['run', 'start'], {
      cwd: path,
      shell: true,
      stdio: 'inherit'
    });
  }
}

module.exports = RunCommand
