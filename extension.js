const utils = require('./src/utils');
const vscode = require('vscode');
const window = vscode.window;
const workspace = vscode.workspace;

function activate(context) {
	var activeTextEditor = window.activeTextEditor;
	var matches = [];
	var configuration = workspace.getConfiguration('emaildev-utilities');

	init(configuration);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.helloWorld', async () => {
			console.log(configuration);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.toggleTables', async () => {
			configuration.update('isTablesEnabled', !configuration.get('isTablesEnabled'), true)
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.toggleStyles', async () => {
			configuration.update('isStylesEnabled', !configuration.get('isStylesEnabled'), true)
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.toggleImgs', async () => {
			configuration.update('isImgsEnabled', !configuration.get('isImgsEnabled'), true)
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.enable', async () => {
			configuration.update('isEnabled', !configuration.get('isEnabled'), true)
		})
	);

	vscode.window.onDidChangeActiveTextEditor((editor) => {
		activeTextEditor = editor;

		if (editor) {
			configuration = workspace.getConfiguration('emaildev-utilities');

			init(configuration);
			update();
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeConfiguration(() => {
		configuration = workspace.getConfiguration('emaildev-utilities');

		init(configuration);
		update();
	}, null, context.subscriptions);

	workspace.onDidChangeTextDocument(function (event) {
		if (activeTextEditor && event.document === activeTextEditor.document) {
			configuration = workspace.getConfiguration('emaildev-utilities');
			init(configuration)
			update();
		}
	}, null, context.subscriptions);

	if (activeTextEditor) update();

	function init(configuration) {
		var isEnable = configuration.get('isEnabled');
		var trackTables = configuration.get('isTablesEnabled');
		var trackStyles = configuration.get('isStylesEnabled');
		var trackImgs = configuration.get('isImgsEnabled');
		var tablesTrackColor = configuration.get('tablesTrackColor');
		var stylesTrackColor = configuration.get('stylesTrackColor');
		var imgsTrackColor = configuration.get('imgsTrackColor');

		if (matches.length > 0) {
			matches.forEach(match => {
				match.type.dispose();
			})
		}

		var initialDecorations = [];

		if (isEnable && trackTables) initialDecorations.push({ type: window.createTextEditorDecorationType(tablesTrackColor), ranges: utils.searchForTables(activeTextEditor) });
		if (isEnable && trackStyles) initialDecorations.push({ type: window.createTextEditorDecorationType(stylesTrackColor), ranges: utils.searchForStyles(activeTextEditor) });
		if (isEnable && trackImgs) initialDecorations.push({ type: window.createTextEditorDecorationType(imgsTrackColor), ranges: utils.searchForImgs(activeTextEditor) });

		matches = initialDecorations;
	}

	function update() {
		matches.forEach(match => {
			activeTextEditor.setDecorations(match.type, match.ranges)
		})
	}
}

exports.activate = activate;
