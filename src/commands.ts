import { IEditor } from "./Editor";
import { OpenAIWrapper } from "./OpenAIWrapper";
import { fancyDocstringPrompt } from "./prompts";
import * as vscode from "vscode";

export const spaghettiCommand = async (
  editor: IEditor,
  openAiApi: OpenAIWrapper,
  prompt: (input: string) => string
) => {
  const selection = editor.getHighlightedText();
  const promptToRun = prompt(selection);
  const response = await openAiApi.makeRequestWithLoadingIndicator(
    promptToRun,
    editor
  );
  editor.replaceSelection(response);
};

export const fancyDocstring = async (
  editor: IEditor,
  openAiApi: OpenAIWrapper
) => {
  // cache selection for replacement
  const e = vscode.window.activeTextEditor;
  if (e == null) {
    return;
  }
  const selectionCache = e.selection;
  const selection = editor.getHighlightedText();
  const style = await editor.getUserInput(
    "Enter your style",
    "Rap Lyrics, Dirty Limeric, Fast Talkin' Gangster, etc...",
    "Invalid style",
    false
  );
  const promptToRun = fancyDocstringPrompt(selection, style);
  const response = await openAiApi.makeRequestWithLoadingIndicator(
    promptToRun,
    editor
  );
  editor.replaceSelection(response, selectionCache);
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
