"use strict";

const vscode = require("vscode");

/**
 * Checks if a (fontSize, lineHeight) combination is in the exception list.
 * @param {string[]} exceptions - Array of exception strings like "16, 24"
 * @param {string} value - Value to compare against.
 */
function isExcepted(exceptions, value) {
    return Array.isArray(exceptions) && exceptions.includes(value);
}

/**
 * Replaces line-height values with both percent and unitless versions,
 * unless the combination is listed in exceptions.
 */
function replaceValues(exceptions, style) {
    const lineHeightMatch = style.match(/line-height:\s*(\d+)px;/);
    const fontSizeMatch = style.match(/font-size:\s*(\d+)px;/);

    if (!lineHeightMatch || !fontSizeMatch) return style;

    const lineHeightValue = parseInt(lineHeightMatch[1]);
    const fontSizeValue = parseInt(fontSizeMatch[1]);
    const pairValue = `${fontSizeValue}, ${lineHeightValue}`;

    if (isExcepted(exceptions, pairValue)) {
        return style; // Skip modification if in exceptions
    }

    // Compute ratio and percent
    const ratio = parseFloat((lineHeightValue / fontSizeValue).toFixed(2));
    const percent = Math.round(((ratio - 1) / 2) * 100 + 100);

    return style.replace(/line-height:\s*\d+px;/, `line-height: ${percent}%; line-height: ${ratio}!important;`);
}

/**
 * Finds <table> tags missing specific presentation attributes.
 */
function searchForTables(activeTextEditor) {
    const code = activeTextEditor.document.getText();
    const allTables = code.match(/<table[^>]*>/g) || [];

    const compliantTables = code.match(/<table[^>]*?(?=[^>]*role="presentation")(?=[^>]*border="0")(?=[^>]*cellpadding="0")(?=[^>]*cellspacing="0")[^>]*?>/g) || [];

    const missingAttrTables = allTables.filter((t) => !compliantTables.includes(t));

    return getRanges(activeTextEditor, missingAttrTables);
}

/**
 * Finds inline styles that define both font-size and line-height.
 */
function searchForStyles(activeTextEditor) {
    const code = activeTextEditor.document.getText();
    const styles = code.match(/style="[^"]*?(?=[^"]*font-size:\s*\d+px)(?=[^"]*line-height:\s*\d+px)[^"]*?"/g) || [];

    return getRanges(activeTextEditor, styles);
}

/**
 * Finds image tags missing alt attributes.
 */
function searchForImgs(activeTextEditor) {
    const code = activeTextEditor.document.getText();
    const allImgs = code.match(/<img[^>]*?>/g) || [];
    const imgsWithAlt = code.match(/<img[^>]*alt="\s*?[^"]+?\s*?"[^>]*>/g) || [];

    const imgsWithoutAlt = allImgs.filter((img) => !imgsWithAlt.includes(img));
    return getRanges(activeTextEditor, imgsWithoutAlt);
}

/**
 * Finds all alt="..." attributes in the document.
 */
function searchForAlts(activeTextEditor) {
    const code = activeTextEditor.document.getText();
    const alts = code.match(/alt="[^"]*?"/g) || [];
    return getRanges(activeTextEditor, alts);
}

/**
 * Returns VSCode Range objects for each matched element.
 */
function getRanges(activeTextEditor, elements) {
    if (!elements.length) return [];

    const document = activeTextEditor.document;
    const text = document.getText();
    let searchStart = 0;

    return elements
        .map((element) => {
            const idx = text.indexOf(element, searchStart);
            if (idx === -1) return null;

            searchStart = idx + element.length;

            const start = document.positionAt(idx);
            const end = document.positionAt(idx + element.length);

            return new vscode.Range(start, end);
        })
        .filter(Boolean);
}

/**
 * Prompts user to replace `href` or `src` attribute values under cursor.
 */
async function replaceAttribute(textEditor) {
    const editor = textEditor.getActiveTextEditor();
    if (!editor) {
        vscode.window.showInformationMessage("No active text editor found.");
        return;
    }

    const cursor = editor.selection.active;
    const attrRange = editor.document.getWordRangeAtPosition(cursor, /(href="[^"]*"|src="[^"]*")/);

    if (!attrRange) {
        vscode.window.showInformationMessage("No href or src attribute found here.");
        return;
    }

    const newValue = await vscode.window.showInputBox({
        prompt: "Enter new attribute value",
        placeHolder: "https://example.com",
    });

    if (!newValue) return;

    const oldValue = editor.document.getText(attrRange);
    const replacedValue = oldValue.replace(/"[^"]*"/, `"${newValue}"`);

    await editor.edit((editBuilder) => editBuilder.replace(attrRange, replacedValue));
}

module.exports = {
    searchForTables,
    searchForStyles,
    searchForImgs,
    searchForAlts,
    replaceValues,
    replaceAttribute,
};
