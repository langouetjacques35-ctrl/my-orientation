import React from 'react';

/**
 * MYORIENTATION 2026 - ULTIMATE EDITION
 * Onboarding complet (Métier + Spés) + Carte + Algorithme + Capacités
 */

// Super Base de données (Échantillon réaliste des données Parcoursup)
const FORMATIONS = [
  // NUMÉRIQUE
  { id: 1, nom: "BUT Informatique", ecole: "IUT Lille", ville: "Lille", x: 55, y: 10, domaine: "Numérique", moyAdmis: 14.5, taux: 22, places: 120, spesIdéales: ["Maths", "NSI"], emoji: "💻", metiers: "Développeur, Expert Cyber" },
  { id: 2, nom: "Licence Info", ecole: "Sorbonne", ville: "Paris", x: 50, y: 30, domaine: "Numérique", moyAdmis: 13.0, taux: 35, places: 250, spesIdéales: ["Maths", "NSI"], emoji: "⌨️", metiers: "Data Analyst, Codeur" },
  { id: 3, nom: "BUT MMI", ecole: "IUT Bordeaux", ville: "Bordeaux", x: 30, y: 70, domaine: "Numérique", moyAdmis: 13.8, taux: 18, places: 80, spesIdéales: ["NSI", "Arts"], emoji: "🎨", metiers: "Webdesigner, UX/UI" },
  // DROIT & COMMERCE
  { id: 4, nom: "Licence Droit", ecole: "Assas", ville: "Paris", x: 50, y: 30, domaine: "Droit", moyAdmis: 16.5, taux: 11, places: 900, spesIdéales: ["HGGSP", "HLP"], emoji: "⚖️", metiers: "Avocat, Magistrat" },
  { id: 5, nom: "Double Licence Droit-Éco", ecole: "Toulouse Capitole", ville: "Toulouse", x: 45, y: 85, domaine: "Droit", moyAdmis: 15.2, taux: 15, places: 150, spesIdéales: ["SES", "Maths"], emoji: "📜", metiers: "Juriste d'entreprise" },
  { id: 6, nom: "EM Lyon BBA", ecole: "Business School", ville: "Lyon", x: 70, y: 60, domaine: "Commerce", moyAdmis: 14.0, taux: 25, places: 400, spesIdéales: ["SES", "Maths"], emoji: "📈", metiers: "Marketing, Manager" },
  // SANTÉ
  { id: 7, nom: "PASS Médecine", ecole: "Paris Cité", ville: "Paris", x: 50, y: 30, domaine: "Santé", moyAdmis: 16.0, taux: 14, places: 1200, spesIdéales: ["SVT", "Physique"], emoji: "🩺", metiers: "Médecin, Chirurgien" },
  { id: 8, nom: "L.AS Santé", ecole: "U. Strasbourg", ville: "Strasbourg", x: 85, y: 25, domaine: "Santé", moyAdmis: 14.5, taux: 28, places: 300, spesIdéales: ["SVT", "Maths"], emoji: "💊", metiers: "Pharmacien, Kiné" },
  { id: 9, nom: "IFSI Infirmiers", ecole: "CHU Nantes", ville: "Nantes", x: 25, y: 45, domaine: "Santé", moyAdmis: 12.5, taux: 32, places: 160, spesIdéales: ["SVT", "SES"], emoji: "🏥", metiers: "Infirmier(e)" },
  // INGÉNIERIE
  { id: 10, nom: "CPGE MPSI", ecole: "Louis-le-Grand", ville: "Paris", x: 50, y: 30, domaine: "Ingénierie", moyAdmis: 18.5, taux: 7, places: 48, spesIdéales: ["Maths", "Physique"], emoji: "🔭", metiers: "Chercheur, Ingénieur Aéro" },
  { id: 11, nom: "INSA Lyon", ecole: "Ingénieur", ville: "Lyon", x: 70, y: 60, domaine: "Ingénierie", moyAdmis: 17.2, taux: 10, places: 850, spesIdéales: ["Maths", "Physique"], emoji: "⚙️", metiers: "Ingénieur IA, Robotique" },
  { id: 12, nom: "Aéronautique", ecole: "ISAE-Supaero", ville: "Toulouse", x: 45, y: 85, domaine: "Ingénierie", moyAdmis: 18.0, taux: 8, places: 200, spesIdéales: ["Maths", "Physique"], emoji: "✈️", metiers: "Ingénieur Spatial" },
  // ARTS & SPORT
  { id: 13, nom: "Architecture", ecole: "ENSA Marseille", ville: "Marseille", x: 75, y: 85, domaine: "Arts", moyAdmis: 14.8, taux: 12, places: 130, spesIdéales: ["Arts", "Maths"], emoji: "📐", metiers: "Architecte, Urbaniste" },
  { id: 14, nom: "STAPS", ecole: "U. Rennes 2", ville: "Rennes", x: 20, y: 35, domaine: "Sport", moyAdmis: 12.5, taux: 45, places: 600, spesIdéales: ["SVT", "SES"], emoji: "🏃", metiers: "Prof EPS, Coach" },
];

const METIERS_LIST = ["Numérique", "Santé", "Ingénierie", "Droit", "Commerce", "Arts", "Sport"];
const SPES_LIST = ["Maths", "Physique", "SVT", "NSI", "SES", "HGGSP", "HLP", "Arts", "Anglais"];
const VILLES_DISPO = ["Paris", "Lyon", "Lille", "Bordeaux", "Toulouse", "Nantes", "Strasbourg", "Marseille", "Rennes"];

export default function App() {
  // ETAT GLOBAL
  const [step, setStep] = React.useState("onboarding-metier"); 
  const [metier, setMetier] = React.useState(null);
  const [selectedSpes, setSelectedSpes] = React.useState(["Maths", "Physique"]);
  const [userCity, setUserCity] = React.useState("Paris");
  const [grades, setGrades] = React.useState({ moyenne: 14.5, spe1: 14, spe2: 14 });

  // ALGORITHME POST-BAC
  const calculateChance = (f) => {
    // 1. Base sur moyenne générale (Algorithme sigmoïde)
    let score = 1 / (1 + Math.exp(-1.5 * (grades.moyenne - f.moyAdmis))) * 100;
    
    // 2. Bonus de Spécialités (Très important sur Parcoursup)
    const matchingSpes = f.spesIdéales.filter(s => selectedSpes.includes(s)).length;
    if (matchingSpes === 2) score += 15;
    if (matchingSpes === 1) score += 5;
    if (matchingSpes === 0) score -= 25;

    // 3. Impact des notes de spécialités
    const moySpes = (grades.spe1 + grades.spe2) / 2;
    if (moySpes >= 16) score += 10;
    if (moySpes < 10) score -= 15;

    // 4. Bonus Secteur Géographique
    if (f.ville === userCity) score += 12;

    // 5. Ajustement selon la sélectivité (Taux d'accès réel)
    if (f.taux <= 15) score *= 0.80; // Ultra-sélectif
    if (f.taux > 30) score *= 1.10;  // Plus ouvert

    return Math.min(99, Math.max(1, Math.round(score)));
  };

  // --- ÉCRAN 1 : LE MÉTIER ---
  if (step === "onboarding-metier") {
    return (
      <div style={{ height: "100vh", background: "#05050a", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "sans-serif" }}>
        <div style={{ background: "#111124", padding: "40px", borderRadius: "30px", border: "1px solid #1e1e3a", textAlign: "center", maxWidth: "450px", width: "100%" }}>
          <h1 style={{ color: "#6366f1", fontSize: "32px", fontWeight: "900", margin: "0", letterSpacing: "-1px" }}>MYORIENTATION</h1>
          <p style={{ color: "#475569", fontSize: "14px", marginBottom: "30px" }}>Étape 1 : Quel domaine t'inspire ?</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {METIERS_LIST.map(d => (
              <button key={d} onClick={() => { setMetier(d); setStep("onboarding-spes"); }} style={{ background: "#1a1a35", color: "#fff", border: "1px solid #2e2e5a", padding: "16px", borderRadius: "16px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", transition: "0.2s" }}>{d}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- ÉCRAN 2 : LES SPÉCIALITÉS ---
  if (step === "onboarding-spes") {
    return (
      <div style={{ height: "100vh", background: "#05050a", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "sans-serif" }}>
        <div style={{ background: "#111124", padding: "40px", borderRadius: "30px", border: "1px solid #6366f1", textAlign: "center", maxWidth: "450px", width: "100%", boxShadow: "0 10px 40px rgba(99, 102, 241, 0.2)" }}>
          <h2 style={{ color: "#fff", fontSize: "24px", margin: "0 0 10px 0" }}>Tes Spécialités</h2>
          <p style={{ color: "#475569", fontSize: "14px", marginBottom: "30px" }}>Objectif : <b>{metier}</b></p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "30px" }}>
            {[0, 1].map(i => (
              <div key={i} style={{ textAlign: "left" }}>
                <label style={{ fontSize: "11px", color: "#6366f1", fontWeight: "bold", display: "block", marginBottom: "8px" }}>SPÉCIALITÉ {i + 1}</label>
                <select value={selectedSpes[i]} onChange={(e) => {
                  const newSpes = [...selectedSpes];
                  newSpes[i] = e.target.value;
                  setSelectedSpes(newSpes);
                }} style={{ width: "100%", background: "#05050a", color: "#fff", border: "1px solid #2e2e5a", padding: "15px", borderRadius: "12px", fontSize: "16px", outline: "none" }}>
                  {SPES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={() => setStep("app")} style={{ width: "100%", background: "#6366f1", color: "#fff", border: "none", padding: "16px", borderRadius: "15px", fontWeight: "bold", fontSize: "16px", cursor: "pointer" }}>Accéder au simulateur</button>
        </div>
      </div>
    );
  }

  // --- ÉCRAN 3 : LE DASHBOARD PRINCIPAL ---
  const filteredList = FORMATIONS.filter(f => f.domaine === metier && f.ville === userCity);
  const othersSameDomaine = FORMATIONS.filter(f => f.domaine === metier && f.ville !== userCity);

  return (
    <div style={{ minHeight: "100vh", background: "#05050a", color: "#fff", fontFamily: "sans-serif", paddingBottom: "120px" }}>
      <header style={{ background: "#6366f1", padding: "15px", textAlign: "center", fontWeight: "900", position: "sticky", top: 0, zIndex: 100 }}>
        MYORIENTATION <span style={{fontSize: '11px', opacity: 0.8, marginLeft: '10px', fontWeight: "normal"}}>{metier} • {selectedSpes.join(" + ")}</span>
      </header>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        
        {/* LA CARTE INTERACTIVE ET LE CHOIX DE VILLE */}
        <div style={{ background: "#111124", padding: "20px", borderRadius: "20px", border: "1px solid #1e1e3a", marginBottom: "20px" }}>
          <label style={{ fontSize: "11px", color: "#475569", fontWeight: "bold", display: "block", marginBottom: "15px", textAlign: "center" }}>CHOIX DU SECTEUR GÉOGRAPHIQUE</label>
          <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "10px", scrollbarWidth: "none" }}>
            {VILLES_DISPO.map(v => (
              <button key={v} onClick={() => setUserCity(v)} style={{ background: userCity === v ? "#6366f1" : "#1e1e3a", border: "none", color: "#fff", padding: "10px 18px", borderRadius: "20px", fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap", fontWeight: userCity === v ? "bold" : "normal" }}>{v}</button>
            ))}
          </div>

          <div style={{ marginTop: "20px", background: "#05050a", borderRadius: "15px", padding: "10px" }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "180px" }}>
              {/* Forme simplifiée de la France */}
              <path d="M45,5 L68,8 L88,28 L95,50 L82,88 L42,98 L15,88 L5,58 L12,32 L32,12 Z" fill="#111124" stroke="#2e2e5a" strokeWidth="0.5" />
              {/* Points des villes de la base de données */}
              {FORMATIONS.filter(f => f.domaine === metier).map(f => {
                const isLocal = userCity === f.ville;
                return (
                  <g key={f.id}>
                    <circle cx={f.x} cy={f.y} r={isLocal ? 5 : 2} fill={isLocal ? "#6366f1" : "#475569"} style={{ transition: 'all 0.3s' }} />
                    {isLocal && <text x={f.x + 8} y={f.y + 4} fill="#fff" fontSize="6" fontWeight="bold">{f.ville}</text>}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* GESTION DES NOTES (MOYENNE + SPÉS) */}
        <div style={{ background: "#111124", padding: "20px", borderRadius: "20px", border: "1px solid #6366f1", marginBottom: "25px" }}>
           <label style={{ fontSize: "11px", color: "#6366f1", fontWeight: "bold", display: "block", marginBottom: "15px", textAlign: "center" }}>SIMULATION DE TES NOTES</label>
           <div style={{ display: "flex", gap: "15px", justifyContent: "space-between" }}>
             <div style={{ flex: 1, textAlign: "center" }}>
               <div style={{ fontSize: "10px", color: "#475569", marginBottom: "5px" }}>Moy. Générale</div>
               <input type="number" step="0.1" value={grades.moyenne} onChange={(e) => setGrades({...grades, moyenne: parseFloat(e.target.value) || 0})} style={{ width: "100%", background: "#05050a", border: "1px solid #2e2e5a", color: "#fff", padding: "10px", borderRadius: "10px", fontSize: "16px", fontWeight: "bold", textAlign: "center" }} />
             </div>
             <div style={{ flex: 1, textAlign: "center" }}>
               <div style={{ fontSize: "10px", color: "#475569", marginBottom: "5px" }}>Note {selectedSpes[0]}</div>
               <input type="number" step="0.1" value={grades.spe1} onChange={(e) => setGrades({...grades, spe1: parseFloat(e.target.value) || 0})} style={{ width: "100%", background: "#05050a", border: "1px solid #2e2e5a", color: "#fff", padding: "10px", borderRadius: "10px", fontSize: "16px", fontWeight: "bold", textAlign: "center" }} />
             </div>
             <div style={{ flex: 1, textAlign: "center" }}>
               <div style={{ fontSize: "10px", color: "#475569", marginBottom: "5px" }}>Note {selectedSpes[1]}</div>
               <input type="number" step="0.1" value={grades.spe2} onChange={(e) => setGrades({...grades, spe2: parseFloat(e.target.value) || 0})} style={{ width: "100%", background: "#05050a", border: "1px solid #2e2e5a", color: "#fff", padding: "10px", borderRadius: "10px", fontSize: "16px", fontWeight: "bold", textAlign: "center" }} />
             </div>
           </div>
        </div>

        {/* RÉSULTATS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          
          <h3 style={{ fontSize: "12px", color: "#475569", textTransform: "uppercase", letterSpacing: "1px" }}>Formations prioritaires ({userCity})</h3>
          
          {filteredList.length > 0 ? (
            filteredList.sort((a,b) => calculateChance(b) - calculateChance(a)).map(f => (
              <ResultCard key={f.id} f={f} chance={calculateChance(f)} isLocal={true} />
            ))
          ) : (
            <div style={{ padding: "20px", textAlign: "center", background: "#111124", borderRadius: "15px", border: "1px dashed #2e2e5a" }}>
              <p style={{ color: "#475569", fontSize: "13px", margin: 0 }}>Pas de formation <b>{metier}</b> recensée à <b>{userCity}</b> dans la démo.</p>
            </div>
          )}

          {othersSameDomaine.length > 0 && (
            <>
              <h3 style={{ fontSize: "12px", color: "#6366f1", textTransform: "uppercase", letterSpacing: "1px", marginTop: "20px" }}>Alternatives en France</h3>
              {othersSameDomaine.sort((a,b) => calculateChance(b) - calculateChance(a)).map(f => (
                <ResultCard key={f.id} f={f} chance={calculateChance(f)} isLocal={false} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Composant pour l'affichage détaillé de chaque formation
function ResultCard({ f, chance, isLocal }) {
  const color = chance > 70 ? "#4ade80" : chance > 40 ? "#fbbf24" : "#f87171";
  
  return (
    <div style={{ background: "#111124", padding: "20px", borderRadius: "20px", borderLeft: `6px solid ${color}`, opacity: isLocal ? 1 : 0.8, border: isLocal ? `1px solid ${color}` : "1px solid #1e1e3a", position: "relative" }}>
      {isLocal && <div style={{ position: "absolute", top: "-10px", right: "20px", background: color, color: "#000", fontSize: "9px", fontWeight: "bold", padding: "3px 10px", borderRadius: "10px" }}>SECTEUR</div>}
      
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
        <div>
          <div style={{ fontWeight: "900", fontSize: "18px" }}>{f.nom} {f.emoji}</div>
          <div style={{ fontSize: "12px", color: "#6366f1", fontWeight: "bold" }}>{f.ecole} • {f.ville}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: color, fontWeight: "900", fontSize: "26px", lineHeight: "1" }}>{chance}%</div>
          <div style={{ fontSize: "9px", color: "#475569", marginTop: "4px" }}>CHANCES</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "15px" }}>
        <div style={{ background: "#05050a", padding: "8px", borderRadius: "10px", textAlign: "center" }}>
          <div style={{ fontSize: "9px", color: "#475569", marginBottom: "2px" }}>Places</div>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>{f.places}</div>
        </div>
        <div style={{ background: "#05050a", padding: "8px", borderRadius: "10px", textAlign: "center" }}>
          <div style={{ fontSize: "9px", color: "#475569", marginBottom: "2px" }}>Taux Accès</div>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>{f.taux}%</div>
        </div>
        <div style={{ background: "#05050a", padding: "8px", borderRadius: "10px", textAlign: "center" }}>
          <div style={{ fontSize: "9px", color: "#475569", marginBottom: "2px" }}>Moy. Admis</div>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>{f.moyAdmis}</div>
        </div>
      </div>

      <div style={{ background: "#1e1e3a", padding: "10px", borderRadius: "10px", fontSize: "11px", color: "#cbd5e1" }}>
        <span style={{ color: "#4ade80", fontWeight: "bold" }}>💼 Métiers cibles :</span> {f.metiers}
      </div>
    </div>
  );
}

    
    
