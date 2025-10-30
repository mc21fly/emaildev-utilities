"use strict";

const vscode = require("vscode");
const { window, workspace } = vscode;

const CommandRegister = require("./src/CommandRegister");
const ConfigurationRegister = require("./src/ConfigurationRegister");
const DecorationRegister = require("./src/DecorationRegister");
const TextEditorRegister = require("./src/TextEditorRegister");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // --- Initialize Core Modules ---
    const commands = new CommandRegister(context);
    const configuration = new ConfigurationRegister(workspace);
    const textEditor = new TextEditorRegister(window, configuration);
    const decorations = new DecorationRegister();

    const toggleCommands = ["extension", "tables", "styles", "imgs", "alts"];

    // --- Register Commands for Selections ---
    commands.register("supSelection", () => textEditor.replaceSelection("sup"));
    commands.register("spanSelection", () => textEditor.replaceSelection("span"));
    commands.register("zwjSelection", () => textEditor.replaceSelection("zwj"));
    commands.register("strongSelection", () => textEditor.replaceSelection("strong"));
    commands.register("aSelection", () => textEditor.replaceSelection("a"));
    commands.register("iSelection", () => textEditor.replaceSelection("i"));

    // --- Register Utility Commands ---
    commands.register("replaceAttributeValue", () => textEditor.replaceAttributeValue());
    commands.register("replaceLineHeight", () => textEditor.replaceLineHeight());
    commands.register("copyAndCompress", () => textEditor.copyAndCompress());

    // --- Register Toggle Commands ---
    commands.registerAll(toggleCommands, (command) => configuration.toggle(`is${command[0].toUpperCase() + command.substring(1)}Enabled`));

    // --- Event Listeners ---
    window.onDidChangeActiveTextEditor((editor) => {
        textEditor.setActiveTextEditor(editor, configuration);
        if (editor) {
            decorations.update(configuration, textEditor);
        }
    });

    workspace.onDidChangeConfiguration(() => {
        configuration.setCurrentConfiguration(workspace);
        decorations.update(configuration, textEditor);
    });

    workspace.onDidChangeTextDocument((event) => {
        const activeTextEditor = textEditor.getActiveTextEditor();
        if (activeTextEditor && event.document === activeTextEditor.document) {
            decorations.update(configuration, textEditor);
        }
    });

    // --- Initialize Decorations for Active Editor ---
    const activeEditor = textEditor.getActiveTextEditor();
    if (activeEditor) {
        decorations.update(configuration, textEditor);
    } else {
        console.warn("[EmailDev Utilities] No active text editor detected at startup.");
    }
}

exports.activate = activate;
