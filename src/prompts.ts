export const introduceBugPrompt = (input: string) => {
  return `Here is some code which is confirmed to work:
  
  \`\`\`
  ${input}
  \`\`\`
  
  Please take this code and rewrite it to include a subtle bug which makes it not work. Do not leave ANY comments, or your work will be penalized.
  
  \`\`\``;
};

export const obscureCodePrompt = (input: string) => {
  return `Here is some well-written code:
  
  \`\`\`
  ${input}
  \`\`\`
  
  Please take this code and rewrite it so it is still syntactically correct, but make it as horrible as possible to read and comprehend for anyone looking at it.
  
  \`\`\``;
};
