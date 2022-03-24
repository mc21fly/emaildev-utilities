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
		vscode.commands.registerCommand('emaildev-utilities.highlightStyles', async () => {
			trackers.disposeAll();
			const doc = vscode.window.activeTextEditor.document.getText();
			const attributes = (doc.match(/"[^"]*(?=font-size).*(?=line-height).*"/g) || []);

			attributes.forEach(() => trackers.add());
			trackers.set(attributes)

			vscode.window.showInformationMessage(`Numbers of styles with font-size and line-height combined: ${attributes.length}`)
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.highlightTables', async () => {
			trackers.disposeAll();
			const doc = vscode.window.activeTextEditor.document.getText();
			const allTables = (doc.match(/<table[^>]*>/gm) || []);
			const tablesWithAttributes = (doc.match(/<table[^>]*(?=.*?role="presentation")(?=.*?cellpadding="0")(?=.*?cellspacing="0")(?=.*?border="0")[^>]*>/gm) || []);
			const tablesWithoutAttributes = allTables.filter(table => !tablesWithAttributes.includes(table));

			if (tablesWithAttributes.length < allTables.length) {
				tablesWithoutAttributes.forEach(() => trackers.add());
				trackers.set(tablesWithoutAttributes)

				vscode.window.showWarningMessage(`Numbers of tables without needed attributes: ${allTables.length - tablesWithAttributes.length}`)
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
