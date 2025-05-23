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
    'ajouter-rdv', 'relance-jour', 'creer-tache', 'envoyer-email',
    'reseaux-sociaux', 'tarification', 'dela', 'arces', 'epargne',
    'nouveau-client', 'sinistre', 'salesforce-document'
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

  const checkPin = () => {
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
          onChange={e => setPin(e.target.value)}
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
    <div style={{ fontFamily: 'sans-serif', maxWidth: '850px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <img src={logo} alt="Logo JS-INNOV.IA" style={{ width: '120px', marginBottom: '1rem' }} />
      <h1 style={{ color: '#fcd35d', marginBottom: '1rem' }}>🎙️ Assistant JS-INNOV.IA</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {buttonList.map(intent => (
          <button key={intent} onClick={() => handleIntent(intent)} style={{
            backgroundColor: '#311947',
            color: 'white',
            padding: '0.7rem',
            borderRadius: '1rem',
            border: 'none',
            boxShadow: '0 0 10px #45205f',
            cursor: 'pointer',
            transition: '0.3s'
          }}>
            {intent.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '1rem' }}>
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
      </div>

      <textarea
        value={transcription}
        onChange={e => setTranscription(e.target.value)}
        placeholder="Votre message ou transcription..."
        rows={3}
        style={{
          width: '100%',
          padding: '1rem',
          borderRadius: '1rem',
          marginBottom: '1rem',
          border: '1px solid #444',
          background: '#1e1e2f',
          color: 'white'
        }}
      />

      <div>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        {file && <p>📎 {file.name}</p>}
      </div>

      <button onClick={sendMessage} style={{
        marginTop: '1rem',
        backgroundColor: '#fcd35d',
        color: '#140C1C',
        border: 'none',
        padding: '0.8rem 2rem',
        borderRadius: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}>Envoyer</button>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#26203d', borderRadius: '1rem' }}>
        <p style={{ color: '#b5b5b5' }}>{message}</p>
        <p><strong>🧠 Réponse IA :</strong><br />{gptResponse}</p>
      </div>
    </div>
  )
}
