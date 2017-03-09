#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const slug = require('slug');
const mkdirp = require('mkdirp');

function copyAndReplace(from, to, replacement) {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(from, 'utf8', (err,data) => {
        if (err) reject(err);

        let result;
        if(from.includes('package.json')) {
          result = data.replace(/{{ title }}/g, slug(replacement));
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

function createNewChallenge(args, basePath) {
  let name = null;
  let isElectron = false;
  for(let i = 0; i < args.length; i++) {
    if(args[i].includes('--name=')) {
      name = args[i].replace('--name=', '');
      if (name.charAt(0) === '"' && name.charAt(name.length -1) === '"') {
        name = name.substr(1, name.length - 2);
      }
    }
    if(args[i] == '--electron') {
      isElectron = true;
    }
  }

  if(!name) {
    console.error('Parameter "name" is required. Specified with "--name=NAME_OF_CHALLENGE".');
    process.exit(1);
  }

  basePath = path.dirname(fs.realpathSync(basePath));
  let templatePath = [
    basePath,
    'templates',
    isElectron ? 'electron' : 'simple',
    ''
  ].join(path.sep);

  let targetPath = [basePath, '..', 'challenges', name, ''].join(path.sep);

  fs.readdir(templatePath, (err, files) => {
    if(err) {
      console.error( "Could not list the directory.", err );
      process.exit(1);
    }

    for(let i = 0; i < files.length; i++) {
      let filename = files[i];
      copyAndReplace(templatePath + filename, targetPath + filename, name)
        .then(() => console.log(`File ${filename} created.`));
    }
  });
}

module.exports = createNewChallenge
