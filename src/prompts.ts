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

export const addSillyCommentsPrompt = (input: string) => {
  return `Here is some well-written code:
  
  \`\`\`
  ${input}
  \`\`\`
  
  Please rewrite it to include tons of unnecessary, unhelpful comments. The more random the structure, syntax, and language the better. Include emojis, profanity, ascii and other things when possible. Make most comments either factually inaccurate or rambling. It should be truly horrible to read for anyone who looks at it.
  
  \`\`\``;
};

export const documentWithEmojiPrompt = (input: string) => {
  return `Here is some well-written code:
  
  \`\`\`
  ${input}
  \`\`\`
  
  Please rewrite this code by adding a single documentation comment, docstring-style which describes it. This docstring should be ONLY EMOJI, nothing else. Then add several other EMOJI-ONLY comments to the code to highlight important parts.
  
  \`\`\``;
};

export const overlyDescriptiveNamesPrompt = (input: string) => {
  return `Here is some well-written code:
  
  \`\`\`
  ${input}
  \`\`\`
  
  Please rewrite it so it is still syntactically correct, but all of the variable names are incredibly long, overly descriptive, and near-sentence length. Also make sure to use a mixture of snake case, camel case, and any other case you fancy. It should be very frustrating to read, but still correct code.
  
  \`\`\``;
};

export const randomWhitespacePrompt = (input: string) => {
  return `Here is some well-written code:
  
  \`\`\`
  ${input}
  \`\`\`
  
  Please rewrite it so it is still syntactically correct, and leave the linebreaks and indentations as-is. However, add tons of random, unnecessary spaces to the code. It should be asymmetiric, very frustrating to read, but still correct code.
  
  \`\`\``;
};

export const fancyDocstringPrompt = (input: string, style: string) => {
  return `Here is some well-written code:
  
  \`\`\`
  ${input}
  \`\`\`
  
  Please rewrite it, adding a high-level documentation comment that describes what it does in the style of ${style}. Please make sure to include the original code as well.
  
  \`\`\``;
};
