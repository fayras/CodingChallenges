#! /usr/bin/env node

require('pretty-error').start().skipNodeFiles().skipPath('bootstrap_node.js');
const CommandDispatcher = require('./methods/CommandDispatcher.js');

const userArgs = process.argv.slice(2);
new CommandDispatcher(userArgs);
