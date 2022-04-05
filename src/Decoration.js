const { window } = require("vscode");

class Decoration {
    constructor(configuration, type, range) {
        this.type = window.createTextEditorDecorationType(configuration.get(`${type}Decoration`));
        this.range = range;
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