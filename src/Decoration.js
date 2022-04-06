const { window } = require('vscode');
const { searchForTables, searchForAlts, searchForStyles, searchForImgs } = require('./util');

class Decoration {
	constructor(configuration, type, textEditor) {
		this.type = window.createTextEditorDecorationType(configuration.get(`${type}Decoration`));
		this.range = this.searchForRanges(type, textEditor);
		this.isActive =
			configuration.get(`is${type[0].toUpperCase() + type.substring(1)}Enabled`) &&
			configuration.get('isExtensionEnabled');
	}

	searchForRanges(type, textEditor) {
		switch (type) {
			case 'tables':
				return searchForTables(textEditor);
			case 'styles':
				return searchForStyles(textEditor);
			case 'alts':
				return searchForAlts(textEditor);
			case 'imgs':
				return searchForImgs(textEditor);
			default:
				return [];
		}
	}

	getType() {
		return this.type;
	}

	getRange() {
		return this.isActive ? this.range : [];
	}

	dispose() {
		this.type.dispose();
	}
}

module.exports = Decoration;
