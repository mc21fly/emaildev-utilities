const Decoration = require('./Decoration');

class DecorationRegister {
	constructor() {
		this.configuration = null;
		this.activeTextEditor = null;
		this.lang = null;
		this.decorations = [];
	}

	update(configuration, textEditor) {
		this.undecorate();
		this.configuration = configuration;
		this.activeTextEditor = textEditor.getActiveTextEditor();
		this.lang = textEditor.getActiveTextEditor().document.languageId;

		if (this.activeTextEditor && this.lang === 'html') {
			this.decorations = [
				new Decoration(this.configuration, 'tables', this.activeTextEditor),
				new Decoration(this.configuration, 'styles', this.activeTextEditor),
				new Decoration(this.configuration, 'imgs', this.activeTextEditor),
				new Decoration(this.configuration, 'alts', this.activeTextEditor),
			];
		}

		this.decorate();
	}

	decorate() {
		this.decorations.forEach((decoration) => {
			if (decoration.isActive)
				this.activeTextEditor.setDecorations(decoration.getType(), decoration.getRange());
		});
	}

	undecorate() {
		this.decorations.forEach((decoration) => {
			decoration.dispose();
		});
	}
}

module.exports = DecorationRegister;
