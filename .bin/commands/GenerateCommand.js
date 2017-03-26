const fs = require('fs');
const path = require('path');
const Command = require('./Command.js');
const GenDocsCommand = require('./generate/DocsCommand.js');

class GenerateCommand extends Command {
  constructor(args) {
    super(args, {
      stopEarly: true
    });
  }

  run() {
    if(this.args._[0] === 'docs') {
      new GenDocsCommand(['--'].concat(this.args._.slice(1))).run();
    }
  }
}

module.exports = GenerateCommand
