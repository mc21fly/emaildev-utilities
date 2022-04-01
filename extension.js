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
		vscode.commands.registerCommand('emaildev-utilities.wrapSelection', async () => {
			if (activeTextEditor) {
				const document = activeTextEditor.document;
				const selection = activeTextEditor.selection;

				const words = document.getText(selection);
				const withWhiteSpace = words.replaceAll(' ', '&nbsp;');
				const wrapped = `<span style="white-space: nowrap">${withWhiteSpace}</span>`;

				activeTextEditor.edit((editBuilder) => {
					editBuilder.replace(selection, wrapped);
				});
			}
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.toggleTables', async () => {
			configuration.update('isTablesEnabled', !configuration.get('isTablesEnabled'), true);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.toggleStyles', async () => {
			configuration.update('isStylesEnabled', !configuration.get('isStylesEnabled'), true);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.toggleImgs', async () => {
			configuration.update('isImgsEnabled', !configuration.get('isImgsEnabled'), true);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.enable', async () => {
			configuration.update('isEnabled', !configuration.get('isEnabled'), true);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.replaceLh', async () => {
			const document = activeTextEditor.document;
			const edit = new vscode.WorkspaceEdit();
			const exceptions = configuration.get('exceptions');

			const stylesRanges = utils.searchForStyles(activeTextEditor);

			stylesRanges.forEach((styleRange) => {
				const startIndex = document.offsetAt(styleRange._start);
				const endIndex = document.offsetAt(styleRange._end);
				const style = document.getText().slice(startIndex, endIndex);
				const computedStyle = utils.replaceValues(exceptions, style);

				edit.replace(document.uri, styleRange, computedStyle);
			});

			workspace.applyEdit(edit);
		})
	);

	vscode.window.onDidChangeActiveTextEditor(
		(editor) => {
			activeTextEditor = editor;

			if (editor) {
				configuration = workspace.getConfiguration('emaildev-utilities');

				init(configuration);
				update();
			}
		},
		null,
		context.subscriptions
	);

	vscode.workspace.onDidChangeConfiguration(
		() => {
			configuration = workspace.getConfiguration('emaildev-utilities');

			init(configuration);
			update();
		},
		null,
		context.subscriptions
	);

	workspace.onDidChangeTextDocument(
		function (event) {
			if (activeTextEditor && event.document === activeTextEditor.document) {
				configuration = workspace.getConfiguration('emaildev-utilities');
				init(configuration);
				update();
			}
		},
		null,
		context.subscriptions
	);

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
			matches.forEach((match) => {
				match.type.dispose();
			});
		}

		var initialDecorations = [];

		if (activeTextEditor && activeTextEditor.document.languageId === 'html') {
			if (isEnable && trackTables)
				initialDecorations.push({
					type: window.createTextEditorDecorationType(tablesTrackColor),
					ranges: utils.searchForTables(activeTextEditor),
				});
			if (isEnable && trackStyles)
				initialDecorations.push({
					type: window.createTextEditorDecorationType(stylesTrackColor),
					ranges: utils.searchForStyles(activeTextEditor),
				});
			if (isEnable && trackImgs)
				initialDecorations.push({
					type: window.createTextEditorDecorationType(imgsTrackColor),
					ranges: utils.searchForImgs(activeTextEditor),
				});
		}

		matches = initialDecorations;
	}

	function update() {
		matches.forEach((match) => {
			activeTextEditor.setDecorations(match.type, match.ranges);
		});
	}
}

exports.activate = activate;
