const vscode = require('vscode');

const DECORATIONS = {
	WARNING: {
		id: 'warning',
		decoration: {
			backgroundColor: 'rgba(255, 255, 0, 0.2)',
			border: '1px dotted rgba(255, 255, 0, 1)',
			overviewRulerColor: 'rgba(255, 255,0, 0.5)',
		},
	},
	DANGER: {
		id: 'danger',
		decoration: {
			backgroundColor: 'rgba(255, 0, 0, 0.2)',
			border: '1px dotted rgba(255, 0, 0, 1)',
			overviewRulerColor: 'rgba(255, 0,0, 0.5)',
		},
	},
	DEFAULT: {
		id: 'default',
		decoration: {
			backgroundColor: 'rgba(255, 255, 0, 0.5)',
			border: '1px dotted rgba(255, 255, 0, 1)',
			overviewRulerColor: 'rgba(255, 255,0, 0.5)',
		},
	},
};

const ELEMENTS = {
	TABLE: {
		id: 'table',
		rule: /<table[^>]*(?![^>]*?role="presentation")[^>]*(?![^>]*?border="0")[^>]*(?![^>]*?cellpadding="0")[^>]*(?![^>]*?cellspacing="0")[^>]*>/gm,
	},
	STYLE: {
		id: 'style',
		rule: /style="[^"]*(?=.*?font-size:[^\d]*\d+px)[^"]*(?=.*?line-height:[^\d]*\d+px)[^"]*"/gm,
	},
};

class CodeTracker {
	constructor(textEditor) {
		this.activeTextEditor = textEditor;
		this.code = this.activeTextEditor.document.getText();
		this.activeTracking = [];
		this.activeTranckigRangesNumber = 0;
		this.currentAppearanceIndex = 0;
	}

	track(elementId, type) {
		this.activeTranckigRangesNumber = 0;
		const allAppearancesRange = elementId ? this.getAppearancesRange(elementId) : [];
		const decorationType = this.getDecoration(type);

		this.addActive(type, decorationType);
		this.activeTextEditor.setDecorations(decorationType, allAppearancesRange);
	}

	dispose() {
		this.activeTracking.forEach((active) => active.decorationType.dispose());
	}

	addActive(type, decorationType) {
		this.activeTracking.push({ type: type, decorationType: decorationType });
	}

	getActiveTrackingRangesNumber() {
		return this.activeTranckigRangesNumber;
	}

	getAppearancesRange(elementId) {
		const elementAppearances = this.code.match(this.getElement(elementId).rule) || [];
		const appearancesRange = [];

		elementAppearances.forEach((appearance) => {
			appearancesRange.push(this.getRange(appearance));
		});

		this.activeTranckigRangesNumber = appearancesRange.length;
		this.currentAppearanceIndex = 0;

		return appearancesRange;
	}

	getElement(elementId) {
		for (const element in ELEMENTS) {
			if (ELEMENTS[element].id.match(elementId)) return ELEMENTS[element];
		}
	}

	getDecoration(type) {
		for (const decoration in DECORATIONS) {
			if (DECORATIONS[decoration].id.match(type))
				return vscode.window.createTextEditorDecorationType(DECORATIONS[decoration].decoration);
		}
	}

	getRange(appearance) {
		const appearanceIndex = this.code.indexOf(appearance, this.currentAppearanceIndex);
		this.currentAppearanceIndex = appearanceIndex + appearance.length;

		const startPos = this.activeTextEditor.document.positionAt(appearanceIndex);
		const endPos = this.activeTextEditor.document.positionAt(appearanceIndex + appearance.length);

		return new vscode.Range(startPos, endPos);
	}
}

module.exports = CodeTracker;
