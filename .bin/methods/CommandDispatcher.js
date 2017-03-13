const fs = require('fs');

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

class CommandDispatcher {
  constructor(args) {
    let commandName = capitalize(args[0]);

    // TODO: Hack für Aliasse irgendwie besser umsetzen!
    if(commandName === 'Start') {
      commandName = 'Run';
    }

    let commandPath = `${__dirname}/${commandName}Command.js`;
    if(!fs.existsSync(commandPath)) {
      commandPath = `${__dirname}/UnknownCommand.js`;
    }

    const Command = require(commandPath);
    new Command(args.slice(1)).run();
  }
}

module.exports = CommandDispatcher