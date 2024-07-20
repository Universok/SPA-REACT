
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";

export default function Nav() {
    // Función para mostrar una alerta con información sobre el proyecto
    const showAlert = () => {
        alert("Bienvenido al Proyecto creado en React DigiExplorer. Aquí puedes descubrir Digimon al azar, ver sus niveles y aprender sobre estos fascinantes compañeros digitales. ¡Explora y diviértete!");
    };

    return (
        // Contenedor principal del componente de navegación
        <div className="flex-container fixed-top">
            <div className="Nav">
                <header className="showcase">
                    <nav role="nav">
                        <ul>
                            <li>
                                {/* Botón que muestra la alerta al hacer clic */}
                                <button onClick={showAlert} className="">
                                  Proyecto
                                </button>
                            </li>
                            <li>
                                {/* Enlace que lleva al formulario de contacto */}
                                <a href="#contactForm">¡Si quieres unirte al proyecto presiona aqui! </a>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        </div>
    );
}