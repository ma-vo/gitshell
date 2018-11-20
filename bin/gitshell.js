#!/usr/bin/env node

const commander = require('commander');
const {prompt} = require('inquirer'); // require inquirerjs library
const {addCommitMsg} = require('../commit'); // require self-defined functions

commander
    .version('1.0.0')
    .description('Write a commit message which is concurring with the AngulerJS git commit message convention');

const questions = [
    {
        type: 'list',
        name: 'type',
        message: 'What type of commit is this?',
        choices: [
            'feat (feature)',
            'fix (bug fix)',
            'docs (documentation)',
            'style (formatting, missing semi colons, …)',
            'refactor',
            'test (when adding missing tests)',
            'chore (maintain)'
        ]
    },
    {
        type: 'input',
        name: 'scope',
        message: 'Enter a scope this commit applies to. (f.e. "header" or "node")'
    },
    {
        type: 'input',
        name: 'ticket',
        message: 'Enter a JIRA-Ticket-Code. (f.e. "JIRA-123") Leave empty if there is no code.'
    },
    {
        type: 'input',
        name: 'subject',
        message: 'Enter a full description in imperative ( “change” not “changed” ). Small first letter. No dot at the end.'
    }
];

commander
    .command('commit')
    .alias('m')
    .description('Write a commit message which is concurring with the AngulerJS git commit message convention')
    .action(() => {
        prompt(questions)
            .then(answers =>
                addCommitMsg(answers));
    });

commander.parse(process.argv);
