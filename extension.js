'use strict';

const vscode = require('vscode');
const window = vscode.window;
const workspace = vscode.workspace;

const CommandRegister = require('./src/CommandRegister');
const ConfigurationRegister = require('./src/ConfigurationRegister');
const TextEditorRegister = require('./src/TextEditorRegister');

const util = require('./src/util');

function activate(context) {
	const commands = new CommandRegister(context);
	const configuration = new ConfigurationRegister(workspace);
	const textEditor = new TextEditorRegister(window);
	const toggleCommands = ['extension', 'tables', 'styles', 'imgs', 'alts'];

	commands.register('hello', () => {
		console.log(textEditor);
	});

	toggleCommands.forEach((command) => {
		const capitalized = command[0].toUpperCase() + command.substring(1);
		commands.register(command, () => configuration.toggle(`is${capitalized}Enabled`));
	});

	window.onDidChangeActiveTextEditor((editor) => {
		textEditor.setActiveTextEditor(editor);
	});

	workspace.onDidChangeConfiguration(() => {
		configuration.setCurrentConfiguration(workspace);
	});

	workspace.onDidChangeTextDocument((event) => {
		const activeTextEditor = textEditor.getActiveTextEditor();
		if (activeTextEditor && event.document === activeTextEditor.document) {
			console.log('Change text!');
		}
	});
}

exports.activate = activate;
