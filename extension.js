'use strict';

const vscode = require('vscode');
const window = vscode.window;
const workspace = vscode.workspace;
const CommandRegister = require('./src/CommandRegister');
const ConfigurationRegister = require('./src/ConfigurationRegister');
const { hello } = require('./src/util');

function activate(context) {
	const commands = new CommandRegister(context);
	const configuration = new ConfigurationRegister();

	commands.register('hello', () => console.log(configuration.get('isEnabled')))


	window.onDidChangeActiveTextEditor(editor => {
		//
	})

	workspace.onDidChangeConfiguration(() => {
		//
		configuration.setCurrentConfiguration(workspace.getConfiguration('emaildev-utilities'))
		console.log(configuration)
	})

	workspace.onDidChangeTextDocument(event => {
		//
	})
} 

exports.activate = activate;
