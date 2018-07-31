const emoji = require('node-emoji');
const shell = require('shelljs');

/**
 * @function  [addCommitMsg]
 * @returns {String} Status
 */
const addCommitMsg = (commit) => {
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    }

    const commitMessage = `${filterTypeMsg(commit.type)}(${commit.scope}) ${commit.subject}`;
    console.info(emoji.get('rocket') + ' Added a new commit');
    console.info(commitMessage)

    shell.exec(`git commit -m "${commitMessage}"`);
};

/**
 * @function  [filterTypeMsg]
 * @returns {String} filteredChoice
 */
const filterTypeMsg = (choice) =>
    choice.replace(/ *\([^)]*\) */g, "");


module.exports = {  addCommitMsg };
