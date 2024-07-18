import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ContactEntry {
    id: number;
    name: string;
    email: string;
}

interface ContactListProps {
    setEditEntry: (entry: ContactEntry) => void;
}

export default function ContactList({ setEditEntry }: ContactListProps) {
    const [entries, setEntries] = useState<ContactEntry[]>([]);

    const loadEntries = () => {
        const storedEntries = JSON.parse(localStorage.getItem('formEntries') || '[]');
        setEntries(storedEntries);
    };

    useEffect(() => {
        loadEntries();
        window.addEventListener('storageChange', loadEntries);
        return () => window.removeEventListener('storageChange', loadEntries);
    }, []);

    const handleDelete = (id: number) => {
        const updatedEntries = entries.filter(entry => entry.id !== id);
        localStorage.setItem('formEntries', JSON.stringify(updatedEntries));
        loadEntries();
    };

    return (
        <div className="container mt-5">
            <h2>Lista de Contactos</h2>
            <div className="row">
                {entries.map((entry) => (
                    <div key={entry.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{entry.name}</h5>
                                <p className="card-text">{entry.email}</p>
                                <button 
                                    className="btn btn-primary me-2" 
                                    onClick={() => setEditEntry(entry)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleDelete(entry.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
