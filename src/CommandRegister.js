const vscode = require('vscode');

class CommandRegister {
	constructor(context) {
		this.context = context;
	}

	register(command, callback) {
		this.context.subscriptions.push(
			vscode.commands.registerCommand(`emaildev-utilities.${command}`, callback)
		);
	}

	registerAll(commands, callback) {
		commands.forEach(command => {
			this.register(command, () => callback(command))
		})
	}
}

module.exports = CommandRegister;
