import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// Definición de la interfaz Digimon para tipar los datos
interface Digimon {
  name: string;
  level: string;
  img: string;
}

function App() {
  // Estado para almacenar el Digimon seleccionado
  const [digimon, setDigimon] = useState<Digimon | null>(null);
  // Estado para controlar el estado de carga
  const [loading, setLoading] = useState(false);

  // Función asíncrona para obtener un Digimon aleatorio
  const getRandomDigimon = async () => {
    setLoading(true);
    try {
      // Fetch a la API de Digimon
      const resp = await fetch("https://digimon-api.vercel.app/api/digimon");
      const json: Digimon[] = await resp.json();
      // Selección de un Digimon aleatorio
      const randomIndex = Math.floor(Math.random() * json.length);
      setDigimon(json[randomIndex]);
    } catch (err: any) {
      console.error("Error fetching Digimon:", err.message);
    }
    setLoading(false);
  };

  return (
    // Estructura principal de la aplicación usando clases de Bootstrap
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-between">
      {/* Encabezado de la aplicación */}
      <header className="text-center py-4 bg-primary text-white">
        <h1>DigiExplorer.app</h1>
      </header>

      {/* Contenido principal */}
      <main className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <p className="lead mb-4">
              Descubre el vasto mundo de los Digimon. Cada vez que presiones el botón,
              encontrarás un nuevo compañero digital con sus propias características únicas.
            </p>
            {/* Botón para obtener un Digimon aleatorio */}
            <button 
              onClick={getRandomDigimon} 
              disabled={loading}
              className="btn btn-primary btn-lg mb-4"
            >
              {loading ? "Buscando..." : "Descubrir Digimon Aleatorio"}
            </button>

            {/* Mostrar información del Digimon si está disponible */}
            {digimon && (
              <div className="card shadow">
                <div className="card-body">
                  <h2 className="card-title">{digimon.name}</h2>
                  <img src={digimon.img} alt={digimon.name} className="img-fluid mb-3" style={{maxHeight: "300px"}} />
                  <div className="border rounded p-2 mb-3">
                    <p className="mb-0"><strong>Nivel:</strong> {digimon.level}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="bg-light text-center py-3 mt-auto">
        <p className="mb-0">© 2024 Explorador de Digimon. Datos proporcionados por la API de Digimon.</p>
      </footer>
    </div>
  );
}

export default App;