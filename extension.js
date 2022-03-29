const vscode = require('vscode');
const window = vscode.window;
const workspace = vscode.workspace;

function activate(context) {
	var activeTextEditor = window.activeTextEditor;
	var configuration = workspace.getConfiguration('emaildev-utilities');

	init(configuration);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.helloWorld', async () => {
			console.log(configuration);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.toggleTables', async () => {
			// Toggle tables highlight
			configuration.update('isTablesEnabled', !configuration.get('isTablesEnabled'), true).then(() => {
				//
			});
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.toggleStyles', async () => {
			// Toggle styles highlight
			configuration.update('isStylesEnabled', !configuration.get('isStylesEnabled'), true).then(() => {
				//
			});
		})
	);

	vscode.window.onDidChangeActiveTextEditor((editor) => {
		// Activate when TextEditor change;
		activeTextEditor = editor;

		if (editor) update();
	});

	vscode.workspace.onDidChangeConfiguration(() => {
		// Activate when configuration is changed;
		configuration = workspace.getConfiguration('emaildev-utilities');

		init(configuration);
	});

	function init(configuration) {
		var trackTables = configuration.get('isTablesEnabled');
		var trackStyles = configuration.get('isStylesEnabled');
		var tablesTrackColor = configuration.get('tablesTrackColor');
		var stylesTrackColor = configuration.get('stylesTrackColor');
	}

	function update() {}
}

exports.activate = activate;
