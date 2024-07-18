import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ContactEntry {
    id: number;
    name: string;
    email: string;
}

interface ContactFormProps {
    editEntry: ContactEntry | null;
    setEditEntry: (entry: ContactEntry | null) => void;
}

export default function ContactForm({ editEntry, setEditEntry }: ContactFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (editEntry) {
            setName(editEntry.name);
            setEmail(editEntry.email);
        }
    }, [editEntry]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const entries: ContactEntry[] = JSON.parse(localStorage.getItem('formEntries') || '[]');
        
        if (editEntry) {
            const updatedEntries = entries.map(entry => 
                entry.id === editEntry.id ? { ...entry, name, email } : entry
            );
            localStorage.setItem('formEntries', JSON.stringify(updatedEntries));
            setEditEntry(null);
        } else {
            const newEntry = { name, email, id: Date.now() };
            localStorage.setItem('formEntries', JSON.stringify([...entries, newEntry]));
        }

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
