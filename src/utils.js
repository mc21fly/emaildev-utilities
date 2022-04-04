const vscode = require('vscode')

function isExcepted(exceptions, value) {
	return exceptions.includes(value)
}

function replaceValues(exceptions, style) {
	const lineHeight = style.match(/line-height:\s*\d+px;/gm);
	const fontSize = style.match(/font-size:\s*\d+px;/gm);
	const lineHeightValue = parseInt(lineHeight[0].match(/\d+/));
	const fontSizeValue = parseInt(fontSize[0].match(/\d+/));
	const value = `${fontSizeValue}, ${lineHeightValue}`;

	if (!isExcepted(exceptions, value)) {
		const valueUnitless = parseFloat((lineHeightValue / fontSizeValue).toFixed(2));
		const valuePercent = parseInt((valueUnitless - 1) / 2 * 100 + 100);

		const replacedStyle = style.replace(/line-height:\s*\d+px;/gm, `line-height: ${valuePercent}%; line-height: ${valueUnitless}!important;`);

		return replacedStyle;
	}

	return style;
}

function searchForTables(activeTextEditor) {
	const code = activeTextEditor.document.getText();
	const allTables = code.match(/<table[^>]*>/gm) || [];
	const tablesWithAttributes = code.match(/<table[^>]*?(?=[^>]*?role="presentation")[^>]*?(?=[^>]*?border="0")[^>]*?(?=[^>]*?cellpadding="0")[^>]*?(?=[^>]*?cellspacing="0")[^>]*?>/gm) || [];
	const tablesWithoutAttributes = allTables.filter((table) => !tablesWithAttributes.includes(table));
	const tablesRanges = getRanges(activeTextEditor, tablesWithoutAttributes);

	return tablesRanges;
}

function searchForStyles(activeTextEditor) {
	const code = activeTextEditor.document.getText();
	const styles = code.match(/style="[^"]*?(?=[^f]*?font-size:[^\d]*?\d+px)(?=[^l]*?line-height:[^\d]*?\d+px)[^"]*?"/gm) || [];
	const stylesRanges = getRanges(activeTextEditor, styles);

	return stylesRanges;
}

function searchForAlts(activeTextEditor) {
	const code = activeTextEditor.document.getText();
	const alts = code.match(/alt="[^"]*?"/gm) || [];
	const altsRanges = getRanges(activeTextEditor, alts);

	return altsRanges;
}

function searchForImgs(activeTextEditor) {
	const code = activeTextEditor.document.getText();
	const allImgs = code.match(/<img[^>]*?>/gm) || [];
	const imgWithAlt = code.match(/<img[^>]*alt="\s*?([^"]+)\s*?"[^>]*>/gm) || [];
	const imgWithoutAlt = allImgs.filter(img => !imgWithAlt.includes(img));
	const imgRanges = getRanges(activeTextEditor, imgWithoutAlt);

	return imgRanges;
}

function getRanges(activeTextEditor, elements) {
	let currentIndex = 0;
	const code = activeTextEditor.document.getText();

	return elements.map((element) => {
		const elementIndex = code.indexOf(element, currentIndex);
		currentIndex = elementIndex + element.length;

		const startPos = activeTextEditor.document.positionAt(elementIndex);
		const endPos = activeTextEditor.document.positionAt(elementIndex + element.length);

		return new vscode.Range(startPos, endPos);
	});
}

module.exports = {
	searchForTables,
	searchForStyles,
	searchForImgs,
	replaceValues,
	searchForAlts
};
