const fs = require('fs');
const path = require('path');
const slug = require('slug');
const mkdirp = require('mkdirp');
const Command = require('./Command.js');

class NewCommand extends Command {
  constructor(args) {
    super(args, {
      alias: {'n': 'name'}
    });
  }

  run() {
    if(!this.args.name) {
      throw new Error('Parameter "name" is required. Specified with --name="NAME_OF_CHALLENGE".');
    }

    let type = 'simple';
    if(this.args.electron) {
      type = 'electron';
    }
    if(this.args.p5) {
      type = 'p5';
    }

    const templatePath = [Command.basePath, 'templates', type, ''].join(path.sep);
    const targetPath = [Command.basePath, '..', 'challenges', this.args.name, ''].join(path.sep);

    fs.readdir(templatePath, (err, files) => {
      if(err) {
        throw new Error(err.message);
      }

      for(const file of files) {
        NewCommand.copyAndReplace(templatePath + file, targetPath + file, this.args.name)
          .then(() => console.info(`File ${file} created.`));
      }
    });
  }

  static copyAndReplace(from, to, replacement) {
    return new Promise((resolve, reject) => {
      try {
        fs.readFile(from, 'utf8', (err,data) => {
          if (err) reject(err);

          let result;
          if(from.includes('package.json')) {
            result = data.replace(/{{ title }}/g, slug(replacement).toLowerCase());
          } else {
            result = data.replace(/{{ title }}/g, replacement);
          }

          mkdirp(path.dirname(to), function (err) {
              if (err) console.error(err);
              fs.writeFile(to, result, 'utf8', (err, buffer) => {
                 if (err) reject(err);
                 else resolve(buffer);
              });
          });
        });
      } catch(err) {
        reject(err);
      }
    });
  }
}

module.exports = NewCommand
