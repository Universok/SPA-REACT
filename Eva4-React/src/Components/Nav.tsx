import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";

export default function Nav() {
    const showAlert = () => {
        alert("En esta pagina encontraras Digimons al azar, ademas de entregar el nivel de cada personaje, ¡¡que lo disfrutes!!.");
    };

    return (
        <div className="flex-container fixed-top">
            <div className="Nav">
                <header className="showcase">
                    <nav role="nav">
                        <ul>
                            <li>
                                <button onClick={showAlert} className="btn btn-link">
                                    Que Hacer
                                </button>
                            </li>
                            <li>
                                <a href="#contactForm">Llenar Formulario</a>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        </div>
    );
}