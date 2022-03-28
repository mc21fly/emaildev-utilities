const vscode = require('vscode');
const utils = require('./src/utils');

const window = vscode.window;
const workspace = vscode.workspace;

function activate(context) {
	let activeEditor = window.activeTextEditor;
	const settings = workspace.getConfiguration('emaildev-utilities');
	let decorations = [];
	let trackingOptions, ranges, decoratorTypes;

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.helloWorld', async () => {
			//
			const a = await update();

			console.log(a);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.highlightStyles', async () => {
			// Highlight styles with font-size in px and line-height in px;
			toggleTrackStyles();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.highlightTables', async () => {
			// Highlight tables without needed attributes (role, cellapdding, cellspacing, border)
			toggleTrackTables();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('emaildev-utilities.untrack', async () => {
			//
		})
	);

	window.onDidChangeActiveTextEditor(
		(editor) => {
			activeEditor = editor;
			decorations = [];
		},
		null,
		context.subscriptions
	);

	function setOptions() {
		const trackTable = settings.get('trackTables');
		const trackStyle = settings.get('trackStyles');
		console.log(trackingOptions);
		trackingOptions = [trackTable ? 'table' : null, trackStyle ? 'style' : null];
	}

	function getRanges() {
		ranges = trackingOptions.map((o) => {
			if (o !== null) {
				return utils.getRanges(o);
			}

			return [];
		});
	}

	function getDecorationTypes() {
		decoratorTypes = trackingOptions.map((o) => {
			if (o !== null) {
				return utils.getDecorations(o);
			}

			return [];
		});
	}

	function update() {
		setOptions();
		getRanges();
		getDecorationTypes();

		trackingOptions.forEach((o) => {
			const decoratinType = decoratorTypes.find((d) => d.type === o);
			const range = ranges.find((r) => r.type === o);
			window.setDecorations(decoratinType, range);
		});
	}

	function toggleTrackTables() {
		const dangerDecorationStyle = settings.get('dangerColor');

		const containDecoration = decorations.some((v) => v.id === 'table');

		if (containDecoration) {
			const index = decorations.findIndex((v) => v.id === 'table');

			decorations[index].decoratinType.dispose();
			decorations.splice(index, 1);
		} else {
			const tablesRanges = utils.getRanges('table');
			const decoration = window.createTextEditorDecorationType(dangerDecorationStyle);
			decorations.push({ id: 'table', decoratinType: decoration, range: tablesRanges });

			const index = decorations.findIndex((v) => v.id === 'table');

			vscode.window.showInformationMessage(
				`Tables without needed attributes: ${decorations[index].range.length}`
			);
		}

		update();
	}

	function toggleTrackStyles() {}

	function update() {
		decorations.forEach((v) => {
			activeEditor.setDecorations(v.decoratinType, v.range);
		});
	}
}

exports.activate = activate;
