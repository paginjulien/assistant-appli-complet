export function processIntent(intent, userInput = "") {
  switch (intent) {
    case 'ajouter-rdv':
      return {
        type: 'rdv',
        fields: {
          sujet: 'Rendez-vous à planifier',
          client: '',
          date: '',
          heure: '',
          statut: 'À planifier',
          commentaire: userInput || 'Ajout via assistant vocal ou bouton RDV'
        }
      };
    case 'salesforce-doc':
      return {
        type: 'document-salesforce',
        fields: {
          client: '',
          type: 'Document à intégrer',
          commentaire: userInput || 'Fichier transmis via interface',
          statut: 'À traiter'
        }
      };
    default:
      return {
        type: 'inconnu',
        instruction: `Aucune règle définie pour l'intention : ${intent}`
      };
  }
}