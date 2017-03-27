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

    const templatePath = path.join(Command.basePath, 'templates', type);
    const targetPath = path.join(Command.basePath, '..', 'challenges', this.args.name);

    fs.readdir(templatePath, (err, files) => {
      if(err) {
        throw new Error(err.message);
      }

      for(const file of files) {
        NewCommand.copyAndReplace(path.join(templatePath, file), path.join(targetPath, file), this.args.name);
        console.info(`File ${file} created.`);
      }
    });
  }

  static copyAndReplace(from, to, replacement) {
    let data = fs.readFileSync(from).toString();

    if (from.includes('package.json')) {
      data = data.replace(/{{ title }}/g, slug(replacement).toLowerCase());
    } else {
      data = data.replace(/{{ title }}/g, replacement);
    }

    mkdirp.sync(path.dirname(to));
    fs.writeFileSync(to, data);
  }
}

module.exports = NewCommand
