#!/usr/bin/env node

const path = require('path');
const commander = require('commander');
const fuzzy = require('fuzzy');
const Storage = require('node-storage');
const {prompt} = require('inquirer'); // require inquirerjs library
const {executeCommit, saveHistory} = require('../src/scripts/commit'); // require self-defined functions

const $history = new Storage(path.join(__dirname + '/../src/data/history.json'))
const $type = require(path.join(__dirname + '/../src/data/type.json'));
const $latestTickets = $history.get('latestTickets')

// register additional prompt plugin for inquirer
prompt.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

commander
    .version('1.1.0')
    .option('-m, --commit', 'create commit message')
    .description('Write a commit message which is concurring with the AngulerJS git commit message convention');

function typeAutocomplete(answers, input) {
    input = input || '';
    return new Promise((resolve) => {
        const fuzzyResult = fuzzy.filter(input, $type);
        resolve(
          fuzzyResult.map(function(el) {
            return el.original;
          })
        );
    });
  }

function historyAutocomplete(answers, input) {
    $latestTickets.unshift("no code to add")
    input = input || '';
    return new Promise((resolve) => {
        const fuzzyResult = fuzzy.filter(input, $latestTickets);
        resolve(
          fuzzyResult.map(function(el) {
            return el.original;
          })
        );
    });
  }

const questions = [
    {
        type: 'autocomplete',
        name: 'type',
        message: 'Select TYPE',
        source: typeAutocomplete,
    },
    {
        type: 'input',
        name: 'scope',
        message: 'Enter SCOPE (f.e. "header" or "node")',
        validate: function(answer) {
            return answer ? true : 'Sorry, you need to enter a SCOPE here!';
        },
    },
    {
        type: 'autocomplete',
        name: 'ticket',
        message: 'Enter TICKET-CODE or use arrow keys and press TAB.',
        source: historyAutocomplete,
        suggestOnly: true,
        validate: function(answer) {
            return answer ? true : 'Sorry, you need to choose or enter your TICKET-CODE! Don\'t forget to PRESS TAB';
        },
    },
    {
        type: 'input',
        name: 'subject',
        message: 'Enter FULL DESCRIPTION in imperative ( “change” not “changed” ). Small first letter. No dot at the end.',
        validate: function(answer) {
            return answer ? true : 'Sorry, you need to enter a DESCRIPTION here!';
        },
    }
];

commander
    .command('commit')
    .alias('m')
    .description('Write a commit message which is concurring with the AngulerJS git commit message convention')
    .action(() => {
        prompt(questions)
            .then(answers => {
                executeCommit(answers)
                saveHistory(answers.ticket)
            })
    });

commander.parse(process.argv);
