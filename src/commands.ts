import { IEditor } from "./Editor";
import { OpenAIWrapper } from "./OpenAIWrapper";
import { fancyDocstringPrompt } from "./prompts";
import * as vscode from "vscode";

const checkForApiKey = (editor: IEditor): boolean => {
  const apiKey = editor.getSecret("openai-api-key");
  if (!apiKey) {
    editor.showErrorMessage(
      "You must provide an OpenAI API Key. Run 'Spaghettify - Setup' command."
    );
    return false;
  }
  return true;
};

export const spaghettiCommand = async (
  editor: IEditor,
  openAiApi: OpenAIWrapper,
  prompt: (input: string) => string
) => {
  if (!checkForApiKey(editor)) return;
  const selection = editor.getHighlightedText();
  if (selection.length === 0) {
    editor.showErrorMessage(
      "🍝 Nothing is selected. Highlight some code to Spaghettify. 🍝"
    );
    return;
  }
  const promptToRun = prompt(selection) + editor.getFileLanguage();
  const response = await openAiApi.makeRequestWithLoadingIndicator(
    promptToRun,
    editor
  );
  if (!response) {
    editor.showErrorMessage("Something went wrong.");
    return;
  }
  editor.replaceSelection(response.trim());
};

export const fancyDocstring = async (
  editor: IEditor,
  openAiApi: OpenAIWrapper
) => {
  if (!checkForApiKey(editor)) return;
  // cache selection for replacement
  const e = vscode.window.activeTextEditor;
  if (e == null) {
    return;
  }
  const selectionCache = e.selection;
  const selection = editor.getHighlightedText();
  if (selection.length === 0) {
    editor.showErrorMessage(
      "🍝 Nothing is selected. Highlight some code to Spaghettify. 🍝"
    );
    return;
  }
  const style = await editor.getUserInput(
    "Enter your style",
    "Rap Lyrics, Dirty Limeric, Fast Talkin' 1930s Gangster, etc...",
    "Invalid style",
    false
  );
  if (!style) {
    editor.showErrorMessage("Invalid style");
    return;
  }
  const promptToRun =
    fancyDocstringPrompt(selection, style) + editor.getFileLanguage();
  const response = await openAiApi.makeRequestWithLoadingIndicator(
    promptToRun,
    editor
  );
  if (!response) {
    editor.showErrorMessage("Something went wrong.");
    return;
  }
  editor.replaceSelection(response.trim(), selectionCache);
};

const validateInput = (value: string | undefined): boolean => {
  if (value === undefined) {
    return false;
  }
  if (value.length === 0) {
    return false;
  }
  return true;
};

export const setup = async (editor: IEditor) => {
  await editor
    .getUserInput(
      "Enter your OpenAI API Key",
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "Invalid API Key",
      true
    )
    .then((key) => {
      if (validateInput(key) && key !== undefined) {
        editor.setSecret("openai-api-key", key);
      }
    });
};
