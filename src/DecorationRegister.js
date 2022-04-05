class DecorationRegister {
    constructor() {
        this.configuration = null;
        this.activeTextEditor = null;
        this.lang = null;
        this.decorations = [];
    }

    update(configuration, textEditor) {
        this.configuration = configuration;
        this.activeTextEditor = textEditor.getActiveTextEditor();
        this.lang = textEditor.getActiveTextEditor().document.languageId;

        if (this.activeTextEditor && this.lang === 'html') {
            
        }
    }

    decorate() {
        this.decorations.forEach(decoration => {
            this.activeTextEditor.setDecorations(decoration.getType(), decoration.getRange())
        })
    }
}

module.exports = DecorationRegister;