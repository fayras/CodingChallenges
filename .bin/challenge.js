#! /usr/bin/env node

const create = require('./new-challenge.js');
const run = require('./run-challenge.js');
const help = require('./help-challenge.js');

let userArgs = process.argv.slice(2);
let command = userArgs[0];

switch(command) {
  case 'new':
    create(userArgs.slice(1), process.argv[1]);
    break;
  case 'run':
  case 'start':
    run(userArgs[1], process.argv[1]);
    break;
  case 'help':
    help();
    break;
  default:
    console.log(`Unknown command. Run "challenge help" for help.`);
}
