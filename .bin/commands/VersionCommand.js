const Command = require('./Command.js');
const SpawnCommand = require('./SpawnCommand.js');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

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
    let file = path.join(Command.basePath, 'CHANGELOG.md');
    let data = fs.readFileSync(file).toString();
    let newVersion = require(path.join(Command.basePath, 'package.json')).version;
    let currentDate = moment().format('%d.%m.%Y');
    let newChanges = `<!-- CHANGES -->\n\n## ${newVersion} _- ${currentDate}_\n${changes.join('\n- ')}`;
    data = data.replace('<!-- CHANGES -->', newChanges);

    fs.writeFileSync(file, data);
  }

  run() {
    if(this.args._.length < 1 && this.args.changelog) {
      console.info("\x1b[1m\nBitte Änderungen eingeben... \nJede Änderung mit Enter bestätigen, leere Eingabe beendet den Prompt.\n\x1b[0m");
      inquirer.prompt(VersionCommand.changePrompt)
        .then(answer => this.askForChange(answer));
    } else {
      let version = this.args._[0];
      new SpawnCommand(`npm version ${version} -m "Upgrade to version %s"`, { cwd: Command.basePath }).run();
    }
  }
}

module.exports = VersionCommand
