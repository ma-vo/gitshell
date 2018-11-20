const shell = require('shelljs');
const notifier = require('node-notifier');
const path = require('path');

/**
 * @function  [addCommitMsg]
 * @returns {String} Status
 */
const addCommitMsg = (commit) => {
    if (!shell.which('git')) {
        const errorMsg = 'Sorry, this script requires git';
        errorHandler(errorMsg);
        shell.exit(1);
    }

    const commitMessage = `${filterTypeMsg(commit.type)}(${commit.scope}${commit.ticket ? ':' + commit.ticket : ''}) ${commit.subject}`;

    shell.exec(`git commit -m "${commitMessage}"`);
    if (!shell.error()) {
        notificationOk(commitMessage);  
    } else {
        const errorMsg = 'Sorry, an error occured.';
        errorHandler(errorMsg);
    }
};

/**
 * @function  [filterTypeMsg]
 * @returns {String} filteredChoice
 * @description removes unnecessary explanation string after listitem. f.e. "feat (feature)" -> "feat"
 */
const filterTypeMsg = (choice) =>
    choice.replace(/ *\([^)]*\) */g, "");

/**
 * @function  [notificationOk]
 * @returns {String} notification
 */
const notificationOk = (msg) =>
    notifier.notify(
        {
            title: 'Git Commit',
            message: msg,
            icon: path.join(__dirname, 'assets/git-ok.png'),
            sound: false, // Only Notification Center or Windows Toasters
            wait: false // Do not wait for user action
        }
    );

/**
 * @function  [notificationError]
 * @returns {String} notification
 */
const notificationError = (msg) =>
    notifier.notify(
        {
            title: 'Git Commit Error',
            message: msg,
            icon: path.join(__dirname, 'assets/git-error.png'),
            sound: true, // Only Notification Center or Windows Toasters
            wait: false // Do not wait for user action
        }
    );

/**
 * @function  [errorHandler]
 * @description simplifies error handling
 */
const errorHandler = (errorMsg) => {
    shell.echo(`${errorMsg} Look above for more details.`);
    notificationError(`${errorMsg} Look in console for more details.`);
}

module.exports = { addCommitMsg };
