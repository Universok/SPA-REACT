import  { useState } from 'react';
import Nav from './Components/Nav';
import ContactForm from './Components/Formulario';
import ContactList from './Components/ContactList';
import CompAPIRequest from './Components/Api';
import ThemeToggle from './Components/DarkWhite';


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
            <ThemeToggle />
        </div>
    );
}

export default App;
