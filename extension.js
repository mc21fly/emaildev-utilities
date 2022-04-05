'use strict';

const vscode = require('vscode');
const window = vscode.window;
const workspace = vscode.workspace;

const CommandRegister = require('./src/CommandRegister');
const ConfigurationRegister = require('./src/ConfigurationRegister');
const DecorationRegister = require('./src/DecorationRegister');
const TextEditorRegister = require('./src/TextEditorRegister');

const util = require('./src/util');

function activate(context) {
	const commands = new CommandRegister(context);
	const configuration = new ConfigurationRegister(workspace);
	const textEditor = new TextEditorRegister(window);
	const decorations = new DecorationRegister();
	const toggleCommands = ['extension', 'tables', 'styles', 'imgs', 'alts'];

	commands.register('hello', () => {
		console.log(textEditor.getActiveTextEditor());
	});

	commands.registerAll(toggleCommands, (command) => configuration.toggle(`is${command[0].toUpperCase() + command.substring(1)}Enabled`))

	window.onDidChangeActiveTextEditor((editor) => {
		textEditor.setActiveTextEditor(editor);
		if (editor) decorations.update(configuration, textEditor)
	});

	workspace.onDidChangeConfiguration(() => {
		configuration.setCurrentConfiguration(workspace);
		decorations.update(configuration, textEditor)
	});

	workspace.onDidChangeTextDocument((event) => {
		const activeTextEditor = textEditor.getActiveTextEditor();
		if (activeTextEditor && event.document === activeTextEditor.document) {
			decorations.update(configuration, textEditor)
		}
	});

	if (textEditor.getActiveTextEditor()) decorations.update(configuration, textEditor);
}

exports.activate = activate;
