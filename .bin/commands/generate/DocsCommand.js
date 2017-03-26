const fs = require('fs');
const path = require('path');
const Command = require('../Command.js');
const Docma = require('docma');

class DocsCommand extends Command {
  constructor(args) {
    super(args);
  }

  static get options() {
    return {
      src: [
        {
          '01': [
            `${__dirname}/../../../solutions/01 Goldilocks\' Bear Necessities/**/*.js`,
            `${__dirname}/../../../solutions/01 Goldilocks\' Bear Necessities/README.md`,
            `!${__dirname}/../../../solutions/01 Goldilocks\' Bear Necessities/node_modules/**`
          ],
          '02': [
            `${__dirname}/../../../solutions/02 It\'s super effective/**/*.js`,
            `!${__dirname}/../../../solutions/02 It\'s super effective/node_modules/**`,
          ]
        }
      ],
      dest: '/home/dimitri/Code/CodingChallenges/docs',
      app: {
        title: 'Coding Challenges Docs',
        server: 'github'
      },
      jsdoc: {
        excludePattern: '(docs)',
        plugins: [
          "node_modules/jsdoc-strip-async-await"
        ]
      },
      template: {
        options: {
          title: 'Coding Challenges',
          symbolMeta: true,
          outline: 'tree'
        }
      }
    };
  }

  run() {
    if(this.args._.length === 0) {
      Docma.create()
        .build(DocsCommand.options)
        .then(function (success) {
          console.log('Documentation is built successfully.');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}

module.exports = DocsCommand
