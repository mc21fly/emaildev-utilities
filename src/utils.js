let vscode = require('vscode');
let window = vscode.window;
let activeEditor = window.activeTextEditor;

function getRanges(element) {
	if (element.match('table')) {
		const tables = getTablesWithoutAttributes();
		const ranges = rangesOfElements(tables);

		return { type: 'table', ranges: ranges };
	}

	if (element.match('style')) {
		const styles = getStyles();
		const ranges = rangesOfElements(styles);

		return { type: 'style', ranges: ranges };
	}
}

function getDecorations(element) {
	if (element.match('table'))
		return { type: 'table', decoration: window.createTextEditorDecorationType({ backgroundColor: 'red' }) };
	if (element.match('style'))
		return {
			type: 'style',
			decoration: window.createTextEditorDecorationType({ backgroundColor: 'yellow' }),
		};
}

function rangesOfElements(elements) {
	const code = activeEditor.document.getText();
	let currentIndex = 0;

	return elements.map((element) => {
		const elementIndex = code.indexOf(element, currentIndex);
		currentIndex = elementIndex + element.length;

		const startPos = activeEditor.document.positionAt(elementIndex);
		const endPos = activeEditor.document.positionAt(elementIndex + element.length);

		return new vscode.Range(startPos, endPos);
	});
}

function getTablesWithoutAttributes() {
	const code = activeEditor.document.getText();

	const allTables = code.match(/<table[^>]*>/gm) || [];
	const tablesWithAttributes =
		code.match(
			/<table[^>]*(?=[^>]*?role="presentation")[^>]*(?=[^>]*?border="0")[^>]*(?=[^>]*?cellpadding="0")[^>]*(?=[^>]*?cellspacing="0")[^>]*>/gm
		) || [];
	const tablesWithoutAttributes = allTables.filter((table) => !tablesWithAttributes.includes(table));

	return tablesWithoutAttributes;
}

function getStyles() {
	const code = activeEditor.document.getText();

	const styles =
		code.match(/style="[^"]*(?=.*?font-size:[^\d]*\d+px)[^"]*(?=.*?line-height:[^\d]*\d+px)[^"]*"/gm) || [];

	return styles;
}

module.exports = {
	getRanges,
	getDecorations,
};
