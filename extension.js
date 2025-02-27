'use strict';

const vscode = require('vscode');
const window = vscode.window;
const workspace = vscode.workspace;

const CommandRegister = require('./src/CommandRegister');
const ConfigurationRegister = require('./src/ConfigurationRegister');
const DecorationRegister = require('./src/DecorationRegister');
const TextEditorRegister = require('./src/TextEditorRegister');

function activate(context) {
	const commands = new CommandRegister(context);
	const configuration = new ConfigurationRegister(workspace);
	const textEditor = new TextEditorRegister(window, configuration);
	const decorations = new DecorationRegister();
	const toggleCommands = ['extension', 'tables', 'styles', 'imgs', 'alts'];

	commands.register('supSelection', () => textEditor.replaceSelection('sup'));
	commands.register('spanSelection', () => textEditor.replaceSelection('span'));
	commands.register('zwjSelection', () => textEditor.replaceSelection('zwj'));
	commands.register('strongSelection', () => textEditor.replaceSelection('strong'));
	commands.register('aSelection', () => textEditor.replaceSelection('a'));
	commands.register('replaceAttributeValue', () => textEditor.replaceAttributeValue());
	commands.register('replaceLineHeight', () => textEditor.replaceLineHeight());

	commands.registerAll(toggleCommands, (command) =>
		configuration.toggle(`is${command[0].toUpperCase() + command.substring(1)}Enabled`)
	);

	window.onDidChangeActiveTextEditor((editor) => {
		textEditor.setActiveTextEditor(editor, configuration);
		if (editor) decorations.update(configuration, textEditor);
	});

	workspace.onDidChangeConfiguration(() => {
		configuration.setCurrentConfiguration(workspace);
		decorations.update(configuration, textEditor);
	});

	workspace.onDidChangeTextDocument((event) => {
		const activeTextEditor = textEditor.getActiveTextEditor();
		if (activeTextEditor && event.document === activeTextEditor.document) {
			decorations.update(configuration, textEditor);
		}
	});

	if (textEditor.getActiveTextEditor()) decorations.update(configuration, textEditor);
}

exports.activate = activate;
