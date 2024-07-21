import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";

// Interfaz para definir la estructura de un contacto
interface ContactEntry {
    id: number;
    name: string;
    email: string;
}

// Interfaz para las props del componente ContactList
interface ContactListProps {
    setEditEntry: (entry: ContactEntry) => void;
}

export default function ContactList({ setEditEntry }: ContactListProps) {
    // Estado para almacenar la lista de contactos
    const [entries, setEntries] = useState<ContactEntry[]>([]);

    // Función para cargar los contactos desde el localStorage
    const loadEntries = () => {
        const storedEntries = JSON.parse(localStorage.getItem('formEntries') || '[]');
        setEntries(storedEntries);
    };

    // Efecto para cargar los contactos al montar el componente y escuchar cambios en el storage
    useEffect(() => {
        loadEntries();
        window.addEventListener('storageChange', loadEntries);
        // Limpieza del efecto al desmontar el componente
        return () => window.removeEventListener('storageChange', loadEntries);
    }, []);

    // Función para eliminar un contacto
    const handleDelete = (id: number) => {
        const updatedEntries = entries.filter(entry => entry.id !== id);
        localStorage.setItem('formEntries', JSON.stringify(updatedEntries));
        loadEntries();
    };

    return (
        <div className="container mt-5">
            <h2>Lista de Contactos</h2>
            <div className="row">
                {/* Mapeo de los contactos para mostrarlos en tarjetas */}
                {entries.map((entry) => (
                    <div key={entry.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{entry.name}</h5>
                                <p className="card-text">{entry.email}</p>
                                {/* Botón para editar un contacto */}
                                <button 
                                    className="btn btn-primary me-2" 
                                    onClick={() => setEditEntry(entry)}
                                >
                                    Editar
                                </button>
                                {/* Botón para eliminar un contacto */}
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleDelete(entry.id)}
                                >
                                    Eliminar
                                </button>
                                <footer className="bg-light text-center text-lg-start mt-4">
                                    <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                                        © 2024 DIGIMON APP
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
