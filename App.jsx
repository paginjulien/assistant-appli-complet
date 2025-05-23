import { useState } from 'react'

export default function App() {
  const [message, setMessage] = useState('')
  const [transcription, setTranscription] = useState('')
  const [file, setFile] = useState(null)
  const [gptResponse, setGptResponse] = useState('')
  const [recording, setRecording] = useState(false)

  const handleIntent = (intent) => {
    setMessage(`✅ Intention détectée : ${intent}`)
    // Simulation GPT
    setTimeout(() => {
      setGptResponse(`Voici ce que je vous propose pour : ${intent}`)
    }, 1000)
  }

  const toggleRecording = () => {
    setRecording(!recording)
    if (!recording) {
      setTranscription('Texte vocal simulé ici...')
    }
  }

  return (
    <div style={{ fontFamily: 'Arial', padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ color: '#fcd35d', marginBottom: '1rem' }}>
        <span role="img" aria-label="mic">🎙️</span> Assistant JS-INNOV.IA
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button onClick={() => handleIntent('ajouter-rdv')}>Ajouter RDV</button>
        <button onClick={() => handleIntent('relance-jour')}>Relances</button>
        <button onClick={() => handleIntent('creer-tache')}>Tâche</button>
        <button onClick={() => handleIntent('envoyer-email')}>Email</button>
        <button onClick={() => handleIntent('reseaux-sociaux')}>Réseaux</button>
        <button onClick={() => handleIntent('tarification')}>Tarif</button>
        <button onClick={() => handleIntent('dela')}>DELA</button>
        <button onClick={() => handleIntent('arces')}>Arces</button>
        <button onClick={() => handleIntent('epargne')}>Épargne</button>
        <button onClick={() => handleIntent('nouveau-client')}>Nouveau client</button>
        <button onClick={() => handleIntent('sinistre')}>Sinistre</button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <button
          onClick={toggleRecording}
          style={{
            background: recording ? '#ff4d4d' : '#333',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '20px',
            color: '#fff',
            border: 'none',
            animation: recording ? 'pulse 1s infinite' : 'none'
          }}
        >
          🎤
        </button>
      </div>

      <textarea
        value={transcription}
        onChange={e => setTranscription(e.target.value)}
        placeholder="Message transcrit ici..."
        rows={3}
        style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}
      />

      <div style={{ marginBottom: '1rem' }}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        {file && <p>📎 Fichier : {file.name}</p>}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: '#3dfc7b', fontWeight: 'bold' }}>{message}</p>
        <p style={{ backgroundColor: '#292929', padding: '1rem', borderRadius: '0.5rem' }}>{gptResponse}</p>
      </div>
    </div>
  )
}
