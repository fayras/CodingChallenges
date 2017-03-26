const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const inquirer = require('inquirer');
const Command = require('./Command.js');
const SpawnCommand = require('./SpawnCommand.js');

function escapeQuote(str) {
    return (str + '').replace("'", "'\"'\"'");
}

class PublishCommand extends Command {
  constructor(args) {
    super(args, {
      default: {
        'solution': false
      }
    });

    const slackPath = [__dirname, '..', '.slack.json'].join(path.sep);
    if(!fs.existsSync(slackPath)) {
      throw new Error('Slack config file not found.');
    }

    this.slackConfig = require(slackPath);
  }

  static get questions() {
    return [
      { type: 'input', name: 'challenge_name', message: 'Which challenge to publish' },
      { type: 'input', name: 'challenge_desc', message: 'Short description for the challenge' },
      { type: 'input', name: 'submission_date', message: 'When is the submission date' }
    ];
  }

  static get payloadTemplates() {
    return {
      master: `'payload={
          "attachments": [{
            "pretext": "Neue Programmieraufgabe verfügbar! <!channel>",
            "title": "{{ challenge_name }}",
            "title_link": "https://github.com/fayras/CodingChallenges/tree/master/challenges/{{ challenge_link }}",
            "text": "{{ challenge_desc }}",
            "footer": "Abgabedatum: {{ submission_date }}",
            "color": "#7CD197"
          }]
        }'`.replace(/[\n]/g, ''),

      solutions: `'payload={
          "attachments": [{
            "pretext": "Neue Lösung verfügbar! <!channel>",
            "title": "{{ challenge_name }}",
            "title_link": "https://github.com/fayras/CodingChallenges/tree/solutions/challenges/{{ challenge_link }}",
            "text": "{{ challenge_desc }}",
            "color": "#3AA3E3"
          }]
        }'`.replace(/[\n]/g, '')
    };
  }

  run() {
    inquirer.prompt(PublishCommand.questions)
      .then(answers => {
        const challengeName = fs.readdirSync(`${Command.basePath}/../challenges`)
          .filter(item => item.includes(answers.challenge_name))[0];

        if(!challengeName) {
          throw new Error('Could not find challenge.');
        }

        let payload = this.args.solution ? PublishCommand.payloadTemplates.solutions : PublishCommand.payloadTemplates.master;

        payload = payload
          .replace(/{{ challenge_link }}/g, escapeQuote(challengeName))
          .replace(/{{ challenge_name }}/g, escapeQuote(challengeName))
          .replace(/{{ challenge_desc }}/g, escapeQuote(answers.challenge_desc))
          .replace(/{{ submission_date }}/g, answers.submission_date);

        PublishCommand.postToSlack(payload, this.slackConfig.path);
      });
  }

  static postToSlack(payload, url) {
    new SpawnCommand(['curl', '-X', 'POST', '--data-urlencode', payload, url]).run();
  }
}

module.exports = PublishCommand
