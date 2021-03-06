const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

class Command {
  constructor(args = '', options = null) {
    if(typeof args === 'string') {
      args = args.split(' ');
    }

    this.args = minimist(args, options);
  }

  static get basePath() {
    return path.join(path.dirname(fs.realpathSync(process.argv[1])), '..');
  }

  static getPath(challenge) {
    if(!challenge) {
      return process.cwd();
    }

    return path.resolve(Command.basePath, challenge);
  }

  run() {
    throw new Error('Command is an abstract class. You have to override the run method.');
  }
}

module.exports = Command
