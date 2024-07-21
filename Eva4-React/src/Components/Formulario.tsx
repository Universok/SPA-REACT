import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import "../App.css";


// Interfaz para definir la estructura de un contacto
interface ContactEntry {
    id: number;
    name: string;
    email: string;
}

// Interfaz para las props del componente ContactForm
interface ContactFormProps {
    editEntry: ContactEntry | null;
    setEditEntry: (entry: ContactEntry | null) => void;
}

export default function ContactForm({ editEntry, setEditEntry }: ContactFormProps) {
    // Estados para manejar los campos del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Efecto para cargar los datos del contacto a editar en el formulario
    useEffect(() => {
        if (editEntry) {
            setName(editEntry.name);
            setEmail(editEntry.email);
        }
    }, [editEntry]);

    // Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const entries: ContactEntry[] = JSON.parse(localStorage.getItem('formEntries') || '[]');
        
        if (editEntry) {
            // Actualizar un contacto existente
            const updatedEntries = entries.map(entry => 
                entry.id === editEntry.id ? { ...entry, name, email } : entry
            );
            localStorage.setItem('formEntries', JSON.stringify(updatedEntries));
            setEditEntry(null);
        } else {
            // Crear un nuevo contacto
            const newEntry = { name, email, id: Date.now() };
            localStorage.setItem('formEntries', JSON.stringify([...entries, newEntry]));
        }

        // Limpiar el formulario y notificar cambios
        setName('');
        setEmail('');
        window.dispatchEvent(new Event('storageChange'));
    };

    return (
        <div id="contactForm" className="container mt-5">
            <h2>{editEntry ? 'Editar Contacto' : 'Nuevo Contacto'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {editEntry ? 'Actualizar' : 'Guardar'}
                </button>
                {editEntry && (
                    <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditEntry(null)}>
                        Cancelar
                    </button>
                )}
            </form>
        </div>
    );
}
