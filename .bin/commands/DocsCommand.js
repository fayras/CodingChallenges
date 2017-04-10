const fs = require('fs');
const path = require('path');
const slug = require('slug');
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
      dest: Command.basePath + '/docs',
      app: {
        title: 'Coding Challenges Docs',
        server: 'github'
      },
      jsdoc: {
        excludePattern: '(docs)',
        access: 'all',
        sort: 'grouped',
        plugins: [
          "node_modules/jsdoc-strip-async-await"
        ]
      },
      template: {
        options: {
          title: 'Coding Challenges',
          symbolMeta: true,
          outline: 'tree',
          navItems: [
            {
              label: "Challenges",
              iconClass: "ico-book",
              items: []
            },
            {
              label: "GitHub",
              href: "https://github.com/fayras/CodingChallenges/",
              target: "_blank",
              iconClass: "ico-md ico-github"
            }
          ]
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
    let type = 'challenges';
    if(this.args.solutions) {
      type = 'solutions';
    }
    let _path = path.join(Command.basePath, type);
    let challenges = fs.readdirSync(_path);

    if(challenges.length !== 0) {
      challenges = challenges.filter(item => new RegExp(this.args._.join('|')).test(item));
    }

    let options = this.options;

    for(let challenge of challenges) {
      let hash = slug(challenge);
      options.src[0][hash] = [
        path.join(_path, challenge, '**', '*.js'),
        path.join(_path, challenge, 'README.md'),
        '!' + path.join(_path, challenge, 'node_modules', '**')
      ];

      options.template.options.navItems[0].items.push({
        label: challenge,
        href: '?api=' + hash
      });
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
    new SpawnCommand('node static_server.js ../docs', { cwd: path.join(Command.basePath, '.bin') }).run();
  }
}

module.exports = DocsCommand
