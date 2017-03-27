const fs = require('fs');
const path = require('path');
const Command = require('./Command.js');
const SpawnCommand = require('./SpawnCommand.js');
const Docma = require('docma');

class DocsCommand extends Command {
  constructor(args) {
    super(args, {
      boolean: true,
      alias: {
        'g': 'generate',
        's': 'serve'
      }
    });
  }

  get options() {
    return {
      src: [{}],
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
    if(this.args.generate) {
      this.generate(this.args._);
    }

    if(this.args.serve) {
      this.serve();
    }
  }

  generate(challengeNumbers) {
    let _path = path.join(Command.basePath, '..', 'challenges');
    let challenges = fs.readdirSync(_path);

    if(challenges.length !== 0) {
      challenges = challenges.filter(item => new RegExp(this.args._.join('|')).test(item));
    }
    //console.log(this.args);
    //console.log(challenges);
    //return;
    //challeges = challenges.map(file => path.join(_path, file));

    let options = this.options;

    for(let challenge of challenges) {
      options.src[0][challenge] = [
        path.join(_path, challenge, '**', '*.js'),
        path.join(_path, challenge, 'README.md'),
        '!' + path.join(_path, challenge, 'node_modules', '**')
      ];
    }

    Docma.create().build(options)
      .then(function (success) {
        console.log('Documentation is built successfully.');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  serve() {
    new SpawnCommand('node static_server.js ../docs', { cwd: Command.basePath }).run();
  }
}

module.exports = DocsCommand
