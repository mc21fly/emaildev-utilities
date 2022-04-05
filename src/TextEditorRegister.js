class TextEditorRegister {
	constructor(window) {
		this.activeTextEditor = window.activeTextEditor;
	}

	setActiveTextEditor(editor) {
		if (editor) this.activeTextEditor = editor;
	}

	getActiveTextEditor() {
		return this.activeTextEditor;
	}
}

module.exports = TextEditorRegister;
