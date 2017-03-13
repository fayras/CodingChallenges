const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

class Command {
  constructor(args, options = null) {
    this.args = minimist(args, options);
  }

  static get basePath() {
    return path.dirname(fs.realpathSync(process.argv[1])) + path.sep;
  }

  static getPath(challenge) {
    if(!challenge) {
      return process.cwd();
    }

    return fs.realpathSync(`${Command.basePath}/../${challenge}`);
  }

  parseArgs() {
    return minimist(this.args, this.options);
  }

  run() {
    throw new Error('Command is an abstract class. You have to override the run method.');
  }
}

module.exports = Command
