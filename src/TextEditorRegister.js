const vscode = require('vscode');
const { searchForStyles, replaceValues } = require('./util');

class TextEditorRegister {
	constructor(window, configuration) {
		this.activeTextEditor = window.activeTextEditor;
		this.configuration = configuration;
		this.window = window;
	}

	setActiveTextEditor(editor, configuration) {
		if (editor) {
			this.activeTextEditor = editor;
			this.configuration = configuration;
		}
	}

	getActiveTextEditor() {
		return this.activeTextEditor;
	}

	async replaceAttributeValue() {
		const cursorPosition = this.activeTextEditor.selection.active;
		const attributeRange = this.activeTextEditor.document.getWordRangeAtPosition(
			cursorPosition,
			/(href="[^"]*?"|src="[^"]*?"|alt="[^"]*?")/g
		);

		if (attributeRange) {
			const newAttributeValueInput = await this.window.showInputBox();

			if (newAttributeValueInput) {
				const oldAttributeValue = this.activeTextEditor.document.getText(attributeRange);
				const newAttributeValue = oldAttributeValue.replace(/"[^"]*?"/g, `"${newAttributeValueInput}"`);

				this.activeTextEditor.edit((editBuilder) => {
					editBuilder.replace(attributeRange, newAttributeValue);
				});
			}
		} else {
			this.window.showInformationMessage('href, alt or src attribute not found on this cursor position');
		}
	}

	replaceSelection(type) {
		if (this.activeTextEditor) {
			const document = this.activeTextEditor.document;
			const selection = this.activeTextEditor.selection;

			const textToWrap = document.getText(selection);
			const substitute = wrap(type, textToWrap);

			this.activeTextEditor.edit((editBuilder) => {
				editBuilder.replace(selection, substitute);
			});
		}

		function wrap(type, text) {
			switch (type) {
				case 'span':
					return `<span style="white-space:nowrap;">${text.replaceAll(' ', '&nbsp;')}</span>`;
				case 'sup':
					return `<sup style="line-height:100%;">${text}</sup>`;
				case 'zwj':
					return `${text.replaceAll('', '&#8205;')}`;
				case 'strong':
					return `<strong style="font-weight:600;">${text}</strong>`
				default:
					return text;
			}
		}
	}

	replaceLineHeight() {
		const document = this.activeTextEditor.document;
		const edit = new vscode.WorkspaceEdit();
		const exceptions = this.configuration.get('exceptions');
		const stylesRanges = searchForStyles(this.activeTextEditor);

		stylesRanges.forEach((styleRange) => {
			const style = document.getText(styleRange);
			const computedStyle = replaceValues(exceptions, style);

			edit.replace(document.uri, styleRange, computedStyle);
		});

		vscode.workspace.applyEdit(edit);
	}
}

module.exports = TextEditorRegister;
