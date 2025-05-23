export function processIntent(intent, userInput = "") {
  return {
    type: intent,
    fields: {
      contenu: userInput || 'Action déclenchée via interface JS-INNOV.IA'
    }
  };
}
