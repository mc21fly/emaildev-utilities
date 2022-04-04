'use strict';

const vscode = require('vscode');
const CommandRegister = require('./src/CommandRegister');
const { hello } = require('./src/util');

function activate(context) {
	const commands = new CommandRegister(context);

	commands.register('hello', () => hello(context))
} 

exports.activate = activate;
