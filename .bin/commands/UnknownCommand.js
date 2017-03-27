const Command = require('./Command.js');
const HelpCommand = require('./HelpCommand.js');

class UnknownCommand extends Command {
  run() {
    console.info(`
    \x1b[1m\x1b[41mError\x1b[0m: \x1b[1mUnknown command.\x1b[0m
    `);
    new HelpCommand().run();
  }
}

module.exports = UnknownCommand
