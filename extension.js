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
		vscode.commands.registerCommand('emaildev-utilities.checkForRoles', async () => {
			let doc = vscode.window.activeTextEditor.document.getText();
			const numberOfTables = (doc.match(/<table[^>]*>/gm) || []).length;
			const numberOfTablesWithRoles = (doc.match(/<table[^>]*role="presentation"[^>]*>/gm) || []).length;
			const diff = numberOfTables - numberOfTablesWithRoles;

			if (numberOfTablesWithRoles < numberOfTables) {
				vscode.window.showWarningMessage(`Number of tables without role="presentation": ${diff}`);
			} else {
				vscode.window.showInformationMessage(`All tables have role="presentation" set.`);
			}
		})
	);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
