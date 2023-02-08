import { IEditor } from "./Editor";
import * as vscode from "vscode";
import { OpenAIWrapper } from "./OpenAIWrapper";

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
