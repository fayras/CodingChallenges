const fs = require('fs');
const { spawn } = require('child_process');
const inquirer = require('inquirer');
const Command = require('./Command.js');

function escapeQuote(str) {
    return (str + '').replace("'", "'\"'\"'");
}

class PublishCommand extends Command {
  constructor(args) {
    super(args);
  }

  static get questions() {
    return [
      { type: 'input', name: 'challenge_name', message: 'Which challenge to publish' },
      { type: 'input', name: 'challenge_desc', message: 'Short description for the challenge' },
      { type: 'input', name: 'submission_date', message: 'When is the submission date' }
    ];
  }

  static get payloadTemplate() {
    return `'payload={
      "attachments": [{
        "pretext": "Neue Programmieraufgabe verfügbar! <!channel>",
        "title": "{{ challenge_name }}",
        "title_link": "https://github.com/fayras/CodingChallenges/tree/master/challenges/{{ challenge_link }}",
        "text": "{{ challenge_desc }}",
        "footer": "Abgabedatum: {{ submission_date }}",
        "color": "#3AA3E3"
      }]
    }'`.replace(/[\n]/g, '');
  }

  run() {
    if(!fs.existsSync(__dirname + '/../../.slack.json')) {
      throw new Error('Slack config file not found.');
    }

    const slack = require(__dirname + '/../../.slack.json');
    inquirer.prompt(PublishCommand.questions)
      .then(answers => {
        const challengeName = fs.readdirSync(`${Command.basePath}/../challenges`)
          .filter(item => item.includes(answers.challenge_name))[0];

        if(!challengeName) {
          throw new Error('Could not find challenge.');
        }

        let payload = PublishCommand.payloadTemplate
          .replace(/{{ challenge_link }}/g, escapeQuote(challengeName))
          .replace(/{{ challenge_name }}/g, escapeQuote(challengeName))
          .replace(/{{ challenge_desc }}/g, escapeQuote(answers.challenge_desc))
          .replace(/{{ submission_date }}/g, answers.submission_date);

        spawn('curl', ['-X', 'POST', '--data-urlencode', payload, slack.path], {
          shell: true,
          stdio: 'inherit'
        });
      });
  }
}

module.exports = PublishCommand
