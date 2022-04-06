const { window } = require("vscode");
const { searchForTables } = require('./util');

class Decoration {
    constructor(configuration, type, textEditor) {
        this.type = window.createTextEditorDecorationType(configuration.get(`${type}Decoration`));
        this.range = searchForTables(textEditor);
        this.isActive = configuration.get(`is${type[0].toUpperCase() + type.substring(1)}Enabled`) && configuration.get('isExtensionEnabled');
    }

    getType() {
        return this.type;
    }

    getRange() {
        return this.isActive ? this.range : [];
    }
}

module.exports = Decoration;