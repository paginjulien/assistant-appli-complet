import { useState } from 'react'
import logo from './logo.png'

export default function App() {
  const [message, setMessage] = useState('')
  const [transcription, setTranscription] = useState('')
  const [gptResponse, setGptResponse] = useState('')
  const [recording, setRecording] = useState(false)
  const [file, setFile] = useState(null)

  const handleIntent = (intent) => {
    setMessage(`✅ Intention : ${intent}`)
    setTimeout(() => {
      setGptResponse(`Réponse générée par l'assistant pour "${intent}".`)
    }, 800)
  }

  const toggleRecording = () => {
    setRecording(!recording)
    if (!recording) {
      setTranscription('Texte simulé depuis la voix...')
    }
  }

  const sendMessage = () => {
    setMessage('📨 Message envoyé à l’assistant IA.')
    setGptResponse('Réponse de ChatGPT : voici un exemple d’email généré...')
  }

  const buttonList = [
    'ajouter-rdv', 'relance-jour', 'creer-tache', 'envoyer-email',
    'reseaux-sociaux', 'tarification', 'dela', 'arces', 'epargne',
    'nouveau-client', 'sinistre', 'salesforce-document'
  ]

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
