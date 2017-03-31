const Command = require('./Command.js');
const inquirer = require('inquirer');

class VersionCommand extends Command {
  constructor(args) {
    super(args);
    this.changes = [];
  }

  static get changePrompt() {
    return [{
      name: 'change',
      message: '-'
    }];
  }

  askForChange(answer) {
    if (!answer.change) {
      this.writeChangelog(this.changes);
      return;
    }

    this.changes.push(answer.change);
    return inquirer.prompt(VersionCommand.changePrompt)
      .then(answer => this.askForChange(answer));;
  }

  writeChangelog(changes) {
    console.log(changes);
  }

  run() {
    if(this.args._.length < 1) {
      throw new Error('Version parameter missing.');
    }

    let version = this.args._[0];
    console.info("\x1b[1m\nBitte Änderungen eingeben... \nJede Änderung mit Enter bestätigen, leere Eingabe beendet den Prompt.\n\x1b[0m");
    inquirer.prompt(VersionCommand.changePrompt)
      .then(answer => this.askForChange(answer));
  }
}

module.exports = VersionCommand
