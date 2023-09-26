// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let activeEditor = vscode.window.activeTextEditor;
	
	console.log('FINDR" is now active');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let helloWorldDisposable = vscode.commands.registerCommand('FINDR.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from findr!');
	});

	// Multi selection Code
	let FindMultiSelectionDisposable = vscode.commands.registerCommand('FINDR.multiSelectHighlight', () => {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selections = editor.selections;
            if (selections.length > 0) {
                selections.forEach((selection, index) => {
                    const selectedText = editor.document.getText(selection);
					
					if (activeEditor) {
						// Initial highlighting
						updateHighlighting(activeEditor, purpleHighlight);

						// Event handler for when the selection changes
						vscode.window.onDidChangeTextEditorSelection((e) => {
							if (e.textEditor === activeEditor) {
								updateHighlighting(activeEditor, purpleHighlight);
							}
						});
					}

                    vscode.window.showInformationMessage(`Selection ${index + 1}: "${selectedText}"`);
                });
            } else {
                vscode.window.showInformationMessage('No selections made.');
            }
        } else {
            vscode.window.showInformationMessage('No active text editor.');
        }
    });

    // Create a decoration type for highlighting text with purple color
    const purpleHighlight = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'purple',
        color: 'white', // Text color (optional)
        fontWeight: 'bold', // Font weight (optional)
    });

	
    context.subscriptions.push(purpleHighlight);
	context.subscriptions.push(helloWorldDisposable);
	context.subscriptions.push(FindMultiSelectionDisposable);
}

function updateHighlighting(editor: vscode.TextEditor, decorationType: vscode.TextEditorDecorationType) {
    const selections = editor.selections;
    const decorations: vscode.DecorationOptions[] = [];

    selections.forEach((selection) => {
        decorations.push({
            range: selection,
        });
    });

    editor.setDecorations(decorationType, decorations);
}

// This method is called when your extension is deactivated
export function deactivate() {}
