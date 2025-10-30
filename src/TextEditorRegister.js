"use strict";

const vscode = require("vscode");
const { searchForStyles, replaceValues } = require("./util");

class TextEditorRegister {
    constructor(window, configuration) {
        this.window = window;
        this.configuration = configuration;
        this.activeTextEditor = window.activeTextEditor;
    }

    /**
     * Sets the active text editor and updates configuration.
     * @param {vscode.TextEditor} editor
     * @param {vscode.WorkspaceConfiguration} configuration
     */
    setActiveTextEditor(editor, configuration) {
        if (editor) {
            this.activeTextEditor = editor;
            this.configuration = configuration;
        }
    }

    /**
     * Returns the currently active text editor.
     */
    getActiveTextEditor() {
        return this.activeTextEditor;
    }

    /**
     * Prompts the user to replace href, src, or alt attribute values under the cursor.
     */
    async replaceAttributeValue() {
        const editor = this.activeTextEditor;
        if (!editor) {
            this.window.showInformationMessage("No active text editor.");
            return;
        }

        const cursorPosition = editor.selection.active;
        const attributeRange = editor.document.getWordRangeAtPosition(cursorPosition, /(href="[^"]*"|src="[^"]*"|alt="[^"]*")/);

        if (!attributeRange) {
            this.window.showInformationMessage("href, alt, or src attribute not found at this cursor position.");
            return;
        }

        const newValue = await this.window.showInputBox({
            prompt: "Enter new attribute value",
            placeHolder: "https://example.com or image-alt-text",
        });

        if (!newValue) return;

        const oldAttribute = editor.document.getText(attributeRange);
        const updatedAttribute = oldAttribute.replace(/"[^"]*"/, `"${newValue}"`);

        await editor.edit((editBuilder) => {
            editBuilder.replace(attributeRange, updatedAttribute);
        });
    }

    /**
     * Wraps selected text in specific HTML tag types.
     * @param {string} type - The tag type (span, sup, zwj, strong, a, i)
     */
    async replaceSelection(type) {
        const editor = this.activeTextEditor;
        if (!editor) {
            this.window.showInformationMessage("No active text editor found.");
            return;
        }

        const document = editor.document;
        const selection = editor.selection;
        const textToWrap = document.getText(selection);

        if (!textToWrap) {
            this.window.showInformationMessage("No text selected.");
            return;
        }

        const wrapped = this.wrapText(type, textToWrap);

        await editor.edit((editBuilder) => {
            editBuilder.replace(selection, wrapped);
        });
    }

    /**
     * Internal helper: wraps text based on type.
     */
    wrapText(type, text) {
        switch (type) {
            case "span":
                return `<span style="white-space:nowrap;">${text.replaceAll(" ", "&nbsp;")}</span>`;
            case "sup":
                return `<sup style="line-height:0;">${text}</sup>`;
            case "zwj":
                return `${text.replaceAll("", "&#8205;")}`;
            case "strong":
                return `<strong style="font-weight:900;">${text}</strong>`;
            case "a":
                return `<a href="" target="_blank" style="color:#414042;text-decoration:underline;">${text}</a>`;
            case "i":
                return `<i>${text}</i>`;
            default:
                return text;
        }
    }

    /**
     * Replaces line-height values in CSS styles according to exceptions.
     */
    async replaceLineHeight() {
        const editor = this.activeTextEditor;
        if (!editor) {
            this.window.showInformationMessage("No active text editor.");
            return;
        }

        const document = editor.document;
        const edit = new vscode.WorkspaceEdit();
        const exceptions = this.configuration.get("exceptions") || [];
        const stylesRanges = searchForStyles(editor);

        stylesRanges.forEach((styleRange) => {
            const style = document.getText(styleRange);
            const computedStyle = replaceValues(exceptions, style);
            edit.replace(document.uri, styleRange, computedStyle);
        });

        await vscode.workspace.applyEdit(edit);
    }

    /**
     * Compresses selected text by removing extra whitespace and line breaks,
     * then copies it to clipboard.
     */
    async copyAndCompress() {
        const editor = this.activeTextEditor;
        if (!editor) {
            this.window.showInformationMessage("No active text editor found.");
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        if (!text) {
            this.window.showInformationMessage("No text selected.");
            return;
        }

        const compressed = text
            .replace(/[\s\n]+/g, " ") // collapse multiple spaces/newlines
            .replace(/\s>/g, ">") // remove spaces before >
            .trim();

        try {
            await vscode.env.clipboard.writeText(compressed);
            this.window.showInformationMessage("Compressed text copied to clipboard.");
        } catch (err) {
            console.error("[EmailDev Utilities] Clipboard error:", err);
            this.window.showErrorMessage("Failed to copy text to clipboard.");
        }
    }
}

module.exports = TextEditorRegister;
