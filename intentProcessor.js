export function processIntent(intent, userInput = "") {
  return { type: 'test', fields: { text: userInput }};
}
