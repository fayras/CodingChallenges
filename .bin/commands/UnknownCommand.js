const Command = require('./Command.js');

class UnknownCommand extends Command {
  async run() {
    console.info(`
    \x1b[1m\x1b[41mError\x1b[0m: \x1b[1mUnknown command.\x1b[0m

    run 'challenge help' for help.
    `);
  }
}

module.exports = UnknownCommand
