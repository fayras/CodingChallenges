const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const inquirer = require('inquirer');
const slack = require(__dirname + '/../../.slack.json');

const questions = [
  {
    type: 'input',
    name: 'challenge_name',
    message: 'Which challenge to publish'
  },
  {
    type: 'input',
    name: 'challenge_desc',
    message: 'Short description for the challenge'
  },
  {
    type: 'input',
    name: 'submission_date',
    message: 'When is the submission date'
  }
];

let payload = `'{
  "attachments": [{
		"pretext": "Neue Programmieraufgabe verfügbar! <!channel>",
    "title": "{{ challenge_name }}",
    "title_link": "https://github.com/fayras/CodingChallenges/tree/master/challenges/{{ challenge_name }}",
    "text": "{{ challenge_desc }}",
    "footer": "Abgabedatum: {{ submission_date }}"
    "color": "#3AA3E3"
  }]
}'`;

function escapeQuote(str) {
    return (str + '').replace("'", '%27');
}

function publishChallenge(basePath) {
  inquirer.prompt(questions)
    .then(function (answers) {
      basePath = path.dirname(fs.realpathSync(basePath));

      const challengeName = fs.readdirSync(`${basePath}/../challenges`)
        .filter(item => item.includes(answers.challenge_name))[0];


      payload = payload.replace(/[\s\n]/g, '')
        .replace(/{{challenge_name}}/g, escapeQuote(challengeName))
        .replace(/{{challenge_desc}}/g, escapeQuote(answers.challenge_desc))
        .replace(/{{submission_date}}/g, answers.submission_date);

      const curl = spawn('curl', ['-X', 'POST', '--data-urlencode', payload, slack.path], {
      //const curl = spawn('echo', [payload], {
          cwd: path,
          shell: true,
          stdio: 'inherit'
        });

    });
}

module.exports = publishChallenge
