import * as vscode from "vscode";

export interface IEditor {
  writeToConsole: (text: string) => void;
  getUserInput: (
    prompt: string,
    placeHolder: string,
    errorText: string,
    password?: boolean
  ) => Promise<string | undefined>;
  showErrorMessage: (message: string) => void;
  getCurrentFileExtension: () => string;
  getHighlightedText: () => string;
  replaceSelection: (text: string, selectionCache?: vscode.Selection) => void;
  getSecret: (key: string) => Promise<string | undefined>;
  setSecret: (key: string, value: string) => void;
  getConfigValue: (key: string) => any;
  getFileLanguage: () => string;
}

export class Editor implements IEditor {
  private readonly outputChannel: vscode.OutputChannel;
  private readonly context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.outputChannel = vscode.window.createOutputChannel("Spaghettify");
    this.context = context;
  }

  writeToConsole(text: string): void {
    this.outputChannel.appendLine(text);
    this.outputChannel.show();
  }

  async getUserInput(
    prompt: string,
    placeHolder: string,
    errorText: string,
    password: boolean = false
  ): Promise<string | undefined> {
    return await vscode.window.showInputBox({
      prompt,
      placeHolder,
      password,
      ignoreFocusOut: true,
      validateInput: (value: string) => {
        if (value.length === 0) {
          return errorText;
        }
        return null;
      },
    });
  }

  showErrorMessage(message: string): void {
    void vscode.window.showErrorMessage(message);
  }

  getCurrentFileExtension(): string {
    const editor = vscode.window.activeTextEditor;
    if (editor != null) {
      const fileName = editor.document.fileName;
      const extension = fileName.split(".").pop();
      if (extension != null) {
        return extension;
      }
    }
    return "";
  }

  getHighlightedText(): string {
    const editor = vscode.window.activeTextEditor;
    if (editor != null) {
      const selection = editor.selection;
      if (!selection.isEmpty) {
        const selectionRange = new vscode.Range(
          selection.start.line,
          selection.start.character,
          selection.end.line,
          selection.end.character
        );
        return editor.document.getText(selectionRange);
      }
    }
    return "";
  }

  replaceSelection(text: string, selectionCache?: vscode.Selection): void {
    const editor = vscode.window.activeTextEditor;
    if (editor != null) {
      const selection = selectionCache ?? editor.selection;
      if (!selection.isEmpty) {
        editor.edit((editBuilder) => {
          editBuilder.replace(selection, text);
        });
      }
    }
  }

  async getSecret(key: string): Promise<string | undefined> {
    return await this.context.secrets.get(key);
  }

  setSecret(key: string, value: string): void {
    void this.context.secrets.store(key, value);
    void vscode.window.showInformationMessage("API Key saved");
  }

  getConfigValue(key: string): any {
    return vscode.workspace.getConfiguration("spaghettify").get(key);
  }

  getFileLanguage(): string {
    const editor = vscode.window.activeTextEditor;
    if (editor != null) {
      return editor.document.languageId;
    }
    return "";
  }
}
