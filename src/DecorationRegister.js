const Decoration = require("./Decoration");

class DecorationRegister {
    constructor() {
        this.configuration = null;
        this.activeTextEditor = null;
        this.lang = null;
        this.decorations = [];
    }

    update(configuration, textEditor) {
        console.log(this.decorations)
        this.configuration = configuration;
        this.activeTextEditor = textEditor.getActiveTextEditor();
        this.lang = textEditor.getActiveTextEditor().document.languageId;

        if (this.activeTextEditor && this.lang === 'html') {
            this.decorations = [new Decoration(this.configuration, 'tables', this.activeTextEditor)]
        }

        this.decorate()
    }

    decorate() {
        this.decorations.forEach(decoration => {
            if (decoration.isActive) this.activeTextEditor.setDecorations(decoration.getType(), decoration.getRange())
        })
    }
}

module.exports = DecorationRegister;