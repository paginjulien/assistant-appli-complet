import { useState } from 'react'
import logo from './logo.png'

export default function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [transcription, setTranscription] = useState('')
  const [gptResponse, setGptResponse] = useState('')
  const [recording, setRecording] = useState(false)
  const [file, setFile] = useState(null)

  const buttonList = [
    'Ajouter RDV', 'Relance Jour', 'Créer Tâche', 'Envoyer Email',
    'Réseaux Sociaux', 'Tarification', 'DELA', 'ARCES', 'Épargne',
    'Nouveau Client', 'Sinistre', 'Salesforce Document'
  ]

  const handleIntent = (intent) => {
    setMessage(`✅ Intention : ${intent}`)
    setTimeout(() => {
      setGptResponse(`Réponse générée par l'assistant pour "${intent}".`)
    }, 800)
  }

  const toggleRecording = () => {
    setRecording(!recording)
    if (!recording) setTranscription('Texte simulé depuis la voix...')
  }

  const sendMessage = () => {
    setMessage('📨 Message envoyé à l’assistant IA.')
    setGptResponse('Réponse de ChatGPT : voici un exemple d’email généré...')
  }

  const handleKeyPress = (e, action) => { if (e.key === 'Enter') action(); }\n  const checkPin = () => {
    if (pin === '0502') {
      setAuthenticated(true)
      setError('')
    } else {
      setError('Code incorrect.')
    }
  }

  if (!authenticated) {
    return (
      <div style={{ background: '#140C1C', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <img src={logo} alt="JS-INNOV.IA" style={{ width: '100px', marginBottom: '1rem' }} />
        <h2>🔐 Entrez votre code</h2>
        <input
          type="password"
          value={pin}
          onChange={e => setPin(e.target.value)} onKeyDown={e => handleKeyPress(e, checkPin)}
          placeholder="Code à 4 chiffres"
          style={{ padding: '0.7rem', fontSize: '1.2rem', textAlign: 'center', marginBottom: '0.5rem', borderRadius: '0.5rem', border: '1px solid #888' }}
        />
        <button onClick={checkPin} style={{ padding: '0.6rem 1.5rem', borderRadius: '1rem', border: 'none', backgroundColor: '#fcd35d', color: '#140C1C', fontWeight: 'bold' }}>
          Déverrouiller
        </button>
        {error && <p style={{ color: 'tomato', marginTop: '1rem' }}>{error}</p>}
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#140C1C', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ textAlign: 'center', padding: '1rem' }}>
        <img src={logo} alt="Logo" style={{ width: '100px' }} />
        <h1 style={{ color: '#fcd35d' }}>🎙️ ASSISTANT POUR JULIEN P.</h1>
        <p style={{ fontSize: '0.9rem' }}>Créé par <strong>JS-INNOV.IA</strong></p>
      </header>

      <div style={{ display: 'flex', flex: 1, padding: '1rem', gap: '2rem', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {buttonList.map(intent => (
              <button key={intent} onClick={() => handleIntent(intent)} style={{
                backgroundColor: '#311947',
                color: 'white',
                padding: '0.7rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                borderRadius: '1rem',
                border: 'none',
                boxShadow: '0 0 10px #45205f',
                cursor: 'pointer',
                transition: '0.3s'
              }}>
                {intent}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <button onClick={toggleRecording} style={{
              backgroundColor: recording ? '#ff4d4d' : '#3a185d',
              width: '60px',
              height: '60px',
              fontSize: '20px',
              borderRadius: '50%',
              border: 'none',
              color: 'white',
              boxShadow: '0 0 10px red'
            }}>🎤</button>

            <textarea
              value={transcription}
              onChange={e => setTranscription(e.target.value)} onKeyDown={e => handleKeyPress(e, sendMessage)}
              placeholder="Votre message ou transcription..."
              rows={3}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '1rem',
                border: '1px solid #444',
                background: '#1e1e2f',
                color: 'white'
              }}
            />

            <button onClick={sendMessage} style={{
              backgroundColor: '#fcd35d',
              color: '#140C1C',
              border: 'none',
              padding: '0.8rem 1rem',
              borderRadius: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>Envoyer</button>
          </div>

          <div>
            <input type="file" onChange={e => setFile(e.target.files[0])} style={{ marginBottom: '1rem' }} />
            {file && <p>📎 {file.name}</p>}
          </div>
        </div>

        <div style={{ flex: 1, background: '#26203d', borderRadius: '1rem', padding: '1rem' }}>
          <p><strong>🧠 Réponse IA :</strong><br />{gptResponse}</p>
          <p style={{ marginTop: '1rem', color: '#b5b5b5' }}>{message}</p>
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '1rem', fontSize: '0.8rem', background: '#1a0f22' }}>
        © 2025 JS-INNOV.IA – Tous droits réservés. Mentions légales disponibles sur demande.
      </footer>
    </div>
  )
}
