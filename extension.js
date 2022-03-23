// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	context.subscriptions.push(vscode.window.registerWebviewViewProvider("emaildev-utilities-explorer"))

	context.subscriptions.push(vscode.commands.registerCommand('emaildev-utilities.helloWorld', async () => {

	}));

	context.subscriptions.push(vscode.commands.registerCommand('emaildev-utilities.replaceLineHeight', async () => {

		const pairs = [
			new Pair(11, 14),
			new Pair(14, 14),
			new Pair(14, 17),
			new Pair(14, 21),
			new Pair(14, 22),
			new Pair(18, 24),
			new Pair(20, 28),
			new Pair(22, 26),
			new Pair(24, 28)
		]
		const answer = await vscode.window.showQuickPick(pairs.map(pair => pair.getValuesString()));

		pairs.forEach(pair => {
			if (pair.getValuesString().match(answer)) console.log(pair.getCalculatedValues(), pair.getCalculatedValuesString())
		})

	}));
}

// this method is called when your extension is deactivated
function deactivate() { }

class Pair {
	constructor(fontSize, lineHeight) {
		this.fontSize = fontSize;
		this.lineHeight = lineHeight;
	}

	getValuesString() {
		return `font-size: ${this.fontSize}px; line-height: ${this.lineHeight}px;`
	}

	getCalculatedValues() {
		const lineHeight = parseFloat((this.lineHeight / this.fontSize).toFixed(2));
		const lineHeightPercent = Math.floor(((this.lineHeight / this.fontSize) - 1) / 2 * 100 + 100);

		return { fontSize: this.fontSize, lineHeight: lineHeight, lineHeightPercent: lineHeightPercent }
	}

	getCalculatedValuesString() {
		return `font-size: ${this.getCalculatedValues().fontSize}px; line-height: ${this.getCalculatedValues().lineHeightPercent}%; line-height: ${this.getCalculatedValues().lineHeight}!important`;
	}


}

module.exports = {
	activate,
	deactivate
}