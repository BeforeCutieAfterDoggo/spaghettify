import * as vscode from "vscode";
import { spaghettiCommand, setup, fancyDocstring } from "./commands";
import { Editor } from "./Editor";
import { OpenAIWrapper } from "./OpenAIWrapper";
import {
  addSillyCommentsPrompt,
  documentWithEmojiPrompt,
  introduceBugPrompt,
  obscureCodePrompt,
  overlyDescriptiveNamesPrompt,
  randomWhitespacePrompt,
} from "./prompts";

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
  const addSillyCommentsCommand = vscode.commands.registerCommand(
    "spaghettify.addSillyComments",
    () => spaghettiCommand(editor, openAiApi, addSillyCommentsPrompt)
  );
  const documentWithEmojiCommand = vscode.commands.registerCommand(
    "spaghettify.documentWithEmoji",
    () => spaghettiCommand(editor, openAiApi, documentWithEmojiPrompt)
  );
  const overlyDescriptiveNameCommand = vscode.commands.registerCommand(
    "spaghettify.overlyDescriptiveNames",
    () => spaghettiCommand(editor, openAiApi, overlyDescriptiveNamesPrompt)
  );
  const randomWhitespaceCommand = vscode.commands.registerCommand(
    "spaghettify.randomWhitespace",
    () => spaghettiCommand(editor, openAiApi, randomWhitespacePrompt)
  );
  const fancyDocstringCommand = vscode.commands.registerCommand(
    "spaghettify.fancyDocstring",
    () => fancyDocstring(editor, openAiApi)
  );
  const setupCommand = vscode.commands.registerCommand(
    "spaghettify.setup",
    () => setup(editor)
  );
  context.subscriptions.push(introduceBugCommand);
  context.subscriptions.push(obsucureCodeCommand);
  context.subscriptions.push(addSillyCommentsCommand);
  context.subscriptions.push(documentWithEmojiCommand);
  context.subscriptions.push(overlyDescriptiveNameCommand);
  context.subscriptions.push(randomWhitespaceCommand);
  context.subscriptions.push(fancyDocstringCommand);
  context.subscriptions.push(setupCommand);
}

export function deactivate() {}
