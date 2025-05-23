
// Ce module interprète les intentions envoyées depuis l'interface (boutons, vocal, etc.)
// Il génère des instructions formatées à envoyer dans Airtable ou Make

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

    case 'creer-tache':
      return {
        type: 'tache',
        fields: {
          description: userInput || 'Nouvelle tâche à définir',
          deadline: '',
          priorite: 'Normale',
          statut: 'À faire'
        }
      };

    case 'relance-jour':
      return {
        type: 'relance',
        instruction: 'Afficher les relances prévues aujourd’hui depuis Airtable.'
      };

    case 'nouveau-client':
      return {
        type: 'lead',
        fields: {
          nom: '',
          contact: '',
          source: '',
          besoin: userInput || 'Non précisé'
        }
      };

    case 'sinistre':
      return {
        type: 'sinistre',
        fields: {
          type: '',
          date: '',
          description: userInput || 'À compléter',
          document: '',
          statut: 'En cours'
        }
      };

    case 'envoyer-email':
      return {
        type: 'email',
        fields: {
          destinataire: '',
          sujet: '',
          contenu: userInput || 'Contenu à définir',
          statut: 'À envoyer'
        }
      };

    case 'tarification':
      return {
        type: 'tarification',
        fields: {
          produit: '',
          client: '',
          options: '',
          commentaire: userInput || 'Demande de tarification à traiter'
        }
      };

    case 'reseaux-sociaux':
      return {
        type: 'idee-contenu',
        fields: {
          canal: '',
          idee: userInput || 'Nouvelle idée à formuler',
          statut: 'À valider'
        }
      };

    case 'dela':
    case 'arces':
    case 'epargne':
      return {
        type: 'dossier-financier',
        sousType: intent,
        fields: {
          client: '',
          objectif: userInput || 'Demande reçue via assistant',
          statut: 'À traiter'
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
