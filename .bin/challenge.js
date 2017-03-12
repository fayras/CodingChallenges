#! /usr/bin/env node

require('pretty-error').start().skipNodeFiles().skipPath('bootstrap_node.js');
const create = require('./methods/new-challenge.js');
const run = require('./methods/run-challenge.js');
const help = require('./methods/help-challenge.js');

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
    console.info(`
    \x1b[1m\x1b[41mError\x1b[0m: \x1b[1mUnknown command.\x1b[0m
    `);
    help();
}
