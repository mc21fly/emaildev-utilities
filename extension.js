const vscode = require('vscode');
const CodeTracker = require('./src/CodeTracker');

function activate(context) {
	let codeTracker = new CodeTracker(vscode.window.activeTextEditor);

	update();

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.helloWorld', async () => {

		})
	);

	vscode.window.onDidChangeActiveTextEditor(editor => {
		codeTracker = new CodeTracker(editor);
		update();
	})

	function update() {
		codeTracker.track('table', 'warning')
		codeTracker.track('style', 'danger')
	}

}

exports.activate = activate;
