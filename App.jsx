import React, { useState } from "react";
import { processIntent } from "./intentProcessor";

export default function App() {
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [gptResponse, setGptResponse] = useState("");

  const handleSend = () => {
    if (!userInput.trim()) return;
    const intent = processIntent("envoyer-message", userInput);
    setGptResponse("✉️ Message bien reçu ! (Simulé GPT)");
    setUserInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const triggerIntent = (type) => {
    const response = processIntent(type, userInput);
    setGptResponse(`🔄 Intent déclenché : ${JSON.stringify(response, null, 2)}`);
    setUserInput("");
  };

  if (!authenticated) {
    return (
      <div style={{ backgroundColor: "#1f1b2e", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#fff" }}>
        <h2>Entrez le code PIN</h2>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && pin === "0502" && setAuthenticated(true)}
          style={{ padding: "10px", fontSize: "18px", borderRadius: "8px", textAlign: "center" }}
        />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#1f1b2e", color: "#fff", padding: "20px", fontFamily: "sans-serif", minHeight: "100vh" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src="/logo.png" alt="Logo JS-INNOV.IA" style={{ height: "60px", marginBottom: "10px" }} />
        <h1>ASSISTANT POUR JULIEN P.</h1>
      </header>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
        {[
          { label: "Nouveau Client / Lead", action: "nouveau-client" },
          { label: "Ajouter RDV", action: "ajouter-rdv" },
          { label: "Créer Tâche", action: "creer-tache" },
          { label: "Relance du Jour", action: "relance-jour" },
          { label: "Envoyer Email", action: "envoyer-email" },
          { label: "Tarification", action: "tarification" },
          { label: "Sinistre", action: "sinistre" },
          { label: "Réseaux Sociaux", action: "reseaux-sociaux" },
          { label: "DELA", action: "dela" },
          { label: "ARCES", action: "arces" },
          { label: "Épargne", action: "epargne" },
          { label: "Salesforce Document", action: "salesforce-doc" }
        ].map(btn => (
          <button key={btn.label} onClick={() => triggerIntent(btn.action)} style={{ backgroundColor: "#311947", padding: "10px 20px", borderRadius: "8px", border: "none", color: "#fff", fontWeight: "bold" }}>
            {btn.label}
          </button>
        ))}
        <label style={{ backgroundColor: "#311947", padding: "10px 20px", borderRadius: "8px", color: "#fff", cursor: "pointer" }}>
          Choisir un fichier
          <input type="file" style={{ display: "none" }} />
        </label>
      </div>

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Écris un message à ton assistant..."
          style={{ width: "100%", padding: "12px", borderRadius: "8px", fontSize: "16px", marginBottom: "10px" }}
        />
        <button onClick={handleSend} style={{ width: "100%", backgroundColor: "#fcd35d", border: "none", padding: "12px", borderRadius: "8px", color: "#000", fontWeight: "bold" }}>
          Envoyer
        </button>
        {gptResponse && (
          <div style={{ marginTop: "20px", background: "#292042", padding: "15px", borderRadius: "8px" }}>
            <strong>Réponse de l'assistant :</strong>
            <pre>{gptResponse}</pre>
          </div>
        )}
      </div>

      <footer style={{ marginTop: "40px", textAlign: "center", fontSize: "12px", color: "#aaa" }}>
        © 2025 Assistant pour Julien P. – Créé par <strong>JS-INNOV.IA</strong>
      </footer>
    </div>
  );
}