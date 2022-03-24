const vscode = require('vscode');
const window = vscode.window;

class Tracker {
    constructor() {
        this.decoration = window.createTextEditorDecorationType({ backgroundColor: "rgba(255,0,0,0.5)", overviewRulerColor: "rgba(255,0,0,0.5)", border: '1px dotted red' });
    }

    track(table) {
        const activeTextEditor = window.activeTextEditor;
        const activeText = activeTextEditor.document.getText();
        const tableIndex = activeText.indexOf(table);

        const startPos = activeTextEditor.document.positionAt(tableIndex);
        const endPos = activeTextEditor.document.positionAt(tableIndex + table.length);

        const tableRange = new vscode.Range(startPos, endPos);

        activeTextEditor.setDecorations(this.decoration, [tableRange])
    }

    dispose() {
        this.decoration.dispose();
    }
}

module.exports = Tracker;