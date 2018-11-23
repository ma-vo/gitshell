const notifier = require("node-notifier")
const path = require("path")
const shell = require("shelljs")
const Storage = require("node-storage")

/**
 * @function [buildCommitMessage]
 * @param {object} answers - answers of user for his commit message
 * @returns {String} commitMessage
 * @description builds commit message with provided answers from inquirer
 */
const buildCommitMessage = answers => {
	if (!shell.which("git")) {
		const errorMsg = "Sorry, this script requires git"
		errorHandler(errorMsg)
		shell.exit(1)
	}

	const _answerForType = filterTypeMsg(answers.type)
	const _answerForTicket = answers.ticket && answers.ticket !== "no code to add" ? `:${answers.ticket}` : ""
	const commitMessage = `${_answerForType}(${answers.scope}${_answerForTicket}) ${answers.subject}`
	return commitMessage
}

/**
 * @function [executeCommit]
 * @returns {String} Status
 * @description executes "git commit" with the entered answers as message
 */
const executeCommit = answers => {
	const commitMessage = buildCommitMessage(answers)
	shell.exec(`git commit -m "${commitMessage}"`)
	if (!shell.error()) {
		notificationOk(commitMessage)
	} else {
		const errorMsg = "Sorry, an error occured."
		errorHandler(errorMsg)
	}
}

/**
 * @function [filterTypeMsg]
 * @returns {String} filteredChoice
 * @description removes unnecessary explanation string after listitem. f.e. "feat (feature)" -> "feat"
 */
const filterTypeMsg = choice => choice.replace(/ *\([^)]*\) */g, "")

/**
 * @function [notificationOk]
 * @param {String} msg - error message which has to be shown
 * @returns {String} notification
 * @description show positiv notification
 */
const notificationOk = msg =>
	notifier.notify({
		title: "Git Commit",
		message: msg,
		icon: path.join(__dirname + "/../assets/git-ok.png"),
		sound: false, // Only Notification Center or Windows Toasters
		wait: false // Do not wait for user action
	})

/**
 * @function [notificationError]
 * @param {String} msg - error message which has to be shown
 * @returns {String} notification
 * @description show error notification
 */
const notificationError = msg =>
	notifier.notify({
		title: "Git Commit Error",
		message: msg,
		icon: path.join(__dirname + "/../assets/git-error.png"),
		sound: true, // Only Notification Center or Windows Toasters
		wait: false // Do not wait for user action
	})

/**
 * @function [errorHandler]
 * @param {String} errorMsg - error message which has to be shown
 * @description simplifies error handling to have a notification as well as a terminal info message
 */
const errorHandler = errorMsg => {
	shell.echo(`${errorMsg} Look above for more details.`)
	notificationError(`${errorMsg} Look in console for more details.`)
}

/**
 * @function [saveHistory]
 * @param {String} ticket - entered ticket-number
 * @description saves latest used ticket number in a history file
 */
const saveHistory = ticket => {
	const $history = new Storage(path.join(__dirname + "/../data/history.json"))
	let latestTickets = $history.get("latestTickets") || []

	if (ticket !== "no code to add") {
		let duplicateTicket = false

		latestTickets.forEach(latestTicket => {
			if (ticket === latestTicket) {
                latestTickets.splice(latestTicket-1, 1)
				duplicateTicket = true
			}
		})

		if (!duplicateTicket) {
			latestTickets.length >= 2
			latestTickets.pop()
		}

		latestTickets.unshift(ticket)
	}
	$history.put("latestTickets", latestTickets)
}

module.exports = { executeCommit, saveHistory }
