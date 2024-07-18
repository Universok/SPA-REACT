import React, { useState } from 'react';
import Nav from './Components/Nav';
import ContactForm from './Components/Formulario';
import ContactList from './Components/ContactList';
import CompAPIRequest from './Components/Api';

interface ContactEntry {
    id: number;
    name: string;
    email: string;
}

function App() {
    const [editEntry, setEditEntry] = useState<ContactEntry | null>(null);

    return (
        <div>
            <Nav />
            <CompAPIRequest />
            <ContactForm editEntry={editEntry} setEditEntry={setEditEntry} />
            <ContactList setEditEntry={setEditEntry} />
        </div>
    );
}

export default App;
