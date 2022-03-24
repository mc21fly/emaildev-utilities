const vscode = require('vscode');
const Tracker = require('./src/Tracker');
const Trackers = require('./src/Trackers');
// const Pair = require('./src/Pair');

function activate(context) {
	const trackers = new Trackers;

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.helloWorld', async () => {

		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.replaceLineHeight', async () => {
			console.log('This command calculate and replace line-height');
			// const pairs = [
			// 	new Pair(11, 14),
			// 	new Pair(14, 14),
			// 	new Pair(14, 17),
			// 	new Pair(14, 21),
			// 	new Pair(14, 22),
			// 	new Pair(18, 24),
			// 	new Pair(20, 28),
			// 	new Pair(22, 26),
			// 	new Pair(24, 28),
			// ];
			// const answer = await vscode.window.showQuickPick(pairs.map((pair) => pair.getValuesString()));

			// pairs.forEach((pair) => {
			// 	if (answer.match(pair.getValuesString()))
			// 		console.log(pair.getCalculatedValues(), pair.getCalculatedValuesString());
			// });
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.checkForAttributes', async () => {
			const doc = vscode.window.activeTextEditor.document.getText();
			const allTables = (doc.match(/<table[^>]*>/gm) || []);
			const tablesWithAttributes = (doc.match(/<table[^>]*(?=.*?role="presentation")(?=.*?cellpadding="0")(?=.*?cellspacing="0")(?=.*?border="0")[^>]*>/gm) || []);
			const tablesWithoutAttributes = allTables.filter(table => !tablesWithAttributes.includes(table));

			if (tablesWithAttributes.length < allTables.length) {
				const decission = await vscode.window.showWarningMessage(`Number of tables without needed attributes: ${allTables.length - tablesWithAttributes.length}`, "Dismiss", "Repair", "Track");
				if (decission.match("Repair")) {
					console.log("Repair tables")
				} else if (decission.match("Track")) {
					tablesWithoutAttributes.forEach(() => trackers.add());
					trackers.set(tablesWithoutAttributes)
				}
			} else {
				vscode.window.showInformationMessage(`All tables have needed attributes set.`);
			}
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.untrack', async () => {
			trackers.disposeAll();
		})
	)
}

function deactivate() { }

module.exports = {
	activate,
	deactivate,
};
