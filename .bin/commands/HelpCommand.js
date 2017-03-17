const Command = require('./Command.js');

class HelpCommand extends Command {
  run() {
    console.info(`
    Usage
      $ challenge <command> [options]

    Command
      new      Erstellt eine neue Aufgabe
      start    Startet eine Aufgabe
      run      Alias für start
      publish  Postet eine Nachricht an Slack via curl
      help     Zeigt Hilfe an

    Options
      -n, --name  Der Name der Aufgabe, wenn eine erstellt wird
      --electron  Benutzt die 'electron'-Vorlage
      --p5        Benutzt die 'p5'-Vorlage
      path        Der Pfad zur Aufgabe für start/run

    Examples
      $ challenge new -n "Neue Aufgabe" --electron
      $ challenge start "challenges/Neue Aufgabe"
    `);
  }
}

module.exports = HelpCommand
