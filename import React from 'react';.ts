import React from 'react';
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [pin, setPin] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handlePIN = () => {
    if (pin === '1234') setAuthenticated(true);
    else alert('Code PIN incorrect');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }],
      }),
    });
    const data = await res.json();
    setResponse(data.choices[0]?.message?.content || 'Aucune réponse');
  };

  return (
    <div className="app-container">
      {!authenticated ? (
        <div className="pin-box">
          <h2>Entrez le code PIN :</h2>
          <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} />
          <button onClick={handlePIN}>Valider</button>
        </div>
      ) : (
        <>
          <h1>Assistant IA - Julien P</h1>
          <form onSubmit={handleSubmit}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Posez une question..." />
            <button type="submit">Envoyer</button>
          </form>
          <div className="response-box">
            <strong>Réponse GPT :</strong>
            <p>{response}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

function App() {
    return (
        <div>
            <h1>Hello, React!</h1>
            <p>Welcome to your new React app.</p>
        </div>
    );
}

export default App;