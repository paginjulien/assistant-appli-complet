
import { useState, useEffect } from 'react';

export default function CodeProtector({ children }) {
  const codeSecret = "0502";
  const [verified, setVerified] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("codeOK");
    if (stored === "yes") setVerified(true);
  }, []);

  const checkCode = () => {
    if (input === codeSecret) {
      localStorage.setItem("codeOK", "yes");
      setVerified(true);
    } else {
      alert("⛔ Code incorrect");
    }
  };

  if (verified) return children;

  return (
    <div className="flex items-center justify-center h-screen bg-[#1e0e2f] text-[#fcd35d]">
      <div className="text-center border border-[#fcd35d]/30 rounded-xl p-6 max-w-xs w-full shadow-lg bg-[#2a1142]">
        <h1 className="text-xl mb-4 font-bold">🔐 Code requis</h1>
        <p className="mb-3 text-sm">Veuillez entrer votre code secret pour accéder à l’assistant.</p>
        <input
          type="password"
          placeholder="Code secret"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 text-center text-[#1e0e2f] rounded mb-4"
        />
        <button
          onClick={checkCode}
          className="bg-[#9e6dde] hover:bg-[#b084f8] text-white px-4 py-2 rounded"
        >
          Valider
        </button>
      </div>
    </div>
  );
}
