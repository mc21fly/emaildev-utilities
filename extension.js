const vscode = require('vscode');
const Pair = require('./src/Pair');

function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.helloWorld', async () => {
			console.log('Hello world command!');
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.replaceLineHeight', async () => {
			const pairs = [
				new Pair(11, 14),
				new Pair(14, 14),
				new Pair(14, 17),
				new Pair(14, 21),
				new Pair(14, 22),
				new Pair(18, 24),
				new Pair(20, 28),
				new Pair(22, 26),
				new Pair(24, 28),
			];
			const answer = await vscode.window.showQuickPick(pairs.map((pair) => pair.getValuesString()));

			pairs.forEach((pair) => {
				if (answer.match(pair.getValuesString()))
					console.log(pair.getCalculatedValues(), pair.getCalculatedValuesString());
			});
		})
	);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
