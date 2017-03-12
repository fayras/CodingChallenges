#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const slug = require('slug');
const mkdirp = require('mkdirp');
const minimist = require('minimist');

function copyAndReplace(from, to, replacement) {
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

function createNewChallenge(userArgs, basePath) {
  const args = minimist(userArgs, {
    alias: {'n': 'name'}
  });

  let type = 'simple';
  if(args.electron) {
    type = 'electron';
  }
  if(args.p5) {
    type = 'p5';
  }

  if(!args.name) {
    throw new Error('Parameter "name" is required. Specified with --name="NAME_OF_CHALLENGE".');
  }

  basePath = path.dirname(fs.realpathSync(basePath));
  const templatePath = [basePath, 'templates', type, ''].join(path.sep);
  const targetPath = [basePath, '..', 'challenges', args.name, ''].join(path.sep);

  fs.readdir(templatePath, (err, files) => {
    if(err) {
      throw new Error(err.message);
    }

    for(const file of files) {
      copyAndReplace(templatePath + file, targetPath + file, args.name)
        .then(() => console.info(`File ${file} created.`));
    }
  });
}

module.exports = createNewChallenge
