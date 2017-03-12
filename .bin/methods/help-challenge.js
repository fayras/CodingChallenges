#! /usr/bin/env node

function helpChallenge() {
  console.info(`
    Usage
      $ challenge <command> [options]

    Command
      new    Erstellt eine neue Aufgabe
      start  Startet eine Aufgabe
      run    Alias für start
      help   Zeigt Hilfe an

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

module.exports = helpChallenge
