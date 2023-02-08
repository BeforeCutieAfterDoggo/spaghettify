import * as vscode from "vscode";
import { spaghettiCommand, setup } from "./commands";
import { Editor } from "./Editor";
import { OpenAIWrapper } from "./OpenAIWrapper";
import { introduceBugPrompt, obscureCodePrompt } from "./prompts";

export function activate(context: vscode.ExtensionContext) {
  const editor = new Editor(context);
  const openAiApi = new OpenAIWrapper();
  const introduceBugCommand = vscode.commands.registerCommand(
    "spaghettify.introduceBug",
    () => spaghettiCommand(editor, openAiApi, introduceBugPrompt)
  );
  const obsucureCodeCommand = vscode.commands.registerCommand(
    "spaghettify.obscureCode",
    () => spaghettiCommand(editor, openAiApi, obscureCodePrompt)
  );
  const setupCommand = vscode.commands.registerCommand(
    "spaghettify.setup",
    () => setup(editor)
  );
  context.subscriptions.push(introduceBugCommand);
  context.subscriptions.push(obsucureCodeCommand);
  context.subscriptions.push(setupCommand);
}

export function deactivate() {}
