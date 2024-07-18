import React, { useState } from "react";

interface Digimon {
  name: string;
  level: string;
  img: string;
}

function CompAPIRequest() {
  const [digimon, setDigimon] = useState<Digimon | null>(null);
  const [loading, setLoading] = useState(false);

  const getRandomDigimon = async () => {
    setLoading(true);
    try {
      const resp = await fetch("https://digimon-api.vercel.app/api/digimon");
      const json: Digimon[] = await resp.json();
      const randomIndex = Math.floor(Math.random() * json.length);
      setDigimon(json[randomIndex]);
    } catch (err: any) {
      console.error("Error fetching Digimon:", err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={getRandomDigimon} disabled={loading}>
        {loading ? "Cargando..." : "Obtener Digimon Aleatorio"}
      </button>
      {digimon && (
        <div>
          <h2>{digimon.name}</h2>
          <img src={digimon.img} alt={digimon.name} />
          <p>Nivel: {digimon.level}</p>
        </div>
      )}
    </div>
  );
}

export default CompAPIRequest;
